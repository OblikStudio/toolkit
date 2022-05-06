import { ticker } from "../../core/ticker";
import { easeInOutQuad } from "../../utils/easings";
import { clamp, Point, Vector } from "../../utils/math";

export class Lightbox extends HTMLElement {
	opener: HTMLImageElement;
	image: HTMLImageElement;
	wrapper: HTMLElement;
	figure: HTMLElement;
	loader: HTMLImageElement;

	width: number;
	height: number;

	/**
	 * Rendered size of the image, after applied transforms.
	 */
	size = new Point();
	origin = new Point(0.5, 0.5);

	offsetSize: Point;
	offsetPosition: Point;

	position = new Point();
	downPosition = new Point();
	tickPosition: Point;

	/**
	 * Last effective point of focus, computed from the average of all pointers.
	 * Updated on pointerup only if the movement since last pointerup was
	 * greater than X.
	 */
	focusPosition = new Point();

	pull: Vector;

	scale = 1;
	maxScale: number;
	idealScale: number;

	angle: number;

	pointers: {
		id: number;
		point: Point;
		origin: Point;
	}[] = [];

	bounds: DOMRectReadOnly;

	speed: Vector;
	movement: Vector;
	timeScale = 1;

	gesturePosition: Point;
	gestureOffset: Vector;
	gestureStartDistance: number;
	gestureScale: number;
	gestureStartAngle: Vector;
	gestureAngle: number;

	animRatio = 0;

	isClosed = false;
	isOpening = false;
	isSliding = false;
	isMoved: boolean;
	isDragged: boolean;
	isRotate: boolean;
	isSnappy: boolean;

	/**
	 * Whether the user has scaled the image below 100% during a gesture.
	 */
	isScaledDown: boolean;

	isPinchToClose: boolean;

	scaleDirection: number;

	isDoubleTap: boolean;
	doubleTapDistance = 50;
	isSwipeDownClose: boolean;
	lastTapUp: PointerEvent;

	constructor() {
		super();

		let shadow = this.attachShadow({ mode: "open" });
		shadow.innerHTML = this.getHtml();

		this.wrapper = shadow.querySelector(".wrapper");
		this.figure = shadow.querySelector(".figure");
		this.image = shadow.querySelector(".image") as HTMLImageElement;
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
		this.image.src = this.opener.currentSrc;

		this.preloadImage();
		this.updateDimensions();
		this.updateImageSize();

		this.addEventListener("click", () => {
			if (!this.isDragged) {
				this.close();
			}
		});

		this.image.addEventListener("click", (e) => {
			// Prevent click listener of host element from closing the lightbox.
			e.stopPropagation();
		});

		this.angle = 0;
		this.scale = 1;
		this.updateOffsets();
		this.size.setPoint(this.offsetSize);
		this.position
			.setPoint(this.offsetPosition)
			.addPoint(this.size.clone().mulPoint(this.origin));

		this.updateSize();

		this.addEventListener("pointerdown", this.handleDownCallback);
		this.addEventListener("pointerup", this.handleUpCallback);
		this.addEventListener("pointerleave", this.handleUpCallback);
		this.addEventListener("pointercancel", this.handleUpCallback);

		let r1 = this.opener.getBoundingClientRect();
		let openerAspect = r1.width / r1.height;
		let rect = this.wrapper.getBoundingClientRect();
		let width = rect.width;
		let height = width / openerAspect;

		if (height > rect.height) {
			height = rect.height;
			width = height * openerAspect;
		}

		let styles = window.getComputedStyle(this.opener);
		this.image.style.background = styles.background;
		this.image.style.objectFit = styles.objectFit;
		this.image.style.objectPosition = styles.objectPosition;
		this.figure.style.width = `${width}px`;
		this.figure.style.height = `${height}px`;

		let r2 = this.figure.getBoundingClientRect();
		let sw = r1.width / width;
		let sh = r1.height / height;
		let sx =
			r1.left + r1.width * this.origin.x - (r2.left + r2.width * this.origin.x);
		let sy =
			r1.top + r1.height * this.origin.y - (r2.top + r2.height * this.origin.y);
		let flipTransform = `translate(${sx}px, ${sy}px) scale(${sw}, ${sh})`;

		this.figure.style.transform = flipTransform;
		this.style.setProperty("--opacity", "0");

		window.requestAnimationFrame(() => {
			this.opener.classList.add(
				"ob-lightbox-is-active",
				"ob-lightbox-is-visible"
			);

			this.classList.add("is-open", "is-opening");
			this.style.setProperty("--opacity", "1");
			this.updateImageSize();
			this.figure.style.transform = "";
			this.figure.addEventListener("transitionend", this.onOpenEndCallback);
		});

		this.isClosed = false;
		this.isOpening = true;

		window.addEventListener("resize", this.handleReiszeCallback);
		window.addEventListener("keydown", this.handleKeyDownCallback);
		this.addEventListener("wheel", this.handleWheelCallback);
	}

