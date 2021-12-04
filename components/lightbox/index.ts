import { Component } from "../../core/component";
import { ticker } from "../../core/ticker";
import { clamp, Point, Vector } from "../../utils/math";

/**
 * @todo fix mobile flicker after pointerup
 * @todo fix no scale transition when swipe-close and pulled back with intertia
 * @todo lightbox closed when drag starts outside of image
 * @todo smooth open/close transitions
 * @todo gradual opacity change on pinch-close
 * @todo rotate on pinch-close
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
	isSliding = false;

	/**
	 * Last effective point of focus, computed from the average of all pointers.
	 * Updated on pointerup only if the movement since last pointerup was
	 * greater than X.
	 */
	ptLastFocus = new Point();

	scaleStatic = 1;
	scaleLimit = 7;

	isPinchToClose: boolean;
	isDoubleTap: boolean;
	lastTapUp: PointerEvent;

	isSwipeDownClose: boolean;
	swipeDown = 0;
	swipeDownCoef = 0;

	/**
	 * If delta is > 0, the user is continuing with the gesture, otherwise he's
	 * reversing it.
	 */
	swipeDownDelta = 0;

	ptrs: Pointer[] = [];

	elBox: HTMLElement;
	elImgWrap: HTMLElement;
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
		this.elWrap = this.elBox.querySelector("[data-box]");
		this.elImgWrap = this.elBox.querySelector("[data-img-wrap]");
		this.elImg = this.elBox.querySelector("[data-img]") as HTMLImageElement;
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
		this.elBox.classList.add("is-open");
		this.elBox.addEventListener("click", (e) => {
			if (e.target !== this.elImg) {
				this.close();
			}
		});

		this.scaleStatic = 1;

		this.updateBounds();
		this.ptOffset.set(this.rectBounds.x, this.rectBounds.y);
		this.ptRender.set(this.ptOffset);

		this.elBox.addEventListener("pointerdown", this.downHandler);
		this.elBox.addEventListener("pointerup", this.outHandler);
		this.elBox.addEventListener("pointerleave", this.outHandler);
		this.elBox.addEventListener("pointercancel", this.outHandler);

		(window as any).lb = this;
	}

	close() {
		document.body.removeChild(this.elBox);
		this.elBox = null;
		this.elWrap = null;
		this.elImgWrap = null;
		this.elImg = null;
	}

	pullRatio: Point;

	pointersChange() {
		if (this.ptrs.length) {
			this.ptDown = avgPoint(this.ptrs);
			this.gesturePoint = this.ptDown.copy();
			this.avgDist = this.getAverageDistance();

			let r = this.elImg.getBoundingClientRect();
			this.pullRatio = new Point(
				(this.ptDown.x - this.ptRender.x) / r.width,
				(this.ptDown.y - this.ptRender.y) / r.height
			);
		} else {
			this.ptDown = null;
			this.pullRatio = null;
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
		this.elBox.classList.add("is-moved");

		this.isSwipeDownClose =
			this.rectBounds.bottom === this.ptRender.y + this.imgSize.y;

		this.ptTick = null;
		this.vcSpeed = null;
		this.isSliding = false;
		ticker.on("tick", this.tickHandler);
	}

	handleTick(delta: number) {
		if (this.isSliding) {
			let vcDelta = this.vcSpeed.copy();
			vcDelta.magnitude /= 1000 / delta;

			if (vcDelta.magnitude < 0.1) {
				ticker.off("tick", this.tickHandler);
				this.elBox.classList.remove("is-moved");
				this.isSliding = false;
			}

			this.ptRender.add(vcDelta);
			this.vcSpeed.magnitude *= 0.9;

			let cp = this.ptRender.copy();
			this.constrainPoint(cp, false);

			let vec = this.ptRender.to(cp);
			vec.magnitude *= 0.2;
			this.ptRender.add(vec);

			this.render();
			return;
		}

		if (this.ptTick) {
			this.vcSpeed = this.ptTick.to(this.ptRender);
			this.vcSpeed.magnitude *= 1000 / delta;
			this.ptTick.set(this.ptRender);
		} else {
			this.ptTick = this.ptRender.copy();
		}
	}

	handleDown(e: PointerEvent) {
		e.preventDefault();

		if (this.swipeDown > 25) {
			return;
		}

		this.ptrs.push({
			id: e.pointerId,
			point: new Point(e.clientX, e.clientY),
			origin: new Point(e.clientX, e.clientY),
		});

		this.pointersChange();
		this.render();

		if (this.ptrs.length === 1) {
			this.gestureStart(e);
		}

		if (this.ptrs.length > 1) {
			this.isSwipeDownClose = false;
		}
	}

	avgDist: number;
	gestureScale: number;
	gesturePoint: Point;

	handleMove(e: PointerEvent) {
		this.ptrs
			.find((p) => p.id === e.pointerId)
			?.point.set(e.clientX, e.clientY);

		let lastGesturePoint = this.gesturePoint;
		this.gesturePoint = avgPoint(this.ptrs);

		if (lastGesturePoint) {
			let delta = this.gesturePoint.copy().subtract(lastGesturePoint);
			this.ptStatic.add(delta);
		}

		let lastAvgDist = this.avgDist;
		this.avgDist = this.getAverageDistance();

		if (lastAvgDist && this.avgDist) {
			let distRatio = this.avgDist / lastAvgDist;
			this.gestureScale *= distRatio;

			let lastScale = this.scaleStatic;
			this.scaleStatic = this.constrainScale(this.gestureScale);

			let r = this.elImg.getBoundingClientRect();
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

		this.render();
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

		if (this.elBox) {
			this.render();
		}
	}

	gestureEnd(e: PointerEvent) {
		this.elBox.removeEventListener("pointermove", this.moveHandler);
		this.isSliding = this.vcSpeed?.magnitude > 100;

		if (this.isDoubleTap) {
			if (this.scaleStatic > 1) {
				let dx = this.lastTapUp.clientX - this.ptRender.x;
				let dy = this.lastTapUp.clientY - this.ptRender.y;
				let r = 1 - 1 / this.scaleStatic;

				this.ptRender.x += dx * r;
				this.ptRender.y += dy * r;
				this.scaleStatic = 1;
			} else {
				let scale = this.width / this.elImg.offsetWidth;
				let pull = new Point(
					(scale - 1) * (e.clientX - this.ptRender.x),
					(scale - 1) * (e.clientY - this.ptRender.y)
				);

				this.ptRender.subtract(pull);
				this.scaleStatic = scale;
			}

			this.isDoubleTap = false;
			this.lastTapUp = null;
			this.isSliding = false;
		}

		if (this.isPinchToClose && this.scaleStatic < 1) {
			this.close();
			this.isSliding = false;
		} else if (this.scaleStatic < 1) {
			this.ptRender.set(this.elImg.offsetLeft, this.elImg.offsetTop);
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
			(this.swipeDownCoef === 1 || this.swipeDownDelta > 0)
		) {
			this.close();
			this.isSliding = false;
		}

		if (!this.isSliding) {
			if (this.elBox) {
				this.elBox.classList.remove("is-moved");
			}

			ticker.off("tick", this.tickHandler);
		}

		if (this.elImg) {
			// not closed by one of the conditions above
			this.updateBounds();

			if (!this.isSliding) {
				this.constrainPoint(this.ptRender, false);
			}
		}

		this.swipeDown = 0;
		this.swipeDownDelta = 0;
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

	updateBounds() {
		this.imgSize.set(
			this.elImg.offsetWidth * this.scaleStatic,
			this.elImg.offsetHeight * this.scaleStatic
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

	getOverdrag(amount: number) {
		let limit = 150;
		return (amount * limit) / (amount + limit);
	}

	constrainPoint(p: Point, overdrag = true) {
		let r2 = this.rectBounds;
		let dt = r2.top - p.y;
		let dl = r2.left - p.x;
		let dr = p.x + this.imgSize.x - r2.right;
		let db = p.y + this.imgSize.y - r2.bottom;

		this.swipeDown = 0;

		if (overdrag) {
			if (dt > 0) p.y = r2.top - this.getOverdrag(dt);
			if (dl > 0) p.x = r2.left - this.getOverdrag(dl);
			if (dr > 0) p.x = r2.right - this.imgSize.x + this.getOverdrag(dr);
			if (db > 0) {
				if (!this.isSwipeDownClose) {
					p.y = r2.bottom - this.imgSize.y + this.getOverdrag(db);
				} else {
					this.swipeDown = db;
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
		let swipeDownMax = window.innerHeight / 2;
		let lastSwipeDownCoef = this.swipeDownCoef;
		this.swipeDownCoef = clamp(this.swipeDown / swipeDownMax, 0, 1);
		this.swipeDownDelta = this.swipeDownCoef - lastSwipeDownCoef;

		let opacity = 1 - this.swipeDownCoef;
		this.elBox.style.setProperty("--opacity", opacity.toString());

		this.elImg.style.transform = `translate(${
			this.ptRender.x - this.ptOffset.x
		}px, ${this.ptRender.y - this.ptOffset.y}px) scale(${this.scaleStatic})`;
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
