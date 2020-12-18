import { Component } from "../..";
import { Rail } from "./rail";
import { Screen } from "./screen";

export class Next extends Component {
	$parent: Carousel;
	target: Screen;

	init() {
		this.$element.addEventListener("click", () => {
			this.update();
			this.$parent.$rail.setScreen(this.target);
			this.$parent.$rail.update();
		});

		this.$parent.$rail.$emitter.on("slideChange", () => {
			this.update();
		});

		this.update();
	}

	updateTarget() {
		let rail = this.$parent.$rail;
		let index = rail.screens.indexOf(rail.activeScreen);
		return rail.screens[index + 1];
	}

	update() {
		this.target = this.updateTarget();

		if (this.target) {
			this.$element.classList.remove("is-disabled");
		} else {
			this.$element.classList.add("is-disabled");
		}
	}
}

export class Prev extends Next {
	updateTarget() {
		let rail = this.$parent.$rail;
		let index = rail.screens.indexOf(rail.activeScreen);
		return rail.screens[index - 1];
	}
}

export class Carousel extends Component<Element> {
	static components = {
		rail: Rail,
		next: Next,
		prev: Prev,
	};

	$rail: Rail;
}

export { Rail };
export { Item } from "./item";
export default Carousel;
