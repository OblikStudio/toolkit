import { Component } from "../../core/component";
import { ticker } from "../../core/ticker";
import { easeInOutQuad } from "../../utils/easings";
import { clamp, Point, Vector } from "../../utils/math";

/**
 * @todo inertia incorrectly calculated when overdragging
 * @todo grab jump when image beyond overdrag due to intertia
 * @todo replace with loaded image only after open transition has finished
 * @todo fix opacity glitch when grabbing right after opening transition
 * @todo smooth open/close transitions
 * @todo gradual opacity change on pinch-close
 * @todo rotate on pinch-close
 * @todo add is-moving class only after move event, not on down
 * @todo add object-fit support for open/close transitions
 * @todo add window resize handlers
 * @todo the cloned lightbox should be a separate component to avoid mixing states
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
const TIME_SCALE = 1000;

interface Options {
	template: HTMLTemplateElement;
}

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

export class Lightbox extends Component<HTMLImageElement, Options> {
	ptOffset = new Point();
	ptStatic = new Point();
	ptDown = new Point();
	ptRender = new Point();
	ptTick: Point;
	vcSpeed: Vector;
	vcMovement: Vector;
	isSliding = false;

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
	animScale = 1;
	animOffset = new Point();

	isMobile = window.matchMedia("(max-width: 599px)");

	/**
	 * Whether a click outside the figure will close the lightbox. Set to false
	 * once the user moves a pointer, i.e. is gesturing.
	 */
	isCanClickClose: boolean;

	ptrs: Pointer[] = [];

	elBox: HTMLElement;
	elFigure: HTMLElement;
	elImg: HTMLImageElement;
	elWrap: HTMLElement;
	width: number;
	height: number;

	downHandler = this.handleDown.bind(this);
	moveHandler = this.handleMove.bind(this);
	outHandler = this.handleUp.bind(this);
	tickHandler = this.handleTick.bind(this);

	imgSize = new Point();
	rectBounds: DOMRectReadOnly;

	init() {
		this.width = parseInt(this.$element.getAttribute("width"));
		this.height = parseInt(this.$element.getAttribute("height"));

		this.$element.addEventListener("click", () => {
			this.open();
		});
	}

	open() {
		let target = this.$options.template.content.firstElementChild;

		this.elBox = target.cloneNode(true) as HTMLElement;
		this.elWrap = this.elBox.querySelector("[data-lightbox-wrap]");
		this.elFigure = this.elBox.querySelector("[data-lightbox-figure]");
		this.elImg = this.elBox.querySelector(
			"[data-lightbox-img]"
		) as HTMLImageElement;
		this.elImg.width = this.width;
		this.elImg.height = this.height;

		let loader = new Image();
		loader.src = this.$element.src;

		if (loader.complete) {
			this.elImg.src = loader.src;
		} else {
			this.elImg.src = this.$element.currentSrc;
			loader.addEventListener("load", () => {
				if (this.elImg.naturalWidth) {
					this.elImg.src = loader.src;
				}
			});
		}

		document.body.appendChild(this.elBox);
		this.elBox.addEventListener("click", (e) => {
			if (e.target !== this.elImg && this.isCanClickClose) {
				this.close();
			}
		});

		this.scaleStatic = 1;
		this.naturalScale = this.width / this.elFigure.offsetWidth;
		this.scaleLimit = Math.max(this.naturalScale, this.scaleLimit);

		this.updateBounds();
		this.ptOffset.set(this.rectBounds.x, this.rectBounds.y);
		this.ptRender.set(this.ptOffset);

		this.elBox.addEventListener("pointerdown", this.downHandler);
		this.elBox.addEventListener("pointerup", this.outHandler);
		this.elBox.addEventListener("pointerleave", this.outHandler);
		this.elBox.addEventListener("pointercancel", this.outHandler);

		let r1 = this.$element.getBoundingClientRect();
		let r2 = this.elImg.getBoundingClientRect();

		let sw = r1.width / r2.width;
		let sh = r1.height / r2.height;
		let sx = r1.left - r2.left;
		let sy = r1.top - r2.top;
		let flipTransform = `translate(${sx}px, ${sy}px) scale(${sw}, ${sh})`;

		this.elFigure.style.transform = flipTransform;
		this.elBox.style.setProperty("--opacity", "0");
		this.elBox.classList.add("is-opening");
		this.elBox.addEventListener("transitionend", () => {
			this.elBox.classList.remove("is-opening");
		});

		window.requestAnimationFrame(() => {
			this.elBox.classList.add("is-open");
			this.elBox.style.setProperty("--opacity", "1");
			this.elFigure.style.transform = "";
		});

		if (this.scaleStatic === 1 && this.scaleLimit > 1) {
			this.elBox.classList.add("is-expandable");
		}
	}

	close() {
		ticker.off("tick", this.tickHandler);
		document.body.removeChild(this.elBox);
		this.elBox = null;
		this.elWrap = null;
		this.elFigure = null;
		this.elImg = null;
	}

	pullRatio: Point;

	pointersChange() {
		if (this.ptrs.length) {
			this.ptDown = avgPoint(this.ptrs);
			this.gesturePoint = this.ptDown.copy();
			this.avgDist = this.getAverageDistance();

			let r = this.elFigure.getBoundingClientRect();
			this.pullRatio = new Point(
				(this.ptDown.x - this.ptRender.x) / r.width,
				(this.ptDown.y - this.ptRender.y) / r.height
			);

			// Reset the tick position, otherwise the speed will be inaccurate
			// since pointers change and gesturePoint makes a big jump.
			this.ptTick = null;
			this.vcSpeed = null;
		} else {
			this.ptDown = null;
		}
	}

	gestureStart(e: PointerEvent) {
		this.ptStatic.set(this.ptRender);
		this.gestureScale = this.scaleStatic;
		this.isPinchToClose = this.scaleStatic === 1;

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

		this.elBox.addEventListener("pointermove", this.moveHandler);
		this.elBox.classList.add("is-moved", "is-dragging");

		this.isSwipeDownClose = Math.abs(this.getBleed(this.ptRender).bottom) < 20;

		this.isSliding = false;
		ticker.on("tick", this.tickHandler);
	}

	handleTick(delta: number) {
		if (this.isSliding) {
			this.vcSpeed.magnitude *= Math.pow(0.001, delta / TIME_SCALE);

			let vcDelta = this.vcSpeed.copy();
			vcDelta.magnitude /= TIME_SCALE / delta;
			this.ptRender.add(vcDelta);

			let cp = this.ptRender.copy();
			this.constrainPoint(cp, false);

			let vec = this.ptRender.to(cp);
			vec.magnitude *= 1 - Math.pow(0.00001, delta / TIME_SCALE);
			this.ptRender.add(vec);

			if (vcDelta.magnitude < 0.1 && vec.magnitude < 0.1) {
				ticker.off("tick", this.tickHandler);
				this.elBox.classList.remove("is-moved");
				this.isSliding = false;
			}
		} else {
			if (this.ptTick) {
				let lastTickPoint = this.ptTick.copy();
				this.ptTick.set(this.gesturePoint);
				this.vcSpeed = lastTickPoint.to(this.ptTick);
				this.vcSpeed.magnitude *= TIME_SCALE / delta;
			} else {
				this.ptTick = this.gesturePoint.copy();
			}
		}

		if (this.isSwipeDownClose) {
			let bleed = this.getBleed(this.ptRender).bottom;
			let ratio = bleed / (window.innerHeight * 0.75);
			ratio = clamp(ratio, 0, 1);

			this.animRatio = easeInOutQuad(ratio);
			this.animScale = 1 - ratio * 0.3;
			this.animOffset.set(
				(1 - this.animScale) * this.imgSize.x * this.pullRatio.x,
				(1 - this.animScale) * this.imgSize.y * this.pullRatio.y
			);
		}

		this.render();
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

	avgDist: number;
	gestureScale: number;
	gesturePoint: Point;

	handleMove(e: PointerEvent) {
		this.isCanClickClose = false;

		this.ptrs
			.find((p) => p.id === e.pointerId)
			?.point.set(e.clientX, e.clientY);

		let lastGesturePoint = this.gesturePoint;
		this.gesturePoint = avgPoint(this.ptrs);

		if (lastGesturePoint) {
			let delta = lastGesturePoint.to(this.gesturePoint);
			this.ptStatic.add(delta);

			delta.magnitude = Math.pow(delta.magnitude, 3);
			this.vcMovement.magnitude *= 0.75;
			this.vcMovement.add(delta);
		}

		let lastAvgDist = this.avgDist;
		this.avgDist = this.getAverageDistance();

		if (lastAvgDist && this.avgDist) {
			let distRatio = this.avgDist / lastAvgDist;
			this.gestureScale *= distRatio;

			let lastScale = this.scaleStatic;
			this.scaleStatic = this.constrainScale(this.gestureScale);

			let r = this.elFigure.getBoundingClientRect();
			let scaleRatio = this.scaleStatic / lastScale;
			let pullx = (scaleRatio - 1) * this.pullRatio.x * r.width;
			let pully = (scaleRatio - 1) * this.pullRatio.y * r.height;
			this.ptStatic.x -= pullx;
			this.ptStatic.y -= pully;

			if (this.scaleStatic > 1) {
				this.isPinchToClose = false;
			}
		}

		this.updateBounds();

		this.ptRender = this.ptStatic.copy();
		this.constrainPoint(this.ptRender);
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
		this.elBox.classList.remove("is-dragging");
		this.elBox.removeEventListener("pointermove", this.moveHandler);
		this.isSliding = this.vcSpeed?.magnitude > 100;

		let animRatio = this.animRatio;
		this.animRatio = 0;
		this.animScale = 1;
		this.animOffset.set(0, 0);

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
			this.ptRender.set(this.elFigure.offsetLeft, this.elFigure.offsetTop);
			this.scaleStatic = 1;
			navigator.vibrate?.(50);
			this.isSliding = false;
		} else if (this.scaleStatic > this.scaleLimit) {
			let dx = this.ptLastFocus.x - this.ptRender.x;
			let dy = this.ptLastFocus.y - this.ptRender.y;
			let r = 1 - this.scaleLimit / this.scaleStatic;

			this.ptRender.x += dx * r;
			this.ptRender.y += dy * r;
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

		if (this.elBox) {
			// not closed by one of the conditions above
			this.updateBounds();

			if (!this.isSliding) {
				this.constrainPoint(this.ptRender, false);
			}
		}

		if (!this.isSliding) {
			ticker.off("tick", this.tickHandler);

			if (this.elBox) {
				this.elBox.classList.remove("is-moved");
				this.render();
			}
		}
	}

	clickZoom() {
		if (this.scaleStatic > 1) {
			this.elBox.classList.remove("is-expanded");
			this.elBox.classList.add("is-expandable");
			this.contract();
		} else {
			this.elBox.classList.remove("is-expandable");
			this.elBox.classList.add("is-expanded");
			this.expand();
		}
	}

	contract() {
		let dx = this.lastTapUp.clientX - this.ptRender.x;
		let dy = this.lastTapUp.clientY - this.ptRender.y;
		let r = 1 - 1 / this.scaleStatic;

		this.ptRender.x += dx * r;
		this.ptRender.y += dy * r;
		this.scaleStatic = 1;
	}

	expand() {
		let pull = new Point(
			(this.naturalScale - 1) * (this.lastTapUp.clientX - this.ptRender.x),
			(this.naturalScale - 1) * (this.lastTapUp.clientY - this.ptRender.y)
		);

		this.ptRender.subtract(pull);
		this.scaleStatic = this.naturalScale;
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

	/**
	 * @todo only needs to be called when image scale or window size changes.
	 */
	updateBounds() {
		this.imgSize.set(
			this.elFigure.offsetWidth * this.scaleStatic,
			this.elFigure.offsetHeight * this.scaleStatic
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

	render() {
		let opacity = 1 - this.animRatio;
		this.elBox.style.setProperty("--opacity", opacity.toString());

		let s = this.scaleStatic * this.animScale;
		let x = this.ptRender.x - this.ptOffset.x + this.animOffset.x;
		let y = this.ptRender.y - this.ptOffset.y + this.animOffset.y;

		/**
		 * Using `matrix()` to prevent flicker on iOS.
		 * @see https://stackoverflow.com/q/70233672/3130281
		 */
		this.elFigure.style.transform = `matrix(${s}, 0, 0, ${s}, ${x}, ${y})`;
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
