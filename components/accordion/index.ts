import { Component } from "../..";

export class Toggle extends Component {
	$parent: Item;

	init() {
		this.$element.addEventListener("click", () => {
			this.$parent.$parent.toggle(this.$parent);
		});
	}
}

export class Item extends Component {
	$parent: Accordion;

	static components = {
		toggle: Toggle,
	};
}

export interface Options {
	active: number;
	class: string;
}

export class Accordion extends Component<Element, Options> {
	static components = {
		item: Item,
	};

	static defaults = {
		active: null,
		class: "is-active",
	};

	$item: Item[] = [];

	init() {
		if (typeof this.$options.active === "number") {
			this.toggle(this.$item[this.$options.active - 1]);
		}
	}

	toggle(target: Item) {
		this.$item.forEach((item) => {
			if (item === target) {
				item.$element.classList.toggle(this.$options.class);
			} else {
				item.$element.classList.remove(this.$options.class);
			}
		});
	}
}

export default Accordion;
