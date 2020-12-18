import { Component } from "../..";

export class Container extends Component {
	promiseAnimation() {
		return new Promise<void>((resolve) => {
			let handler = () => {
				this.$element.removeEventListener("animationend", handler);
				resolve();
			};

			this.$element.addEventListener("animationend", handler);
		});
	}

	animateIn() {
		return Promise.resolve();
	}

	animateOut() {
		return Promise.resolve();
	}
}
