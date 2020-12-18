import { Component } from "../..";

export class Toggle extends Component {
	$parent: Tabs;

	init() {
		this.$element.addEventListener("click", () => {
			this.$parent.toggle(this.$parent.$toggle.indexOf(this));
		});
	}
}

export class Item extends Component {}

export interface Options {
	active?: number;
	class?: string;
}

export class Tabs extends Component<Element, Options> {
	static components = {
		toggle: Toggle,
		item: Item,
	};

	static defaults: Options = {
		active: 1,
		class: "is-active",
	};

	$item: Item[] = [];
	$toggle: Toggle[] = [];
	index: number;

	init() {
		if (typeof this.$options.active === "number") {
			this.toggle(this.$options.active - 1);
		}
	}

	toggle(index: number) {
		this.$toggle[this.index]?.$element.classList.remove(this.$options.class);
		this.$item[this.index]?.$element.classList.remove(this.$options.class);

		this.$toggle[index]?.$element.classList.add(this.$options.class);
		this.$item[index]?.$element.classList.add(this.$options.class);

		this.index = index;
	}
}

export default Tabs;
