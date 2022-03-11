import { ticker } from "../../core/ticker";
import { easeInOutQuad } from "../../utils/easings";
import { clamp, Point, Vector } from "../../utils/math";

/**
 * @todo fix scale overdrag jump on pointerup
 * @todo scale overdrag on shrink when not rotating, ~0.5 limit
 * @todo calculate speed from actual render delta, rather than pointer change
 * @todo do not close on pinch-close if user starts expanding the image and lets go
 * @todo zoom inertia?
 * @todo add is-moving class only after move event, not on down
 * @todo add object-fit support for open/close transitions
 * @todo add window resize handlers
 * @todo no-op when expanded image is the same size as the thumbnail
 * @todo close on escape key
 * @todo zoom with mouse wheel on desktop
 */

/**
 * On down, if there's only one pointer and the last gesture (1) happened within
 * TIME_DOUBLE_TAP, (2) within DIST_DOUBLE_TAP, and (3) was not a drag, flag a
 * double-tap. On up, if the gesture was not a drag, trigger the double-tap.
 */
const DIST_DOUBLE_TAP = 50;
const TIME_DOUBLE_TAP = 400;

const DIST_LAST_FOCUS = 10;

const SHADOW_HTML = `
<style>
:host {
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, calc(var(--opacity, 1) * 0.8));
	transition: background-color 0.8s cubic-bezier(0.16, 1, 0.3, 1);
	touch-action: none;
}

:host(:not(.is-open)),
:host(.is-moved) {
	transition: none;
}

:host(:not(.is-open)) .figure,
:host(.is-moved) .figure {
	transition: none;
}

:host(.is-opening) .figure,
:host(.is-closing) .figure {
	opacity: var(--opacity);
}

:host(.is-closing) {
	pointer-events: none;
}

:host(.is-expandable) .figure {
	cursor: zoom-in;
}

:host(.is-expanded) .figure {
	cursor: grab;
}

:host(.is-dragging) .figure {
	cursor: grabbing;
}

.wrapper {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
}

@media (min-width: 600px) {
	.wrapper {
		width: 80%;
		height: 80%;
	}
}

.figure {
	/* Fixes trailing dead pixels on iOS and significantly improves
	performance due to no repaints, but causes extra large images to be
	blurry on iOS. */
	will-change: transform;
	transform-origin: left top;
	transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.image {
	display: block;
	max-width: 100%;
	height: auto;
	user-select: none;
}
</style>

<div class="wrapper">
	<div class="figure-wrapper">
		<div class="figure">
			<img class="image">
		</div>
	</div>
</div>
`;

interface Pointer {
	id: number;
	point: Point;
	origin: Point;
}

function avgPoint(points: Pointer[]) {
	let pt = new Point();

	points.forEach((p) => pt.add(p.point));

	pt.x /= points.length;
	pt.y /= points.length;

	return pt;
}

export class Lightbox extends HTMLElement {
	ptOffset = new Point();
	ptStatic = new Point();
	ptDown = new Point();
	ptTick: Point;
	vcSpeed: Vector;
	vcMovement: Vector;
	isSliding = false;
	avgDist: number;
	gesturePoint: Point;
	gestureScale: number;
	timeScale = 1;

	/**
	 * Last effective point of focus, computed from the average of all pointers.
	 * Updated on pointerup only if the movement since last pointerup was
	 * greater than X.
	 */
	ptLastFocus = new Point();

	scaleStatic = 1;
	scaleLimit = 7;
	naturalScale: number;

	isPinchToClose: boolean;
	isDoubleTap: boolean;
	lastTapUp: PointerEvent;

	isSwipeDownClose: boolean;

	animRatio = 0;

	isMobile = window.matchMedia("(max-width: 599px)");
	isClosed = false;
	isImageLoaded = false;
	isOpenEnd = false;

	/**
	 * Whether the user has scaled the image below 100% during a gesture.
	 */
	isScaledDown: boolean;

	/**
	 * Whether a click outside the figure will close the lightbox. Set to false
	 * once the user moves a pointer, i.e. is gesturing.
	 */
	isCanClickClose: boolean;