	preloadImage() {
		this.loader = new Image();
		this.loader.src = this.getSrc();

		if (!this.loader.complete) {
			this.loader.onload = () => {
				this.updateImageSrc();
			};
		}
	}

	getSrc() {
		// If `data-ob-src` is empty, assume that `srcset` is used and the
		// full-scale image is in `src`.
		return this.opener.getAttribute("data-ob-src") || this.opener.src;
	}

	updateDimensions() {
		if (this.loader.complete) {
			this.width = this.loader.naturalWidth;
			this.height = this.loader.naturalHeight;
		} else {
			let width = this.opener.getAttribute("data-ob-width");
			let height = this.opener.getAttribute("data-ob-height");
			this.width = width ? parseInt(width) : this.opener.naturalWidth;
			this.height = height ? parseInt(height) : this.opener.naturalHeight;
		}
	}

	updateOffsets() {
		this.offsetSize = new Point(
			this.figure.offsetWidth,
			this.figure.offsetHeight
		);

		this.offsetPosition = new Point(
			this.figure.offsetLeft,
			this.figure.offsetTop
		);
	}

	updateImageSize() {
		// Calculating widths in JS because if width and height are `auto`,
		// getBoundingClientRect() returns width 0 and height 0 if the image is
		// not loaded. Also, you can't transition between `auto` values for
		// width, which is needed to make the object-fit animation work.
		let aspect = this.width / this.height;
		let rect = this.wrapper.getBoundingClientRect();
		let width = rect.width;
		let height = width / aspect;

		if (height > rect.height) {
			height = rect.height;
			width = height * aspect;
		}

		this.figure.style.width = `${width}px`;
		this.figure.style.height = `${height}px`;
	}

	handleKeyDownCallback = this.handleKeyDown.bind(this);
	handleKeyDown(e: KeyboardEvent) {
		if (e.key === "Escape") {
			this.close();
		}
	}

	handleReiszeCallback = this.handleResize.bind(this);
	handleResize() {
		this.updateImageSize();
		this.updateOffsets();
		this.updateSize();
		this.render();
	}

	handleWheelCallback = this.handleWheel.bind(this);
	handleWheel(e: WheelEvent) {
		e.preventDefault();

		let newScale = clamp(this.scale - e.deltaY / 400, 1, this.maxScale);
		let delta = newScale / this.scale - 1;

		if (delta === 0) {
			return;
		}

		let pull = new Point(
			delta * (e.clientX - this.position.x),
			delta * (e.clientY - this.position.y)
		);

		this.position.subPoint(pull);
		this.scale = newScale;
		this.updateBounds();
		this.constrainPoint(this.position, false);
		this.render();

		this.classList.toggle("is-expanded", this.isExpanded());

		if (this.isSliding) {
			this.stopSliding();
		}
	}

	updateSize() {
		let { x: imgWidth, y: imgHeight } = this.offsetSize;
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
		this.idealScale = this.width / imgWidth / window.devicePixelRatio;

		this.maxScale = Math.max(naturalScale, minScale, 1);
		this.scale = this.size.x / imgWidth;
		this.scale = clamp(this.scale, 1, this.maxScale);

		this.updateBounds();
		this.constrainPoint(this.position, false);

		this.classList.toggle("is-expandable", this.isExpandable());
		this.classList.toggle("is-expanded", this.isExpanded());
	}

	isExpanded() {
		return this.scale > 1;
	}

	isExpandable() {
		return this.maxScale > 1;
	}

