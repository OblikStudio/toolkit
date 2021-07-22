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
			this.onHandler = this.activate.bind(this);
			this.offHandler = this.deactivate.bind(this);

			this.$element.addEventListener(this.$options.off, this.offHandler);
		} else {
			this.onHandler = () => this.toggle();
		}

		this.$element.addEventListener(this.$options.on, this.onHandler);
	}

	/**
	 * @param value `true` adds, `false` removes, `undefined` toggles the class
	 * @returns `true` when the class was added, `false` when removed
	 */
	toggle(value?: boolean) {
		return this.$options.target.classList.toggle(this.$options.class, value);
	}

	activate() {
		this.toggle(true);
	}

	deactivate() {
		this.toggle(false);
	}

	get isActive() {
		return this.$options.target.classList.contains(this.$options.class);
	}

	destroy() {
		this.$element.removeEventListener(this.$options.on, this.onHandler);

		if (this.offHandler) {
			this.$element.removeEventListener(this.$options.off, this.offHandler);
		}
	}
}

export default Toggle;