	ptrs: Pointer[] = [];

	elFigure: HTMLElement;
	elFigureWrap: HTMLElement;
	elImg: HTMLImageElement;
	elWrap: HTMLElement;
	width: number;
	height: number;
	loader: HTMLImageElement;

	downHandler = this.handleDown.bind(this);
	moveHandler = this.handleMove.bind(this);
	outHandler = this.handleUp.bind(this);
	tickHandler = this.handleTick.bind(this);

	imgSize = new Point();
	rectBounds: DOMRectReadOnly;

	shadow: ShadowRoot;
	opener: HTMLImageElement;

	constructor() {
		super();

		this.shadow = this.attachShadow({ mode: "open" });
		this.shadow.innerHTML = SHADOW_HTML;

		this.elWrap = this.shadow.querySelector(".wrapper");
		this.elFigure = this.shadow.querySelector(".figure");
		this.elFigureWrap = this.shadow.querySelector(".figure-wrapper");
		this.elImg = this.shadow.querySelector(".image") as HTMLImageElement;
	}

	connectedCallback() {
		this.width = parseInt(this.opener.getAttribute("width"));
		this.height = parseInt(this.opener.getAttribute("height"));

		this.elImg.width = this.width;
		this.elImg.height = this.height;
		this.elImg.src = this.opener.currentSrc;

		this.loader = new Image();
		this.loader.src = this.opener.src;

		if (this.loader.complete) {
			this.elImg.src = this.loader.src;
		} else {
			this.loader.addEventListener("load", () => {
				if (this.loader.naturalWidth) {
					this.isImageLoaded = true;
					this.updateImageSrc();
				}
			});
		}

		this.addEventListener("click", () => {
			this.close();
		});

		this.elImg.addEventListener("click", (e) => {
			// Prevent click listener of host element from closing the lightbox.
			e.stopPropagation();
		});

		this.rotation = 0;
		this.scaleStatic = 1;
		this.naturalScale = this.width / this.elFigure.offsetWidth;
		this.scaleLimit = Math.max(this.naturalScale, this.scaleLimit);

		this.updateBounds();
		this.ptOffset.set(this.rectBounds.x, this.rectBounds.y);
		this.ptStatic.set(this.ptOffset);

		this.addEventListener("pointerdown", this.downHandler);
		this.addEventListener("pointerup", this.outHandler);
		this.addEventListener("pointerleave", this.outHandler);
		this.addEventListener("pointercancel", this.outHandler);

		let r1 = this.opener.getBoundingClientRect();
		let r2 = this.elImg.getBoundingClientRect();

		let sw = r1.width / r2.width;
		let sh = r1.height / r2.height;
		let sx = r1.left - r2.left;
		let sy = r1.top - r2.top;
		let flipTransform = `translate(${sx}px, ${sy}px) scale(${sw}, ${sh})`;

		this.elFigure.style.transform = flipTransform;
		this.style.setProperty("--opacity", "0");
		this.classList.add("is-opening");

		window.requestAnimationFrame(() => {
			this.classList.add("is-open");
			this.style.setProperty("--opacity", "1");
			this.elFigure.style.transform = "";
			this.elFigure.addEventListener("transitionend", this.onOpenEndFn, {
				once: true,
			});
		});

		if (this.scaleStatic === 1 && this.scaleLimit > 1) {
			this.classList.add("is-expandable");
		}

		this.isClosed = false;
	}

	updateImageSrc() {
		if (this.isImageLoaded && this.isOpenEnd) {
			this.elImg.src = this.loader.src;
		}
	}

	onOpenEndFn = this.onOpenEnd.bind(this);
	onOpenEnd() {
		this.isOpenEnd = true;
		this.updateImageSrc();
		this.classList.remove("is-opening");
	}

	handleDown(e: PointerEvent) {
		this.isCanClickClose = true;

		e.preventDefault();

		if (this.isSwipeDownClose && this.animRatio > 0.1) {
			return;
		}

		this.ptrs.push({
			id: e.pointerId,
			point: new Point(e.clientX, e.clientY),
			origin: new Point(e.clientX, e.clientY),
		});

		this.pointersChange();

		if (this.ptrs.length === 1) {
			this.gestureStart(e);
		}

		if (this.ptrs.length > 1) {
			this.isSwipeDownClose = false;
		}

		this.vcMovement = new Vector();
	}

