import { findAnchor } from "../../utils/dom";
import { easeOutQuint } from "../../utils/easings";
import { merge } from "../../utils/functions";
import { scrollTo, Options } from "../../utils/scroll";
import { Component } from "../..";

export class ScrollTo extends Component<Element, Options> {
	static defaults: Options = {
		duration: 1000,
		easing: easeOutQuint,
	};

	static clickHandler(options?: Partial<Options>) {
		return (event: MouseEvent) => {
			let el = findAnchor(event.target as Element);
			let href = el?.getAttribute("href");

			if (href) {
				let url = new URL(href, window.location.href);

				if (
					url.hash &&
					url.origin === window.location.origin &&
					url.pathname === window.location.pathname
				) {
					let target = document.querySelector(href);
					let config = merge({}, this.defaults, options, {
						target,
					});

					scrollTo(config);
				}
			}
		};
	}

	clickHandler = this.handleClick.bind(this);

	init() {
		this.$element.addEventListener("click", this.clickHandler);
	}

	handleClick() {
		scrollTo(this.$options);
	}

	destroy() {
		this.$element.removeEventListener("click", this.clickHandler);
	}
}

export type { Options };
export default ScrollTo;
