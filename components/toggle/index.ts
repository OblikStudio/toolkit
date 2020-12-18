import { Component } from "../..";

interface Options {
	target: Element;
	on?: keyof GlobalEventHandlersEventMap;
	off?: keyof GlobalEventHandlersEventMap;
	active?: boolean;
	class?: string;
}

export class Toggle extends Component<Element, Options> {
	static defaults: Partial<Options> = {
		on: "click",
		active: false,
		class: "is-active",
	};

	active: boolean;
	onHandler: () => void;
	offHandler: () => void;

	init() {
		if (!this.$options.target) {
			throw new Error("No target set");
		}

		if (this.$options.off) {
			this.onHandler = this.on.bind(this);
			this.offHandler = this.off.bind(this);

			this.$element.addEventListener(this.$options.off, this.offHandler);
		} else {
			this.onHandler = this.toggle.bind(this);
		}

		this.$element.addEventListener(this.$options.on, this.onHandler);
		this.change(this.$options.active);
	}

	on() {
		this.change(true);
	}

	off() {
		this.change(false);
	}

	toggle() {
		this.change(!this.active);
	}

	change(active: boolean) {
		if (active === true) {
			this.$options.target.classList.add(this.$options.class);
		} else {
			this.$options.target.classList.remove(this.$options.class);
		}

		this.active = active;
	}

	destroy() {
		this.$element.removeEventListener(this.$options.on, this.onHandler);

		if (this.offHandler) {
			this.$element.removeEventListener(this.$options.off, this.offHandler);
		}
	}
}

export default Toggle;