	isRotate: boolean;
	gestureAngle: Vector;
	gestureOffset: Vector;
	rotation: number;
	distDown: number;

	ptPull: Point;
	vcPull: Vector;

	pointersChange() {
		let tr = this.getGestureTransform();
		this.ptStatic = tr.point;
		this.scaleStatic = tr.scale;
		this.rotation = tr.angle;
		this.gestureScale = null;
		this.gestureOffset = null;
		this.gestureAngle = null;
		this.angle = null;
		this.vcPull = null;

		if (this.ptrs.length) {
			this.ptDown = avgPoint(this.ptrs);
			this.gesturePoint = this.ptDown.copy();
			this.avgDist = this.getAverageDistance();
			this.distDown = this.avgDist;
			this.ptPull = new Point(
				this.ptDown.x - this.ptStatic.x,
				this.ptDown.y - this.ptStatic.y
			);
			this.vcPull = this.ptDown.to(this.ptStatic);

			// Reset the tick position, otherwise the speed will be inaccurate
			// since pointers change and gesturePoint makes a big jump.
			this.ptTick = null;
			this.vcSpeed = null;
		}
	}

	gestureStart(e: PointerEvent) {
		this.isPinchToClose = this.scaleStatic === 1;
		this.isScaledDown = this.scaleStatic < 0.95;
		this.isRotate = this.isPinchToClose && this.isScaledDown;

		if (
			this.lastTapUp &&
			e.timeStamp - this.lastTapUp.timeStamp < TIME_DOUBLE_TAP
		) {
			let dist = Math.hypot(
				Math.abs(e.clientX - this.lastTapUp.clientX),
				Math.abs(e.clientY - this.lastTapUp.clientY)
			);

			if (dist < DIST_DOUBLE_TAP) {
				this.isDoubleTap = true;
			}
		}

		this.addEventListener("pointermove", this.moveHandler);
		this.classList.add("is-moved", "is-dragging");

		this.isSwipeDownClose = Math.abs(this.getBleed(this.ptStatic).bottom) < 20;

		this.isSliding = false;
		ticker.on("tick", this.tickHandler);
	}

	getPointersAngle() {
		if (this.ptrs.length > 1) {
			let v = new Vector();

			for (let i = 1; i < this.ptrs.length; i++) {
				v.add(this.ptrs[0].point.to(this.ptrs[i].point));
			}

			return v;
		}
	}

	angle: number;

	handleMove(e: PointerEvent) {
		this.isCanClickClose = false;

		this.ptrs
			.find((p) => p.id === e.pointerId)
			?.point.set(e.clientX, e.clientY);

		let lastGesturePoint = this.gesturePoint;
		this.gesturePoint = avgPoint(this.ptrs);
		this.gestureOffset = this.ptDown.to(this.gesturePoint);

		if (lastGesturePoint) {
			let delta = lastGesturePoint.to(this.gesturePoint);
			delta.magnitude = Math.pow(delta.magnitude, 3);
			this.vcMovement.magnitude *= 0.75;
			this.vcMovement.add(delta);
		}

		if (this.distDown) {
			let dist = this.getAverageDistance();
			this.gestureScale = dist / this.distDown;
		}

		if (this.isRotate) {
			let angle = this.getPointersAngle();
			if (this.gestureAngle) {
				this.angle = angle.direction - this.gestureAngle.direction;
			} else {
				this.gestureAngle = angle;
			}
		}
	}

	constrainScale(scale: number) {
		let limit = this.scaleLimit;
		let overLimit = scale - limit;

		if (overLimit > 0) {
			scale = limit + this.getScaleOverLimit(overLimit, limit);
		}

		return scale;
	}

	getScaleOverLimit(amount: number, limit: number) {
		return (amount * limit) / (amount + limit);
	}

