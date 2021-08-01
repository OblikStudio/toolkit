import { Component } from "../..";
import { mutate } from "../../core/mutate";

export class Content extends Component<HTMLElement> {
	wrapper: HTMLElement;

	init() {
		this.wrapper = this.$element.firstElementChild as HTMLElement;
	}
}

export class Expandable extends Component<HTMLElement> {
	static components = {
		content: Content,
	};

	$content: Content;
	wrapper: HTMLElement;

	init() {
		this.wrapper = this.$element.firstElementChild as HTMLElement;
		this.update();
		this.listen();
	}

	update() {
		let fullHeight = this.wrapper.offsetHeight;
		let expandedHeight = this.$content.$element.offsetHeight;
		let fluidHeight = this.$content.wrapper.offsetHeight;
		let fixedHeight = fullHeight - expandedHeight;

		mutate(() => {
			this.$element.style.setProperty("--fluid-height", `${fluidHeight}px`);
			this.$element.style.setProperty("--fixed-height", `${fixedHeight}px`);
		});
	}

	listen() {
		window.addEventListener("resize", () => {
			this.update();
		});
	}
}

export default Expandable;
