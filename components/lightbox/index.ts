import { Component } from "../../core/component";
import { mutate } from "../../core/mutate";

interface Options {
	template: HTMLTemplateElement;
}

export class Lightbox extends Component<HTMLImageElement, Options> {
	elBox: HTMLElement;
	elImg: HTMLImageElement;

	init() {
		this.$element.addEventListener("click", () => {
			this.clone();
			this.open();
		});
	}

	preload() {
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
	}

	clone() {
		let target = this.$options.template.content.firstElementChild;

		this.elBox = target.cloneNode(true) as HTMLElement;
		this.elImg = this.elBox.querySelector("[data-img]") as HTMLImageElement;
		this.elImg.width = parseInt(this.$element.getAttribute("width"));
		this.elImg.height = parseInt(this.$element.getAttribute("height"));

		this.elBox.addEventListener("click", () => {
			this.close();
		});

		this.preload();

		document.body.appendChild(this.elBox);
	}

	open() {
		let r1 = this.$element.getBoundingClientRect();
		let r2 = this.elImg.getBoundingClientRect();

		let sw = r1.width / r2.width;
		let sh = r1.height / r2.height;
		let sx = r1.left - (r2.left + (r2.width - r1.width) / 2);
		let sy = r1.top - (r2.top + (r2.height - r1.height) / 2);
		let trans = `translate(${sx}px, ${sy}px) scale(${sw}, ${sh})`;

		mutate(() => {
			this.elBox.style.setProperty("--img-transform", trans);

			mutate(() => {
				this.elBox.classList.add("is-open");
			});
		});
	}

	close() {
		this.elBox.classList.remove("is-open");
		document.body.removeChild(this.elBox);
	}
}