	updateImageSrc() {
		if (this.loader.complete && !this.isOpening) {
			this.image.src = this.loader.src;
			this.updateDimensions();
			this.updateImageSize();
			this.updateResolution();
			this.updateSize();

			this.figure.addEventListener(
				"transitionend",
				this.updateResolutionCallback
			);
		}
	}

	updateResolutionCallback = this.updateResolution.bind(this);
	updateResolution() {
		this.style.setProperty("--resolution", this.scale.toString());
	}

	onOpenEndCallback = this.onOpenEnd.bind(this);
	onOpenEnd() {
		this.isOpening = false;
		this.classList.remove("is-opening");
		this.updateImageSrc();
		this.figure.removeEventListener("transitionend", this.onOpenEndCallback);
	}

	handleDownCallback = this.handleDown.bind(this);
	handleDown(e: PointerEvent) {
		e.preventDefault();

		// On desktop:
		// 1. Ignore all button presses except left mouse button.
		// 2. Prevent a second pointer from becoming active and causing a glitch
		//    due to LMB (hold) -> RMB -> LMB (hold).
		if (
			e.pointerType === "mouse" &&
			(e.button !== 0 || this.pointers.length > 0)
		) {
			return;
		}

		if (this.isSwipeDownClose && this.animRatio > 0.1) {
			return;
		}

		this.pointers.push({
			id: e.pointerId,
			point: new Point(e.clientX, e.clientY),
			origin: new Point(e.clientX, e.clientY),
		});

		this.pointersChange();

		if (this.pointers.length === 1) {
			this.gestureStart(e);
		}

		if (this.pointers.length > 1) {
			this.isSwipeDownClose = false;
		}

		this.movement = new Vector();
	}

	pointersChange() {
		let tr = this.getGestureTransform();
		this.position = tr.point;
		this.scale = tr.scale;
		this.angle = tr.angle;
		this.gestureScale = null;
		this.gestureOffset = null;
		this.gestureStartAngle = null;
		this.gestureAngle = null;

		if (this.pointers.length > 1 && this.isSnappy) {
			this.constrainPoint(this.position, false, true);
			this.isSnappy = false;
		}

		if (this.pointers.length) {
			this.downPosition = this.getAveragePoint();
			this.gesturePosition = this.downPosition.clone();
			this.gestureStartDistance = this.getAverageDistance();
			this.pull = this.downPosition.to(this.position);

			// Reset the tick position, otherwise the speed will be inaccurate
			// since pointers change and gesturePoint makes a big jump.
			this.tickPosition = null;
			this.speed = null;
		}
	}

	gestureStart(e: PointerEvent) {
		this.isPinchToClose = this.scale === 1;
		this.isScaledDown = this.scale < 0.95;
		this.isRotate = this.isPinchToClose && this.isScaledDown;
		this.scaleDirection = 0;
		this.isMoved = false;
		this.isDragged = false;

		// Both values are floats, so the difference is checked to avoid
		// rounding errors.
		this.isSnappy =
			this.bounds.height - this.size.y > 1 ||
			this.bounds.width - this.size.x > 1;

		if (
			this.lastTapUp &&
			e.pointerType === "touch" &&
			e.timeStamp - this.lastTapUp.timeStamp < 400
		) {
			let dist = Math.hypot(
				Math.abs(e.clientX - this.lastTapUp.clientX),
				Math.abs(e.clientY - this.lastTapUp.clientY)
			);

			if (dist < this.doubleTapDistance) {
				this.isDoubleTap = true;
			}
		}

		this.addEventListener("pointermove", this.handleMoveCallback);
		this.classList.add("is-dragging");

		this.isSwipeDownClose = Math.abs(this.getBleed(this.position)) < 20;

		this.isSliding = false;
		ticker.on("tick", this.handleTickCallback);
	}

	getPointersAngle() {
		if (this.pointers.length > 1) {
			let v = new Vector();

			for (let i = 1; i < this.pointers.length; i++) {
				v.add(this.pointers[0].point.to(this.pointers[i].point));
			}

			return v;
		}
	}

