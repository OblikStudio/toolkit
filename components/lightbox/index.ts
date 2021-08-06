import { Component } from "../../core/component";
import { mutate } from "../../core/mutate";

interface Options {
	template: HTMLTemplateElement;
}

export class Lightbox extends Component<HTMLImageElement, Options> {
	elBox: HTMLElement;
	elImg: HTMLImageElement;
	width: number;
	height: number;
	isExpandable: boolean;

	init() {
		this.width = parseInt(this.$element.getAttribute("width"));
		this.height = parseInt(this.$element.getAttribute("height"));

		this.$element.addEventListener("click", () => {
			this.clone();
			this.open();
			this.checkExpand();
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
		this.elImg.width = this.width;
		this.elImg.height = this.height;

		this.elBox.addEventListener("click", () => {
			this.close();
		});

		this.elImg.addEventListener("click", (e) => {
			if (this.isExpandable) {
				e.stopPropagation();
				this.expand();
			}
		});

		this.preload();

		document.body.appendChild(this.elBox);
	}

	expand() {
		let sw = this.width / this.elImg.offsetWidth;
		let sh = this.height / this.elImg.offsetHeight;
		this.elImg.style.transform = `scale(${sw}, ${sh})`;
	}

	checkExpand() {
		let w = this.elImg.offsetWidth;
		let h = this.elImg.offsetHeight;

		this.isExpandable = this.width > w || this.height > h;

		if (this.isExpandable) {
			this.elBox.classList.add("is-expandable");
		} else {
			this.elBox.classList.remove("is-expandable");
		}
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