	handleUp(e: PointerEvent) {
		let ptr = this.ptrs.find((p) => p.id === e.pointerId);
		if (!ptr) {
			// On mobile, `pointerup` and `pointerleave` can both be triggered
			// for the same pointer, causing handleOut() to run twice.
			return;
		}

		let delta = this.gesturePoint.copy().subtract(this.ptDown);
		if (!this.ptLastFocus || delta.dist() > DIST_LAST_FOCUS) {
			this.ptLastFocus = avgPoint(this.ptrs);
		}

		this.ptrs.splice(this.ptrs.indexOf(ptr), 1);

		/**
		 * @todo fix case where pointer is dragged and brought back to the same
		 * place, falsely considered as a tap
		 */
		if (ptr.point.dist(ptr.origin) < DIST_DOUBLE_TAP) {
			this.lastTapUp = e;
		} else {
			this.isDoubleTap = false;
		}

		this.pointersChange();

		if (this.ptrs.length === 0) {
			this.gestureEnd(e);
		}
	}

	gestureEnd(e: PointerEvent) {
		this.classList.remove("is-dragging");
		this.removeEventListener("pointermove", this.moveHandler);
		this.isSliding = this.vcSpeed?.magnitude * this.timeScale > 5;

		this.rotation = 0;
		this.gestureScale = null;
		this.gesturePoint = null;

		let animRatio = this.animRatio;
		this.animRatio = 0;

		if (this.isDoubleTap) {
			this.clickZoom();
			this.isDoubleTap = false;
			this.lastTapUp = null;
			this.isSliding = false;
		} else if (!this.isMobile.matches && this.lastTapUp === e) {
			this.clickZoom();
		}

		if (this.isPinchToClose && this.scaleStatic < 1) {
			this.close();
			this.isSliding = false;
		} else if (this.scaleStatic < 1) {
			this.ptStatic.set(this.elFigure.offsetLeft, this.elFigure.offsetTop);
			this.scaleStatic = 1;
			navigator.vibrate?.(50);
			this.isSliding = false;
		} else if (this.scaleStatic > this.scaleLimit) {
			let dx = this.ptLastFocus.x - this.ptStatic.x;
			let dy = this.ptLastFocus.y - this.ptStatic.y;
			let r = 1 - this.scaleLimit / this.scaleStatic;

			this.ptStatic.x += dx * r;
			this.ptStatic.y += dy * r;
			this.scaleStatic = this.scaleLimit;
			navigator.vibrate?.(50);
			this.isSliding = false;
		}

		if (
			this.isSwipeDownClose &&
			animRatio > 0.06 &&
			Math.sin(this.vcMovement.direction) > 0
		) {
			this.close();
			this.isSliding = false;
		}

		if (!this.isClosed) {
			this.updateBounds();
		}

		if (!this.isSliding) {
			ticker.off("tick", this.tickHandler);

			if (!this.isClosed) {
				this.classList.remove("is-moved");
				this.constrainPoint(this.ptStatic, false);
				this.render();
			}
		}
	}

	clickZoom() {
		if (this.scaleStatic > 1) {
			this.zoomOut();
		} else {
			this.zoomIn();
		}
	}

	zoomOut() {
		this.classList.remove("is-expanded");
		this.classList.add("is-expandable");

		let dx = this.lastTapUp.clientX - this.ptStatic.x;
		let dy = this.lastTapUp.clientY - this.ptStatic.y;
		let r = 1 - 1 / this.scaleStatic;

		this.ptStatic.x += dx * r;
		this.ptStatic.y += dy * r;
		this.scaleStatic = 1;
	}

	zoomIn() {
		this.classList.remove("is-expandable");
		this.classList.add("is-expanded");

		let pull = new Point(
			(this.naturalScale - 1) * (this.lastTapUp.clientX - this.ptStatic.x),
			(this.naturalScale - 1) * (this.lastTapUp.clientY - this.ptStatic.y)
		);

		this.ptStatic.subtract(pull);
		this.scaleStatic = this.naturalScale;
	}

