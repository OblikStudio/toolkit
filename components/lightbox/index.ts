import { Component } from "../../core/component";
import { clamp, Point } from "../../utils/math";

/**
 * @todo scale overdrag, not allowing to scale past a point
 * @todo drag inertia
 * @todo lightbox closed when drag starts outside of image
 * @todo smooth open/close transitions
 * @todo gradual opacity change on pinch-close
 * @todo rotate on pinch-close
 */

/**
 * On down, if there's only one pointer and the last gesture (1) happened within
 * TIME_DOUBLE_TAP, (2) within DIST_DOUBLE_TAP, and (3) was not a drag, flag a
 * double-tap. On up, if the gesture was not a drag, trigger the double-tap.
 */
const DIST_DOUBLE_TAP = 50;
const TIME_DOUBLE_TAP = 400;

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
	ptDelta = new Point();
	ptPull = new Point();
	ptRender = new Point();

	scaleStatic = 1;
	scaleDelta = 1;

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
	ptrDistStatic = 0;

	elBox: HTMLElement;
	elImgWrap: HTMLElement;
	elImg: HTMLImageElement;
	elWrap: HTMLElement;
	width: number;
	height: number;

	downHandler = this.handleDown.bind(this);
	moveHandler = this.handleMove.bind(this);
	outHandler = this.handleUp.bind(this);

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
		this.scaleDelta = 1;

		this.updateBounds();
		this.ptOffset.set(this.rectBounds.x, this.rectBounds.y);
		this.ptStatic.set(this.ptOffset);

		this.elBox.addEventListener("pointerdown", this.downHandler);
		this.elBox.addEventListener("pointerup", this.outHandler);
		this.elBox.addEventListener("pointerleave", this.outHandler);
		this.elBox.addEventListener("pointercancel", this.outHandler);
	}

	close() {
		document.body.removeChild(this.elBox);
		this.elBox = null;
		this.elWrap = null;
		this.elImgWrap = null;
		this.elImg = null;
	}

	pointersChange() {
		if (this.ptrs.length) {
			this.ptDown = avgPoint(this.ptrs);
		} else {
			this.ptDown = null;
		}

		this.ptStatic.add(this.ptDelta).subtract(this.ptPull);
		this.ptDelta.set(0, 0);
		this.ptPull.set(0, 0);

		this.ptrDistStatic = this.getAverageDistance();
		this.scaleStatic *= this.scaleDelta;
		this.scaleDelta = 1;
	}

	gestureStart(e: PointerEvent) {
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

	handleMove(e: PointerEvent) {
		this.ptrs
			.find((p) => p.id === e.pointerId)
			?.point.set(e.clientX, e.clientY);

		let avg = avgPoint(this.ptrs);
		this.ptDelta.set(avg.x - this.ptDown.x, avg.y - this.ptDown.y);

		let avgDist = this.getAverageDistance();
		if (avgDist && this.ptrDistStatic) {
			this.scaleDelta = avgDist / this.ptrDistStatic;

			if (this.scaleDelta > 1) {
				this.isPinchToClose = false;
			}
		}

		this.ptPull.set(
			(this.scaleDelta - 1) * (this.ptDown.x - this.ptStatic.x),
			(this.scaleDelta - 1) * (this.ptDown.y - this.ptStatic.y)
		);

		this.render();
	}

	handleUp(e: PointerEvent) {
		let ptr = this.ptrs.find((p) => p.id === e.pointerId);
		if (!ptr) {
			// On mobile, `pointerup` and `pointerleave` can both be triggered
			// for the same pointer, causing handleOut() to run twice.
			return;
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
		this.elBox.classList.remove("is-moved");

		if (this.isDoubleTap) {
			if (this.scaleStatic > 1) {
				let dx = this.lastTapUp.clientX - this.ptStatic.x;
				let dy = this.lastTapUp.clientY - this.ptStatic.y;
				let r = 1 - 1 / this.scaleStatic;

				this.ptStatic.x += dx * r;
				this.ptStatic.y += dy * r;
				this.scaleStatic = 1;
			} else {
				let scale = this.width / this.elImg.offsetWidth;
				let pull = new Point(
					(scale - 1) * (e.clientX - this.ptStatic.x),
					(scale - 1) * (e.clientY - this.ptStatic.y)
				);

				this.ptStatic.subtract(pull);
				this.scaleStatic = scale;
			}

			this.isDoubleTap = false;
			this.lastTapUp = null;
		}

		if (this.isPinchToClose && this.scaleStatic < 1) {
			this.close();
		} else if (this.scaleStatic < 1) {
			this.ptStatic.set(this.elImg.offsetLeft, this.elImg.offsetTop);
			this.scaleStatic = 1;
			navigator.vibrate?.(50);
		}

		if (
			this.isSwipeDownClose &&
			(this.swipeDownCoef === 1 || this.swipeDownDelta > 0)
		) {
			this.close();
		}

		if (this.elImg) {
			// not closed by one of the conditions above
			this.updateBounds();
			this.constrainPoint(this.ptStatic, false);
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
			this.elImg.offsetWidth * this.scaleStatic * this.scaleDelta,
			this.elImg.offsetHeight * this.scaleStatic * this.scaleDelta
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
		this.ptRender.set(
			this.ptStatic.x + this.ptDelta.x - this.ptPull.x,
			this.ptStatic.y + this.ptDelta.y - this.ptPull.y
		);

		this.updateBounds();
		this.constrainPoint(this.ptRender);

		let swipeDownMax = window.innerHeight / 2;
		let lastSwipeDownCoef = this.swipeDownCoef;
		this.swipeDownCoef = clamp(this.swipeDown / swipeDownMax, 0, 1);
		this.swipeDownDelta = this.swipeDownCoef - lastSwipeDownCoef;

		let opacity = 1 - this.swipeDownCoef;
		this.elBox.style.setProperty("--opacity", opacity.toString());

		this.elImg.style.transform = `translate(${
			this.ptRender.x - this.ptOffset.x
		}px, ${this.ptRender.y - this.ptOffset.y}px) scale(${
			this.scaleStatic * this.scaleDelta
		})`;
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
