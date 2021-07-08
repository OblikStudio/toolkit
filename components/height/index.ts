import { Component } from "../..";

interface Options {
	var?: string;
	varTarget?: HTMLElement;
	target?: HTMLElement;
}

export class Height extends Component<HTMLElement, Options> {
	target: HTMLElement;
	varName: string;
	varTarget: HTMLElement;

	create() {
		this.target =
			this.$options.target ?? (this.$element.firstElementChild as HTMLElement);

		if (this.$options?.var) {
			this.varName = this.$options.var;
			this.varTarget = this.$options.varTarget ?? this.$element;
		}
	}

	init() {
		this.update();
	}

	update() {
		let height = `${this.target.offsetHeight}px`;

		if (this.varTarget) {
			this.varTarget.style.setProperty("--" + this.varName, height);
		} else {
			this.$element.style.height = height;
		}
	}
}

export default Height;