	handleTick(delta: number) {
		this.timeScale = delta / 16.66;

		if (this.isSliding) {
			this.vcSpeed.magnitude *= Math.pow(0.85, this.timeScale);
			this.ptStatic.add(this.vcSpeed);
			this.constrainPoint(this.ptStatic);

			let ptIdeal = this.ptStatic.copy();
			this.constrainPoint(ptIdeal, false);

			let vcPush = this.ptStatic.to(ptIdeal);
			vcPush.magnitude *= 1 - Math.pow(0.9, this.timeScale);
			this.ptStatic.add(vcPush);

			if (this.vcSpeed.magnitude < 0.1 && vcPush.magnitude < 0.1) {
				ticker.off("tick", this.tickHandler);
				this.classList.remove("is-moved");
				this.isSliding = false;
			}
		} else {
			if (this.ptTick) {
				let lastTickPoint = this.ptTick.copy();
				this.ptTick.set(this.gesturePoint);
				this.vcSpeed = lastTickPoint.to(this.ptTick);
			} else {
				this.ptTick = this.gesturePoint.copy();
			}
		}

		this.render();
	}

	constrainPoint(p: Point, overdrag = true) {
		let r2 = this.rectBounds;
		let dt = r2.top - p.y;
		let dl = r2.left - p.x;
		let dr = p.x + this.imgSize.x - r2.right;
		let db = p.y + this.imgSize.y - r2.bottom;

		if (overdrag) {
			if (dt > 0) p.y = r2.top - this.getOverdrag(dt, window.innerHeight / 3);
			if (dl > 0) p.x = r2.left - this.getOverdrag(dl, window.innerWidth / 3);
			if (dr > 0)
				p.x =
					r2.right -
					this.imgSize.x +
					this.getOverdrag(dr, window.innerWidth / 3);
			if (db > 0) {
				if (!this.isSwipeDownClose) {
					p.y =
						r2.bottom -
						this.imgSize.y +
						this.getOverdrag(db, window.innerHeight / 3);
				}
			}
		} else {
			if (dt > 0) p.y = r2.top;
			if (dl > 0) p.x = r2.left;
			if (dr > 0) p.x = r2.right - this.imgSize.x;
			if (db > 0) p.y = r2.bottom - this.imgSize.y;
		}

		p.set(p.x, p.y);
	}

	getGestureTransform() {
		let point = this.ptStatic.copy();
		let scale = this.scaleStatic;
		let angle = this.rotation;

		if (this.gestureScale) {
			scale = this.constrainScale(scale * this.gestureScale);
		}

		if (this.gestureOffset) {
			point.add(this.gestureOffset);
		}

		if (scale !== this.scaleStatic) {
			let diff = scale / this.scaleStatic;
			let pull = new Point(
				(diff - 1) * this.ptPull.x,
				(diff - 1) * this.ptPull.y
			);

			point.subtract(pull);
		}

		if (this.angle) {
			angle += this.angle;
		}

		if (this.vcPull) {
			let v1 = this.vcPull.copy();
			v1.magnitude *= this.gestureScale;

			let v2 = v1.copy();
			v2.direction += this.angle;
			v1.direction -= Math.PI;
			v2.add(v1);
			point.add(v2);
		}

		return {
			point,
			scale,
			angle,
		};
	}

	render() {
		let gesture = this.getGestureTransform();
		let render = gesture.point;
		let s = gesture.scale;

		if (s < 0.95) {
			this.isScaledDown = true;
		}

		/**
		 * On iPhone, the user can only disable the pinch-to-close behavior
		 * when zooming in. If they start with a zoom-out and _then_ zoom
		 * in, they should remain in a pinch-to-close state.
		 */
		if (s > 1.05 && !this.isScaledDown) {
			this.isPinchToClose = false;
		}

		if (this.isScaledDown && this.isPinchToClose) {
			this.isRotate = true;
		}

		if (!this.isSliding && !this.isRotate) {
			if (s !== this.scaleStatic) {
				this.updateBounds(s);
			}

			this.constrainPoint(render);
		}

		if (this.isSwipeDownClose) {
			let bleed = this.getBleed(render).bottom;
			let ratio = bleed / (window.innerHeight * 0.75);
			ratio = clamp(ratio, 0, 1);

			this.animRatio = easeInOutQuad(ratio);

			let animScale = 1 - ratio * 0.3;
			s *= animScale;
			render.add(
				(1 - animScale) * this.ptPull.x,
				(1 - animScale) * this.ptPull.y
			);
		}

		let opacity = 1 - this.animRatio;

		if (this.isPinchToClose) {
			// On iPhone, opacity goes from 0 to 1 in the 30-100% image scale.
			opacity *= clamp((s - 0.3) / 0.7, 0, 1);
		}

		this.style.setProperty("--opacity", opacity.toString());

		let x = render.x - this.ptOffset.x;
		let y = render.y - this.ptOffset.y;

		/**
		 * Using `matrix()` to prevent flicker on iOS.
		 * @see https://stackoverflow.com/q/70233672/3130281
		 */
		this.elFigure.style.transform = `matrix(${s}, 0, 0, ${s}, ${x}, ${y}) rotate(${gesture.angle}rad)`;
	}

