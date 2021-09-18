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
	/**
	 * Image DOM offset from the viewport, subtracted when applying transform.
	 */
	ptOffset: Point;

	/**
	 * Active image position before any manipulation.
	 */
	ptStatic: Point;

	/**
	 * Offset for the current pointer. Added to ptTotalOffset and reset on each
	 * pointer up/down due to the different mechanics.
	 */
	ptDelta = new Point();

	/**
	 * Total offset from ptStatic for the current gesture, i.e. combination of
	 * pointer up/down events.
	 */
	ptTotalDelta = new Point(); // entire offset from ptCurrent for the whole gesture

	/**
	 * Active scale excluding pinch gesture manipulation.
	 */
	scaleStatic: number;

	/**
	 * Coords at which a drag gesture has started.
	 */
	ptDown: Point;

	/**
	 * Final transform() offset.
	 */
	ptRender = new Point();

	/**
	 * Scale for the current zoom gesture.
	 */
	scaleDelta: number;

	/**
	 * Currently active pointers.
	 */
	ptrs: Pointer[] = [];

	elBox: HTMLElement;
	elImgWrap: HTMLElement;
	elImg: HTMLImageElement;
	elWrap: HTMLElement;
	width: number;
	height: number;

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

	/**
	 * @todo ptScaleStatic, ptScaleDelta, using avgPoint as focal point and
	 * comparing average of original and current distance between all pointers.
	 */
	open() {
		this.elBox.classList.add("is-open");
		this.ptOffset = new Point(this.elImg.offsetLeft, this.elImg.offsetTop);
		this.ptStatic = this.ptOffset.copy();

		let handleMove = (e: PointerEvent) => {
			this.ptrs
				.find((p) => p.id === e.pointerId)
				?.point.set(e.clientX, e.clientY);

			let avg = avgPoint(this.ptrs);
			this.ptDelta.set(avg.x - this.ptDown.x, avg.y - this.ptDown.y);

			this.ptRender.set(
				this.ptStatic.x + this.ptTotalDelta.x + this.ptDelta.x,
				this.ptStatic.y + this.ptTotalDelta.y + this.ptDelta.y
			);

			this.elImg.style.transform = `translate(${
				this.ptRender.x - this.ptOffset.x
			}px, ${this.ptRender.y - this.ptOffset.y}px)`;
		};

		this.elBox.addEventListener("pointerdown", (e) => {
			e.preventDefault();

			this.ptrs.push({
				id: e.pointerId,
				point: new Point(e.clientX, e.clientY),
			});

			/**
			 * Add directly to ptStatic, instead of to ptTotalDelta.
			 */
			this.ptDown = avgPoint(this.ptrs);
			this.ptTotalDelta.add(this.ptDelta);
			this.ptDelta.set(0, 0);

			this.elBox.addEventListener("pointermove", handleMove);
			this.elBox.classList.add("is-moved");
		});

		let handleOut = (e: PointerEvent) => {
			let ptr = this.ptrs.find((p) => p.id === e.pointerId);
			if (ptr) {
				this.ptrs.splice(this.ptrs.indexOf(ptr), 1);
			}

			this.ptTotalDelta.add(this.ptDelta);
			this.ptDelta.set(0, 0);

			if (this.ptrs.length === 0) {
				this.ptStatic.add(this.ptTotalDelta);
				this.ptTotalDelta.set(0, 0);

				this.elBox.removeEventListener("pointermove", handleMove);
				this.elBox.classList.remove("is-moved");
			} else {
				this.ptDown = avgPoint(this.ptrs);
			}
		};

		this.elBox.addEventListener("pointerup", handleOut);
		this.elBox.addEventListener("pointerleave", handleOut);
		this.elBox.addEventListener("pointercancel", handleOut);
	}
}