	handleMoveCallback = this.handleMove.bind(this);
	handleMove(e: PointerEvent) {
		// If `handleMove()` is called while `isOpening` is `true`, then the
		// open transition has been interrupted and should not be waited for.
		if (this.isOpening) {
			this.onOpenEnd();
		}

		this.pointers
			.find((p) => p.id === e.pointerId)
			?.point.set(e.clientX, e.clientY);

		let lastGesturePoint = this.gesturePosition;
		this.gesturePosition = this.getAveragePoint();
		this.gestureOffset = this.downPosition.to(this.gesturePosition);

		if (lastGesturePoint) {
			let delta = lastGesturePoint.to(this.gesturePosition);
			delta.magnitude = Math.pow(delta.magnitude, 3);
			this.movement.magnitude *= 0.75;
			this.movement.add(delta);
		}

		if (this.isSnappy && this.movement.magnitude > 3) {
			if (Math.abs(Math.cos(this.movement.direction)) > 0.7) {
				this.isSwipeDownClose = false;
			} else if (
				this.isSwipeDownClose &&
				Math.sin(this.movement.direction) > 0.7
			) {
				this.isSnappy = false;
			}
		}

		if (this.gestureStartDistance) {
			let dist = this.getAverageDistance();
			let lastGestureScale = this.gestureScale;
			this.gestureScale = dist / this.gestureStartDistance;

			if (lastGestureScale) {
				let diff = this.gestureScale / lastGestureScale;
				this.scaleDirection += Math.pow(diff, 10) - 1;
				this.scaleDirection *= 0.9;
			}
		}

		if (this.isRotate) {
			let angle = this.getPointersAngle();
			if (this.gestureStartAngle) {
				this.gestureAngle = angle.direction - this.gestureStartAngle.direction;
			} else {
				this.gestureStartAngle = angle;
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
		if (this.isDoubleTap && pixelsMoved > this.doubleTapDistance) {
			this.isDoubleTap = false;
		}
	}

	constrainScale(scale: number) {
		let min = 1;
		let max = this.maxScale;
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

	handleUpCallback = this.handleUp.bind(this);
	handleUp(e: PointerEvent) {
		let ptr = this.pointers.find((p) => p.id === e.pointerId);
		if (!ptr) {
			// On mobile, `pointerup` and `pointerleave` can both be triggered
			// for the same pointer, causing handleOut() to run twice.
			return;
		}

		let delta = this.gesturePosition.clone().subPoint(this.downPosition);
		if (!this.focusPosition || delta.dist() > 10) {
			this.focusPosition = this.getAveragePoint();
		}

		this.pointers.splice(this.pointers.indexOf(ptr), 1);

		if (ptr.point.dist(ptr.origin) < this.doubleTapDistance) {
			this.lastTapUp = e;
		} else {
			this.isDoubleTap = false;
		}

		this.pointersChange();

		if (this.pointers.length === 0) {
			this.gestureEnd(e);
		}
	}

	gestureEnd(e: PointerEvent) {
		this.classList.remove("is-dragging");
		this.removeEventListener("pointermove", this.handleMoveCallback);
		this.isSliding = this.speed?.magnitude > 5;

		this.angle = 0;
		this.gestureScale = null;
		this.gesturePosition = null;

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
		} else if (this.scale < 1) {
			this.position.setPoint(this.offsetPosition);
			this.scale = 1;
			this.isSliding = false;

			if (!this.isPinchToClose) {
				navigator.vibrate?.(50);
			}
		} else if (this.scale > this.maxScale) {
			let dx = this.focusPosition.x - this.position.x;
			let dy = this.focusPosition.y - this.position.y;
			let r = 1 - this.maxScale / this.scale;

			this.position.x += dx * r;
			this.position.y += dy * r;
			this.scale = this.maxScale;
			navigator.vibrate?.(50);
			this.isSliding = false;
		}

		if (
			this.isSwipeDownClose &&
			animRatio > 0.06 &&
			Math.sin(this.movement.direction) > 0
		) {
			this.close();
			this.isSliding = false;
		}

		if (!this.isClosed) {
			this.updateBounds();
		}

		if (!this.isSliding) {
			ticker.off("tick", this.handleTickCallback);

			if (!this.isClosed) {
				this.classList.remove("is-moved");
				this.constrainPoint(this.position, false);
				this.render();
			}
		}
	}

	clickZoom() {
		if (this.scale > 1) {
			this.zoomOut();
		} else {
			this.zoomIn();
		}
	}

	zoomOut() {
		let dx = this.lastTapUp.clientX - this.position.x;
		let dy = this.lastTapUp.clientY - this.position.y;
		let r = 1 - 1 / this.scale;

		this.position.x += dx * r;
		this.position.y += dy * r;
		this.scale = 1;
		this.classList.remove("is-expanded");
	}

	zoomIn() {
		let scale = this.idealScale > 1 ? this.idealScale : this.maxScale;
		let pull = new Point(
			(scale - 1) * (this.lastTapUp.clientX - this.position.x),
			(scale - 1) * (this.lastTapUp.clientY - this.position.y)
		);

		this.position.subPoint(pull);
		this.scale = scale;
		this.classList.add("is-expanded");
	}

	handleTickCallback = this.handleTick.bind(this);
	handleTick(delta: number) {
		this.timeScale = delta / 16.66;

		if (this.isSliding) {
			this.speed.magnitude *= Math.pow(0.85, this.timeScale);

			let vcStep = this.speed.copy();
			vcStep.magnitude *= this.timeScale;
			this.position.addVector(vcStep);
			this.constrainPoint(this.position);

			let ptIdeal = this.position.clone();
			this.constrainPoint(ptIdeal, false);

			let vcPush = this.position.to(ptIdeal);
			vcPush.magnitude *= 1 - Math.pow(0.9, this.timeScale);
			this.position.addVector(vcPush);

			if (this.speed.magnitude < 0.1 && vcPush.magnitude < 0.1) {
				this.stopSliding();
			}
		} else if (this.gesturePosition) {
			if (this.tickPosition) {
				let lastTickPoint = this.tickPosition.clone();
				this.tickPosition.setPoint(this.gesturePosition);
				this.speed = lastTickPoint.to(this.tickPosition);
				this.speed.magnitude /= this.timeScale;
			} else {
				this.tickPosition = this.gesturePosition.clone();
			}
		}

		this.render();
	}

	stopSliding() {
		ticker.off("tick", this.handleTickCallback);
		this.classList.remove("is-moved");
		this.isSliding = false;
	}

	constrainPoint(p: Point, overdrag = true, retouch = false) {
		let r2 = this.bounds;
		let dt = r2.top - (p.y - this.size.y * this.origin.y);
		let dl = r2.left - (p.x - this.size.x * this.origin.x);
		let dr = p.x + this.size.x * (1 - this.origin.x) - r2.right;
		let db = p.y + this.size.y * (1 - this.origin.y) - r2.bottom;

		let snapY = r2.height > this.size.y;
		let snapX = r2.width > this.size.x;

		if (!retouch || !snapY) {
			if (dt > 0) p.y = r2.top + this.size.y * this.origin.y;
			if (db > 0 && (!overdrag || !this.isSwipeDownClose))
				p.y = r2.bottom - this.size.y * (1 - this.origin.y);
		}

		if (!retouch || !snapX) {
			if (dl > 0) p.x = r2.left + this.size.x * this.origin.x;
			if (dr > 0) p.x = r2.right - this.size.x * (1 - this.origin.x);
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
		let point = this.position.clone();
		let scale = this.scale;
		let angle = this.angle;

		if (this.gestureScale) {
			scale = this.constrainScale(scale * this.gestureScale);
		}

		if (this.gestureOffset) {
			point.addVector(this.gestureOffset);
		}

		if (scale !== this.scale) {
			let pull = this.pull.copy();
			pull.magnitude *= scale / this.scale - 1;
			point.addVector(pull);
		}

		if (this.gestureAngle) {
			angle += this.gestureAngle;
		}

		if (this.pull) {
			let v1 = this.pull.copy();
			v1.magnitude *= this.gestureScale;

			let v2 = v1.copy();
			v2.direction += this.gestureAngle;
			v1.direction -= Math.PI;
			v2.add(v1);
			point.addVector(v2);
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

		if (this.isScaledDown && this.isPinchToClose && !this.isRotate) {
			this.isRotate = true;

			this.constrainPoint(render, true);
			this.position = render;
			this.scale = gesture.scale;

			this.downPosition = this.getAveragePoint();
			this.gesturePosition = this.downPosition.clone();
			this.gestureStartDistance = this.getAverageDistance();
			this.pull = this.downPosition.to(this.position);
		}

		if (!this.isSliding && !this.isRotate) {
			if (s !== this.scale) {
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

			let pull = this.pull.copy();
			pull.magnitude *= -animScale;
			render.addVector(pull);
		}

		let opacity = 1 - this.animRatio;

		if (this.isPinchToClose) {
			// On iPhone, opacity goes from 0 to 1 in the 30-100% image scale.
			opacity *= clamp((s - 0.3) / 0.7, 0, 1);
		}

		this.style.setProperty("--opacity", opacity.toString());

		let x =
			render.x - this.offsetPosition.x - this.offsetSize.x * this.origin.x;
		let y =
			render.y - this.offsetPosition.y - this.offsetSize.y * this.origin.y;
		this.figure.style.transform = `translate(${x}px, ${y}px) scale(${s}) rotate(${gesture.angle}rad)`;
	}

	close() {
		this.loader.onload = null;
		window.removeEventListener("resize", this.handleReiszeCallback);
		window.removeEventListener("keydown", this.handleKeyDownCallback);
		this.removeEventListener("wheel", this.handleWheelCallback);

		if (this.isOpening) {
			// If open transition has not finished, prevent the closing one from
			// triggering onOpenEnd().
			this.figure.removeEventListener("transitionend", this.onOpenEndCallback);
			this.isOpening = false;
		} else {
			this.figure.removeEventListener(
				"transitionend",
				this.updateResolutionCallback
			);
		}

		this.isClosed = true;

		ticker.off("tick", this.handleTickCallback);

		let r1 = this.opener.getBoundingClientRect();
		let openerAspect = r1.width / r1.height;
		let rect = this.wrapper.getBoundingClientRect();
		let width = rect.width;
		let height = width / openerAspect;

		if (height > rect.height) {
			height = rect.height;
			width = height * openerAspect;
		}

		let widthDiff = this.offsetSize.x - width;
		let heightDiff = this.offsetSize.y - height;
		let sx =
			r1.left +
			r1.width * this.origin.x -
			(this.offsetPosition.x + this.offsetSize.x * this.origin.x) -
			widthDiff * (0.5 - this.origin.x);
		let sy =
			r1.top +
			r1.height * this.origin.y -
			(this.offsetPosition.y + this.offsetSize.y * this.origin.y) -
			heightDiff * (0.5 - this.origin.y);

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
		this.figure.style.width = `${width}px`;
		this.figure.style.height = `${height}px`;
		this.figure.style.transform = `translate(${sx}px, ${sy}px) scale(${scale})`;

		this.scale = 1;
		this.updateResolution();

		this.style.setProperty("--opacity", "0");
		this.opener.classList.remove("ob-lightbox-is-active");

		this.figure.addEventListener("transitionend", () => {
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
	updateBounds(scale = this.scale) {
		/**
		 * @todo this.size should not be updated in bounds?
		 */
		this.size.setPoint(this.offsetSize).mul(scale);

		let r3 = this.getMaxBoundsRect();
		let w = Math.max(this.size.x, r3.width);
		let h = Math.max(this.size.y, r3.height);
		let bt = r3.bottom - h;
		let br = r3.left + w;
		let bb = r3.top + h;
		let bl = r3.right - w;

		this.bounds = new DOMRectReadOnly(bl, bt, br - bl, bb - bt);
	}

	getMaxBoundsRect() {
		let r = this.wrapper.getBoundingClientRect();
		let w = Math.min(this.size.x, r.width);
		let h = Math.min(this.size.y, r.height);

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
		return p.y + this.size.y * (1 - this.origin.y) - this.bounds.bottom;
	}

	getAveragePoint() {
		return Point.average(...this.pointers.map((p) => p.point));
	}

	getAverageDistance() {
		let count = this.pointers.length;

		if (count > 1) {
			let result = 0;

			for (let i = 0; i < count; i++) {
				let p1 = this.pointers[i].point;
				let p2 = (this.pointers[i + 1] || this.pointers[0]).point;
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
