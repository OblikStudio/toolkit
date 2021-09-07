import { Component } from "../../core/component";
import { Point } from "../../utils/math";

interface Options {
	template: HTMLTemplateElement;
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
	ptTotalDelta: Point; // entire offset from ptCurrent for the whole gesture

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

	open() {
		this.elBox.classList.add("is-open");
		this.ptOffset = new Point(this.elImg.offsetLeft, this.elImg.offsetTop);
		this.ptStatic = this.ptOffset.copy();

		let handleMove = (e: PointerEvent) => {
			this.ptDelta.set(e.clientX - this.ptDown.x, e.clientY - this.ptDown.y);
			this.ptRender.set(
				this.ptStatic.x + this.ptDelta.x - this.ptOffset.x,
				this.ptStatic.y + this.ptDelta.y - this.ptOffset.y
			);

			this.elImg.style.transform = `translate(${this.ptRender.x}px, ${this.ptRender.y}px)`;
		};

		this.elBox.addEventListener("pointerdown", (e) => {
			e.preventDefault();
			this.ptDown = new Point(e.clientX, e.clientY);
			this.elBox.addEventListener("pointermove", handleMove);
			this.elBox.classList.add("is-moved");
		});

		this.elBox.addEventListener("pointerup", (e) => {
			this.ptStatic.add(this.ptDelta);
			this.elBox.removeEventListener("pointermove", handleMove);
			this.elBox.classList.remove("is-moved");
		});
	}
}
