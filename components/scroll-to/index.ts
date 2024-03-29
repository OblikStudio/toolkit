import { findAnchor } from "../../utils/dom";
import { easeOutQuint } from "../../utils/easings";
import { defaults } from "../../utils/functions";
import { scrollTo, Options } from "../../utils/scroll";
import { Component } from "../..";

export class ScrollTo extends Component<Element, Options> {
	static defaults: Options = {
		duration: 1000,
		easing: easeOutQuint,
	};

	static clickHandler(options?: Partial<Options>) {
		return (event: MouseEvent) => {
			if (event.defaultPrevented) {
				// If the default behavior is prevented, e.g. due to a carousel
				// item being dragged, do nothing. Otherwise, when the drag
				// ends, the page will be scrolled, which is unexpected.
				return false;
			}

			let el = findAnchor(event.target as Element);
			let href = el?.getAttribute("href");

			if (!href) {
				return false;
			}

			let url = new URL(href, window.location.href);

			if (
				url.hash &&
				url.origin === window.location.origin &&
				url.pathname === window.location.pathname
			) {
				let target = document.querySelector(url.hash);
				let config = defaults(
					{
						target,
					},
					options,
					this.defaults
				);

				return scrollTo(config);
			} else {
				return false;
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
