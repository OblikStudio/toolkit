import { Component } from "../..";
import { Rail } from "./rail";

interface Location {
	left: number;
	right: number;
}

export class Item extends Component<HTMLElement> {
	$parent: Rail;

	location: Location = null;
	marginLeft: number = 0;
	marginRight: number = 0;
	width: number = 0;

	init() {
		/**
		 * Needed because otherwise, Safari doesn't bubble up touch events on iOS
		 * @see https://stackoverflow.com/a/41287408/3130281
		 */
		this.$element.addEventListener("touchstart", () => {});
	}

	update() {
		let style = window.getComputedStyle(this.$element);
		this.marginLeft = parseFloat(style.marginLeft);
		this.marginRight = parseFloat(style.marginRight);
		this.width = parseFloat(style.width);
	}

	space() {
		return this.marginLeft + this.width + this.marginRight;
	}
}
