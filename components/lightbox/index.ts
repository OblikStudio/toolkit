import { Component } from "../../core/component";
import { mutate } from "../../core/mutate";

interface Options {
	template: HTMLTemplateElement;
}

export class Lightbox extends Component<HTMLImageElement, Options> {
	box: HTMLElement;

	init() {
		this.$element.addEventListener("click", () => {
			let target = this.$options.template.content.firstElementChild;

			this.box = target.cloneNode(true) as HTMLElement;

			let img = this.box.querySelector("[data-img]") as HTMLImageElement;
			let w = parseInt(this.$element.getAttribute("width"));
			let h = parseInt(this.$element.getAttribute("height"));
			img.width = w;
			img.height = h;

			this.box.addEventListener("click", () => {
				this.box.classList.remove("is-open");
				document.body.removeChild(this.box);
			});

			let loader = new Image();
			loader.src = this.$element.src;

			if (loader.complete) {
				img.src = loader.src;
			} else {
				img.src = this.$element.currentSrc;
				loader.addEventListener("load", () => {
					if (img.naturalWidth) {
						img.src = loader.src;
					}
				});
			}

			document.body.appendChild(this.box);

			let r1 = this.$element.getBoundingClientRect();
			let r2 = img.getBoundingClientRect();

			let sw = r1.width / r2.width;
			let sh = r1.height / r2.height;
			let sx = r1.left - (r2.left + (r2.width - r1.width) / 2);
			let sy = r1.top - (r2.top + (r2.height - r1.height) / 2);
			let trans = `translate(${sx}px, ${sy}px) scale(${sw}, ${sh})`;

			this.box.style.setProperty("--img-transform", trans);

			mutate(() => {
				this.box.classList.add("is-open");
			});
		});
	}
}
