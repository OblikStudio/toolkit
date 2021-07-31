import { Component } from "../..";
import { mutate } from "../../core/mutate";

interface Options {
	var?: string;
	varTarget?: HTMLElement;
}

export class Height extends Component<HTMLElement, Options> {
	target: HTMLElement;

	init() {
		this.target = this.$element.firstElementChild as HTMLElement;
		this.update();
		this.listen();
	}

	listen() {
		window.addEventListener("resize", () => {
			this.update();
		});
	}

	update() {
		let height = `${this.target.offsetHeight}px`;

		mutate(() => {
			if (this.$options.var) {
				let target = this.$options.varTarget ?? this.$element;
				target.style.setProperty(`--${this.$options.var}`, height);
			} else {
				this.$element.style.height = height;
			}
		});
	}
}

export default Height;
