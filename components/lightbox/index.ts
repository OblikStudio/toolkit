import { Component } from "../../core/component";
import { Point } from "../../utils/math";

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

		this.ptOffset.set(this.elImg.offsetLeft, this.elImg.offsetTop);
		this.ptStatic.set(this.ptOffset);
		this.scaleStatic = 1;
		this.scaleDelta = 1;

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
	}

	handleDown(e: PointerEvent) {
		e.preventDefault();

		if (this.ptrs.length === 0) {
			this.gestureStart(e);
		}

		this.ptrs.push({
			id: e.pointerId,
			point: new Point(e.clientX, e.clientY),
			origin: new Point(e.clientX, e.clientY),
		});

		this.pointersChange();
		this.render();
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
				this.ptStatic.set(this.elImg.offsetLeft, this.elImg.offsetTop);
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
	}

	render() {
		this.ptRender.set(
			this.ptStatic.x + this.ptDelta.x - this.ptPull.x,
			this.ptStatic.y + this.ptDelta.y - this.ptPull.y
		);

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
