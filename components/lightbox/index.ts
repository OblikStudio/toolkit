import { ticker } from "../../core/ticker";
import { easeInOutQuad } from "../../utils/easings";
import { clamp, Point, Vector } from "../../utils/math";

/**
 * On down, if there's only one pointer and the last gesture (1) happened within
 * TIME_DOUBLE_TAP, (2) within DIST_DOUBLE_TAP, and (3) was not a drag, flag a
 * double-tap. On up, if the gesture was not a drag, trigger the double-tap.
 */
const DIST_DOUBLE_TAP = 50;
const TIME_DOUBLE_TAP = 400;

const DIST_LAST_FOCUS = 10;

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
	scaleDirection: number;
	isSliding = false;
	avgDist: number;
	gesturePoint: Point;
	gestureScale: number;
	timeScale = 1;
	originX = 0.5;
	originY = 0.5;

	/**
	 * Last effective point of focus, computed from the average of all pointers.
	 * Updated on pointerup only if the movement since last pointerup was
	 * greater than X.
	 */
	ptLastFocus = new Point();

	scaleStatic = 1;
	scaleMax: number;
	scaleIdeal: number;

	isPinchToClose: boolean;
	isDoubleTap: boolean;
	lastTapUp: PointerEvent;

	isSwipeDownClose: boolean;

	animRatio = 0;

	isClosed = false;
	isImageLoaded: boolean;
	isOpening = false;

	/**
	 * Whether the user has scaled the image below 100% during a gesture.
	 */
	isScaledDown: boolean;

	ptrs: Pointer[] = [];

	elImg: HTMLImageElement;
	elWrap: HTMLElement;
	elFigure: HTMLElement;
	width: number;
	height: number;
	loader: HTMLImageElement;

	downHandler = this.handleDown.bind(this);
	moveHandler = this.handleMove.bind(this);
	outHandler = this.handleUp.bind(this);
	tickHandler = this.handleTick.bind(this);

	imgSize = new Point();
	rectBounds: DOMRectReadOnly;

	opener: HTMLImageElement;

	constructor() {
		super();

		let shadow = this.attachShadow({ mode: "open" });
		shadow.innerHTML = this.getHtml();

		this.elWrap = shadow.querySelector(".wrapper");
		this.elFigure = shadow.querySelector(".figure");
		this.elImg = shadow.querySelector(".image") as HTMLImageElement;
	}

	getHtml() {
		let html = String.raw;
		return html`
			<style>
				${this.getCss()}
			</style>

			<div class="backdrop"></div>
			<div class="wrapper">
				<div class="figure">
					<img class="image" />
				</div>
			</div>
		`;
	}

	getCss() {
		let css = String.raw;
		return css`
			:host {
				--resolution: 1;
				--transition: 0.8s cubic-bezier(0.16, 1, 0.3, 1);

				position: fixed;
				top: 0;
				left: 0;
				z-index: 50;
				display: flex;
				align-items: center;
				justify-content: center;
				width: 100%;
				height: 100%;
				touch-action: none;
			}

			.backdrop {
				position: fixed;
				top: 0;
				left: 0;
				z-index: -1;
				width: 100%;
				height: 100%;
				background-color: rgba(0, 0, 0, calc(var(--opacity, 1) * 0.8));
				transition: background-color var(--transition);
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
				position: relative;
				display: block;
				user-select: none;
				cursor: grab;
				transform-origin: center;
				transition: transform var(--transition);
			}

			.image {
				position: absolute;
				top: 50%;
				left: 50%;
				width: calc(var(--resolution) * 100%);
				height: calc(var(--resolution) * 100%);
				transform: translate(-50%, -50%) scale(calc(1 / var(--resolution)));
				will-change: transform;
			}

			:host(.is-opening) .figure,
			:host(.is-closing) .figure {
				transition: all var(--transition);
			}

			:host(:not(.is-open)) .backdrop,
			:host(:not(.is-open)) .figure,
			:host(.is-moved) .backdrop,
			:host(.is-moved) .figure {
				transition: none;
			}

			:host(.is-closing) {
				pointer-events: none;
			}

			:host(.is-open) {
				cursor: zoom-out;
			}

			:host(.is-moved) {
				cursor: grabbing;
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
		`;
	}

	connectedCallback() {
		this.elImg.src = this.opener.currentSrc;
		this.width =
			parseInt(this.opener.getAttribute("data-ob-width")) ||
			this.opener.naturalWidth;
		this.height =
			parseInt(this.opener.getAttribute("data-ob-height")) ||
			this.opener.naturalHeight;

		this.loader = new Image();
		this.loader.src = this.opener.src;
		this.isImageLoaded = this.loader.complete;

		if (!this.isImageLoaded) {
			this.loader.addEventListener("load", this.handleLoaderLoadFn);
		}

		this.updateImageSize();

		this.addEventListener("click", () => {
			if (!this.isDragged) {
				this.close();
			}
		});

		this.elImg.addEventListener("click", (e) => {
			// Prevent click listener of host element from closing the lightbox.
			e.stopPropagation();
		});

		this.rotation = 0;
		this.scaleStatic = 1;
		this.imgSize.set(this.elFigure.offsetWidth, this.elFigure.offsetHeight);
		this.ptOffset.set(this.elFigure.offsetLeft, this.elFigure.offsetLeft);

		this.ptStatic.set(this.ptOffset);
		this.ptStatic.x += this.imgSize.x * this.originX;
		this.ptStatic.y += this.imgSize.y * this.originY;
		this.updateSize();

		this.addEventListener("pointerdown", this.downHandler);
		this.addEventListener("pointerup", this.outHandler);
		this.addEventListener("pointerleave", this.outHandler);
		this.addEventListener("pointercancel", this.outHandler);

		let r1 = this.opener.getBoundingClientRect();
		let openerAspect = r1.width / r1.height;
		let rect = this.elWrap.getBoundingClientRect();
		let width = rect.width;
		let height = width / openerAspect;

		if (height > rect.height) {
			height = rect.height;
			width = height * openerAspect;
		}

		let styles = window.getComputedStyle(this.opener);
		this.elImg.style.background = styles.background;
		this.elImg.style.objectFit = styles.objectFit;
		this.elImg.style.objectPosition = styles.objectPosition;
		this.elFigure.style.width = `${width}px`;
		this.elFigure.style.height = `${height}px`;

		let r2 = this.elFigure.getBoundingClientRect();
		let sw = r1.width / width;
		let sh = r1.height / height;
		let sx =
			r1.left + r1.width * this.originX - (r2.left + r2.width * this.originX);
		let sy =
			r1.top + r1.height * this.originY - (r2.top + r2.height * this.originY);
		let flipTransform = `translate(${sx}px, ${sy}px) scale(${sw}, ${sh})`;

		this.elFigure.style.transform = flipTransform;
		this.style.setProperty("--opacity", "0");

		window.requestAnimationFrame(() => {
			this.opener.classList.add(
				"ob-lightbox-is-active",
				"ob-lightbox-is-visible"
			);

			this.classList.add("is-open", "is-opening");
			this.style.setProperty("--opacity", "1");
			this.updateImageSize();
			this.elFigure.style.transform = "";
			this.elFigure.addEventListener("transitionend", this.onOpenEndFn);
		});

		this.isClosed = false;
		this.isOpening = true;

		window.addEventListener("resize", this.handleReiszeFn);
		window.addEventListener("keydown", this.handleKeyDownFn);
		this.addEventListener("wheel", this.handleWheelFn);
	}

	handleLoaderLoadFn = this.handleLoaderLoad.bind(this);
	handleLoaderLoad() {
		if (this.loader.naturalWidth) {
			this.isImageLoaded = true;
			this.updateImageSrc();
		}
	}

	updateImageSize() {
		// Calculating widths in JS because if width and height are `auto`,
		// getBoundingClientRect() returns width 0 and height 0 if the image is
		// not loaded. Also, you can't transition between `auto` values for
		// width, which is needed to make the object-fit animation work.
		let aspect = this.width / this.height;
		let rect = this.elWrap.getBoundingClientRect();
		let width = rect.width;
		let height = width / aspect;

		if (height > rect.height) {
			height = rect.height;
			width = height * aspect;
		}

		this.elFigure.style.width = `${width}px`;
		this.elFigure.style.height = `${height}px`;
	}

	handleKeyDownFn = this.handleKeyDown.bind(this);
	handleKeyDown(e: KeyboardEvent) {
		if (e.key === "Escape") {
			this.close();
		}
	}

	handleReiszeFn = this.handleResize.bind(this);
	handleResize() {
		this.updateImageSize();
		this.updateSize();
		this.render();
	}

	handleWheelFn = this.handleWheel.bind(this);
	handleWheel(e: WheelEvent) {
		e.preventDefault();

		let newScale = clamp(this.scaleStatic - e.deltaY / 400, 1, this.scaleMax);
		let delta = newScale / this.scaleStatic - 1;

		if (delta === 0) {
			return;
		}

		let pull = new Point(
			delta * (e.clientX - this.ptStatic.x),
			delta * (e.clientY - this.ptStatic.y)
		);

		this.ptStatic.subtract(pull);
		this.scaleStatic = newScale;
		this.updateBounds();
		this.constrainPoint(this.ptStatic, false);
		this.render();

		this.classList.toggle("is-expanded", this.isExpanded());

		if (this.isSliding) {
			this.stopSliding();
		}
	}

	updateSize() {
		let imgWidth = this.elFigure.offsetWidth;
		let imgHeight = this.elFigure.offsetHeight;
		let naturalScale: number;

		// Avoid unexpected behavior due to the browser rounding `offsetWidth`.
		if (Math.abs(this.width - imgWidth) > 1) {
			naturalScale = this.width / imgWidth;
		} else {
			naturalScale = 1;
		}

		// On iOS, even a tiny 10x10 image can be scaled up to ~1000px, despite
		// the fact that it gets blurry.
		let minSize = 1024;
		let minScale = Math.min(minSize / imgWidth, minSize / imgHeight);

		// Height calulations would be the same, so only width can be checked.
		this.scaleIdeal = this.width / imgWidth / window.devicePixelRatio;

		this.scaleMax = Math.max(naturalScale, minScale, 1);
		this.scaleStatic = this.imgSize.x / imgWidth;
		this.scaleStatic = clamp(this.scaleStatic, 1, this.scaleMax);

		this.updateBounds();
		this.constrainPoint(this.ptStatic, false);
		this.ptOffset.set(this.elFigure.offsetLeft, this.elFigure.offsetTop);

		this.classList.toggle("is-expandable", this.isExpandable());
		this.classList.toggle("is-expanded", this.isExpanded());
	}

	isExpanded() {
		return this.scaleStatic > 1;
	}

	isExpandable() {
		return this.scaleMax > 1;
	}

	updateImageSrc() {
		if (this.isImageLoaded && !this.isOpening) {
			this.elImg.src = this.loader.src;
			this.width = this.loader.naturalWidth;
			this.height = this.loader.naturalHeight;
			this.updateImageSize();
			this.updateResolution();
			this.updateSize();

			this.elFigure.addEventListener("transitionend", this.updateResolutionFn);
		}
	}

	updateResolutionFn = this.updateResolution.bind(this);
	updateResolution() {
		this.style.setProperty("--resolution", this.scaleStatic.toString());
	}

	onOpenEndFn = this.onOpenEnd.bind(this);
	onOpenEnd() {
		this.isOpening = false;
		this.classList.remove("is-opening");
		this.updateImageSrc();
		this.elFigure.removeEventListener("transitionend", this.onOpenEndFn);
	}

	handleDown(e: PointerEvent) {
		e.preventDefault();

		// On desktop:
		// 1. Ignore all button presses except left mouse button.
		// 2. Prevent a second pointer from becoming active and causing a glitch
		//    due to LMB (hold) -> RMB -> LMB (hold).
		if (e.pointerType === "mouse" && (e.button !== 0 || this.ptrs.length > 0)) {
			return;
		}

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
	isSnappy: boolean;

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

		if (this.ptrs.length > 1 && this.isSnappy) {
			this.constrainPoint(this.ptStatic, false, true);
			this.isSnappy = false;
		}

		if (this.ptrs.length) {
			this.ptDown = avgPoint(this.ptrs);
			this.gesturePoint = this.ptDown.copy();
			this.avgDist = this.getAverageDistance();
			this.distDown = this.avgDist;
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
		this.scaleDirection = 0;
		this.isMoved = false;
		this.isDragged = false;
		this.isSnappy =
			this.rectBounds.height > this.imgSize.y ||
			this.rectBounds.width > this.imgSize.x;

		if (
			this.lastTapUp &&
			e.pointerType === "touch" &&
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
		this.classList.add("is-dragging");

		this.isSwipeDownClose = Math.abs(this.getBleed(this.ptStatic)) < 20;

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
	isMoved: boolean;
	isDragged: boolean;

	handleMove(e: PointerEvent) {
		// If `handleMove()` is called while `isOpening` is `true`, then the
		// open transition has been interrupted and should not be waited for.
		if (this.isOpening) {
			this.onOpenEnd();
		}

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

		if (this.isSnappy && this.vcMovement.magnitude > 3) {
			if (Math.abs(Math.cos(this.vcMovement.direction)) > 0.7) {
				this.isSwipeDownClose = false;
			} else if (
				this.isSwipeDownClose &&
				Math.sin(this.vcMovement.direction) > 0.7
			) {
				this.isSnappy = false;
			}
		}

		if (this.distDown) {
			let dist = this.getAverageDistance();
			let lastGestureScale = this.gestureScale;
			this.gestureScale = dist / this.distDown;

			if (lastGestureScale) {
				let diff = this.gestureScale / lastGestureScale;
				this.scaleDirection += Math.pow(diff, 10) - 1;
				this.scaleDirection *= 0.9;
			}
		}

		if (this.isRotate) {
			let angle = this.getPointersAngle();
			if (this.gestureAngle) {
				this.angle = angle.direction - this.gestureAngle.direction;
			} else {
				this.gestureAngle = angle;
			}
		}

		if (!this.isMoved) {
			this.isMoved = true;
			this.classList.add("is-moved");
		}

		let pixelsMoved = this.gestureOffset.magnitude;

		if (!this.isDragged && pixelsMoved > 5) {
			this.isDragged = true;
		}

		/**
		 * Prevent false double-tap when second tap is a drag.
		 */
		if (this.isDoubleTap && pixelsMoved > DIST_DOUBLE_TAP) {
			this.isDoubleTap = false;
		}
	}

	constrainScale(scale: number) {
		let min = 1;
		let max = this.scaleMax;
		let minExtra = min - scale;
		let maxExtra = scale - max;

		if (maxExtra > 0) {
			scale = max + this.getScaleOverLimit(maxExtra, max);
		}

		if (!this.isRotate && minExtra > 0) {
			scale = min - this.getScaleOverLimit(minExtra, min);
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
		this.isSliding = this.vcSpeed?.magnitude > 5;

		this.rotation = 0;
		this.gestureScale = null;
		this.gesturePoint = null;

		let animRatio = this.animRatio;
		this.animRatio = 0;

		if (this.isExpandable() || this.isExpanded()) {
			if (this.isDoubleTap) {
				this.clickZoom();
				this.isDoubleTap = false;
				this.lastTapUp = null;
				this.isSliding = false;
			} else if (e.pointerType === "mouse" && !this.isMoved) {
				this.clickZoom();
			}
		}

		if (this.isPinchToClose && this.scaleDirection < 0) {
			this.close();
			this.isSliding = false;
		} else if (this.scaleStatic < 1) {
			this.ptStatic.set(this.ptOffset);
			this.scaleStatic = 1;
			this.isSliding = false;

			if (!this.isPinchToClose) {
				navigator.vibrate?.(50);
			}
		} else if (this.scaleStatic > this.scaleMax) {
			let dx = this.ptLastFocus.x - this.ptStatic.x;
			let dy = this.ptLastFocus.y - this.ptStatic.y;
			let r = 1 - this.scaleMax / this.scaleStatic;

			this.ptStatic.x += dx * r;
			this.ptStatic.y += dy * r;
			this.scaleStatic = this.scaleMax;
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
		let dx = this.lastTapUp.clientX - this.ptStatic.x;
		let dy = this.lastTapUp.clientY - this.ptStatic.y;
		let r = 1 - 1 / this.scaleStatic;

		this.ptStatic.x += dx * r;
		this.ptStatic.y += dy * r;
		this.scaleStatic = 1;
		this.classList.remove("is-expanded");
	}

	zoomIn() {
		let scale = this.scaleIdeal > 1 ? this.scaleIdeal : this.scaleMax;
		let pull = new Point(
			(scale - 1) * (this.lastTapUp.clientX - this.ptStatic.x),
			(scale - 1) * (this.lastTapUp.clientY - this.ptStatic.y)
		);

		this.ptStatic.subtract(pull);
		this.scaleStatic = scale;
		this.classList.add("is-expanded");
	}

	handleTick(delta: number) {
		this.timeScale = delta / 16.66;

		if (this.isSliding) {
			this.vcSpeed.magnitude *= Math.pow(0.85, this.timeScale);

			let vcStep = this.vcSpeed.copy();
			vcStep.magnitude *= this.timeScale;
			this.ptStatic.add(vcStep);
			this.constrainPoint(this.ptStatic);

			let ptIdeal = this.ptStatic.copy();
			this.constrainPoint(ptIdeal, false);

			let vcPush = this.ptStatic.to(ptIdeal);
			vcPush.magnitude *= 1 - Math.pow(0.9, this.timeScale);
			this.ptStatic.add(vcPush);

			if (this.vcSpeed.magnitude < 0.1 && vcPush.magnitude < 0.1) {
				this.stopSliding();
			}
		} else if (this.gesturePoint) {
			if (this.ptTick) {
				let lastTickPoint = this.ptTick.copy();
				this.ptTick.set(this.gesturePoint);
				this.vcSpeed = lastTickPoint.to(this.ptTick);
				this.vcSpeed.magnitude /= this.timeScale;
			} else {
				this.ptTick = this.gesturePoint.copy();
			}
		}

		this.render();
	}

	stopSliding() {
		ticker.off("tick", this.tickHandler);
		this.classList.remove("is-moved");
		this.isSliding = false;
	}

	constrainPoint(p: Point, overdrag = true, retouch = false) {
		let r2 = this.rectBounds;
		let dt = r2.top - (p.y - this.imgSize.y * this.originY);
		let dl = r2.left - (p.x - this.imgSize.x * this.originX);
		let dr = p.x + this.imgSize.x * (1 - this.originX) - r2.right;
		let db = p.y + this.imgSize.y * (1 - this.originY) - r2.bottom;

		let snapY = r2.height > this.imgSize.y;
		let snapX = r2.width > this.imgSize.x;

		if (!retouch || !snapY) {
			if (dt > 0) p.y = r2.top + this.imgSize.y * this.originY;
			if (db > 0 && (!overdrag || !this.isSwipeDownClose))
				p.y = r2.bottom - this.imgSize.y * (1 - this.originY);
		}

		if (!retouch || !snapX) {
			if (dl > 0) p.x = r2.left + this.imgSize.x * this.originX;
			if (dr > 0) p.x = r2.right - this.imgSize.x * (1 - this.originX);
		}

		if (overdrag) {
			if (snapY || !snapX || !this.isSnappy) {
				if (dt > 0) p.y -= this.getOverdrag(dt, window.innerHeight / 3);
				if (db > 0 && !this.isSwipeDownClose)
					p.y += this.getOverdrag(db, window.innerHeight / 3);
			}

			if (snapX || !snapY || !this.isSnappy) {
				if (dl > 0) p.x -= this.getOverdrag(dl, window.innerWidth / 3);
				if (dr > 0) p.x += this.getOverdrag(dr, window.innerWidth / 3);
			}
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
			let pull = this.vcPull.copy();
			pull.magnitude *= scale / this.scaleStatic - 1;
			point.add(pull);
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
			let bleed = this.getBleed(render);
			let ratio = bleed / (window.innerHeight * 0.75);
			ratio = clamp(ratio, 0, 1);

			this.animRatio = easeInOutQuad(ratio);

			let animScale = ratio * 0.3;
			s *= 1 - animScale;

			let pull = this.vcPull.copy();
			pull.magnitude *= -animScale;
			render.add(pull);
		}

		let opacity = 1 - this.animRatio;

		if (this.isPinchToClose) {
			// On iPhone, opacity goes from 0 to 1 in the 30-100% image scale.
			opacity *= clamp((s - 0.3) / 0.7, 0, 1);
		}

		this.style.setProperty("--opacity", opacity.toString());

		let x =
			render.x - this.ptOffset.x - this.elFigure.offsetWidth * this.originX;
		let y =
			render.y - this.ptOffset.y - this.elFigure.offsetHeight * this.originY;
		this.elFigure.style.transform = `translate(${x}px, ${y}px) scale(${s}) rotate(${gesture.angle}rad)`;
	}

	close() {
		this.loader.removeEventListener("load", this.handleLoaderLoadFn);
		window.removeEventListener("resize", this.handleReiszeFn);
		window.removeEventListener("keydown", this.handleKeyDownFn);
		this.removeEventListener("wheel", this.handleWheelFn);

		if (this.isOpening) {
			// If open transition has not finished, prevent the closing one from
			// triggering onOpenEnd().
			this.elFigure.removeEventListener("transitionend", this.onOpenEndFn);
			this.isOpening = false;
		} else {
			this.elFigure.removeEventListener(
				"transitionend",
				this.updateResolutionFn
			);
		}

		this.isClosed = true;

		ticker.off("tick", this.tickHandler);

		let r1 = this.opener.getBoundingClientRect();
		let openerAspect = r1.width / r1.height;
		let rect = this.elWrap.getBoundingClientRect();
		let width = rect.width;
		let height = width / openerAspect;

		if (height > rect.height) {
			height = rect.height;
			width = height * openerAspect;
		}

		let widthDiff = this.elFigure.offsetWidth - width;
		let heightDiff = this.elFigure.offsetHeight - height;
		let sx =
			r1.left +
			r1.width * this.originX -
			(this.elFigure.offsetLeft + this.elFigure.offsetWidth * this.originX) -
			widthDiff * (0.5 - this.originX);
		let sy =
			r1.top +
			r1.height * this.originY -
			(this.elFigure.offsetTop + this.elFigure.offsetHeight * this.originY) -
			heightDiff * (0.5 - this.originY);

		let elHeight = this.offsetHeight;
		let scrollTop = document.scrollingElement.scrollTop;
		let scrollLeft = document.scrollingElement.scrollLeft;

		this.classList.remove("is-moved");
		this.classList.add("is-closing");

		this.style.position = "absolute";
		this.style.top = `${scrollTop}px`;
		this.style.left = `${scrollLeft}px`;
		this.style.height = `${elHeight}px`;

		let scale = r1.width / width; // Height ratio is the same.
		this.elFigure.style.width = `${width}px`;
		this.elFigure.style.height = `${height}px`;
		this.elFigure.style.transform = `translate(${sx}px, ${sy}px) scale(${scale})`;

		this.scaleStatic = 1;
		this.updateResolution();

		this.style.setProperty("--opacity", "0");
		this.opener.classList.remove("ob-lightbox-is-active");

		this.elFigure.addEventListener("transitionend", () => {
			if (this.parentElement) {
				document.body.removeChild(this);

				// Avoid showing the opener if another instance of the lightbox
				// has been activated while this one was closing.
				if (!this.opener.classList.contains("ob-lightbox-is-active")) {
					this.opener.classList.remove("ob-lightbox-is-visible");
				}
			}
		});
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
		return p.y + this.imgSize.y * (1 - this.originY) - this.rectBounds.bottom;
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