	close() {
		if (!this.isOpenEnd) {
			// If open transition has not finished, prevent the closing one from
			// triggering onOpenEnd().
			this.elFigure.removeEventListener("transitionend", this.onOpenEndFn);
		}

		this.isClosed = true;

		ticker.off("tick", this.tickHandler);

		this.classList.remove("is-moved");
		this.classList.add("is-closing");

		let r1 = this.opener.getBoundingClientRect();
		let r2 = this.elFigureWrap.getBoundingClientRect();

		let sw = r1.width / r2.width;
		let sh = r1.height / r2.height;
		let sx = r1.left - r2.left;
		let sy = r1.top - r2.top;

		this.elFigure.style.transform = `translate(${sx}px, ${sy}px) scale(${sw}, ${sh})`;
		this.style.setProperty("--opacity", "0");

		let handler = () => {
			if (this.parentElement) {
				document.body.removeChild(this);
			}
		};

		this.addEventListener("transitionend", handler);
		this.addEventListener("transitioncancel", handler);
	}

	/**
	 * @todo only needs to be called when image scale or window size changes.
	 */
	updateBounds(scale = this.scaleStatic) {
		this.imgSize.set(
			this.elFigure.offsetWidth * scale,
			this.elFigure.offsetHeight * scale
		);

		let r3 = this.getMaxBoundsRect();
		let w = Math.max(this.imgSize.x, r3.width);
		let h = Math.max(this.imgSize.y, r3.height);
		let bt = r3.bottom - h;
		let br = r3.left + w;
		let bb = r3.top + h;
		let bl = r3.right - w;

		this.rectBounds = new DOMRectReadOnly(bl, bt, br - bl, bb - bt);
	}

	getMaxBoundsRect() {
		let r = this.elWrap.getBoundingClientRect();
		let w = Math.min(this.imgSize.x, r.width);
		let h = Math.min(this.imgSize.y, r.height);

		return new DOMRect(
			// `window.innerWidth` not used because it doesn't include scrollbar
			(document.body.clientWidth - w) / 2,
			(window.innerHeight - h) / 2,
			w,
			h
		);
	}

	getOverdrag(amount: number, limit: number) {
		return (amount * limit) / (amount + limit);
	}

	getBleed(p: Point) {
		let r2 = this.rectBounds;

		return {
			top: r2.top - p.y,
			left: r2.left - p.x,
			right: p.x + this.imgSize.x - r2.right,
			bottom: p.y + this.imgSize.y - r2.bottom,
		};
	}

	getAverageDistance() {
		let count = this.ptrs.length;

		if (count > 1) {
			let result = 0;

			for (let i = 0; i < count; i++) {
				let p1 = this.ptrs[i].point;
				let p2 = (this.ptrs[i + 1] || this.ptrs[0]).point;
				result += Math.hypot(Math.abs(p1.x - p2.x), Math.abs(p1.y - p2.y));
			}

			return result / count;
		} else {
			return null;
		}
	}
}

export function createLightbox(img: HTMLImageElement) {
	let el = document.createElement("ob-lightbox") as Lightbox;
	el.opener = img;
	document.body.appendChild(el);
}
