import { Component } from "../../core/component";
import { Point } from "../../utils/math";

interface Options {
	template: HTMLTemplateElement;
}

interface Pointer {
	id: number;
	point: Point;
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

	ptrs: Pointer[] = [];
	ptrDistStatic = 0;

	elBox: HTMLElement;
	elImgWrap: HTMLElement;
	elImg: HTMLImageElement;
	elWrap: HTMLElement;
	width: number;
	height: number;

	size = new Point();

	downHandler = this.handleDown.bind(this);
	moveHandler = this.handleMove.bind(this);
	outHandler = this.handleOut.bind(this);

	init() {
		this.width = parseInt(this.$element.getAttribute("width"));
		this.height = parseInt(this.$element.getAttribute("height"));

		this.$element.addEventListener("click", () => {
			this.clone();
			this.open();
		});
	}

	clone() {
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
	}

	open() {
		this.elBox.classList.add("is-open");

		this.size.set(this.elImg.offsetWidth, this.elImg.offsetHeight);
		this.ptOffset.set(this.elImg.offsetLeft, this.elImg.offsetTop);
		this.ptStatic.set(this.ptOffset);

		this.elBox.addEventListener("pointerdown", this.downHandler);
		this.elBox.addEventListener("pointerup", this.outHandler);
		this.elBox.addEventListener("pointerleave", this.outHandler);
		this.elBox.addEventListener("pointercancel", this.outHandler);
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

	handleDown(e: PointerEvent) {
		e.preventDefault();

		this.ptrs.push({
			id: e.pointerId,
			point: new Point(e.clientX, e.clientY),
		});

		this.elBox.addEventListener("pointermove", this.moveHandler);
		this.elBox.classList.add("is-moved");

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
		}

		let sizeDiff = new Point(
			(this.scaleDelta - 1) * this.size.x * this.scaleStatic,
			(this.scaleDelta - 1) * this.size.y * this.scaleStatic
		);

		let pullRatio = new Point(
			(this.ptDown.x - this.ptStatic.x) / (this.size.x * this.scaleStatic),
			(this.ptDown.y - this.ptStatic.y) / (this.size.y * this.scaleStatic)
		);

		this.ptPull.set(sizeDiff.x * pullRatio.x, sizeDiff.y * pullRatio.y);

		this.render();
	}

	handleOut(e: PointerEvent) {
		let ptr = this.ptrs.find((p) => p.id === e.pointerId);
		if (ptr) {
			this.ptrs.splice(this.ptrs.indexOf(ptr), 1);
		} else {
			// On mobile, `pointerup` and `pointerleave` can both be triggered
			// for the same pointer, causing handleOut() to run twice.
			return;
		}

		if (this.ptrs.length === 0) {
			this.elBox.removeEventListener("pointermove", this.moveHandler);
			this.elBox.classList.remove("is-moved");
		}

		this.pointersChange();
		this.render();
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
