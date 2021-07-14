import { Component } from "../..";

interface ToggleOptions {
	target: Element;
	on?: keyof GlobalEventHandlersEventMap;
	off?: keyof GlobalEventHandlersEventMap;
	class?: string;
}

export class Toggle extends Component<Element, ToggleOptions> {
	static defaults: Partial<ToggleOptions> = {
		on: "click",
		class: "is-active",
	};

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
	}

	on() {
		this.$options.target.classList.add(this.$options.class);
	}

	off() {
		this.$options.target.classList.remove(this.$options.class);
	}

	toggle() {
		this.$options.target.classList.toggle(this.$options.class);
	}

	destroy() {
		this.$element.removeEventListener(this.$options.on, this.onHandler);

		if (this.offHandler) {
			this.$element.removeEventListener(this.$options.off, this.offHandler);
		}
	}
}

export default Toggle;
