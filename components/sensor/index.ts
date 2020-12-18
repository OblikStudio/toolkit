import { getClientRect } from "../../utils/dom";
import { throttle } from "../../utils/functions";
import { Component } from "../..";

export type Edge = "top" | "right" | "bottom" | "left";

export interface Options {
	class?: string;
	offset?: number;
	container?: Window | HTMLElement;
	edge?: Edge;
	containerEdge?: Edge;
}

export class Sensor extends Component<HTMLElement, Options> {
	static defaults: Options = {
		class: "is-active",
		offset: 0,
		container: window,
		edge: "top",
		containerEdge: "bottom",
	};

	value: boolean;

	protected updateHandler = throttle(this.update.bind(this), 80);

	init() {
		window.addEventListener("scroll", this.updateHandler);
		window.addEventListener("resize", this.updateHandler);
		this.update();
	}

	destroy() {
		window.removeEventListener("scroll", this.updateHandler);
		window.removeEventListener("resize", this.updateHandler);
	}

	update() {
		let elRect = this.$element.getBoundingClientRect();
		let targetRect = getClientRect(this.$options.container);
		let value = this.measure(elRect, targetRect);

		if (value !== this.value) {
			this.mutate(value);
			this.value = value;
		}
	}

	measure(elRect: ClientRect, ctrRect: ClientRect) {
		let v1 = elRect[this.$options.edge] + this.$options.offset;
		let v2 = ctrRect[this.$options.containerEdge];
		return v2 - v1 > 0;
	}

	mutate(input: boolean) {
		if (input) {
			this.$element.classList.add(this.$options.class);
		} else {
			this.$element.classList.remove(this.$options.class);
		}
	}
}

export default Sensor;
