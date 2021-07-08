import { Component } from "../..";

function getElementBottom(el: HTMLElement) {
	return (
		el.offsetTop +
		el.offsetHeight +
		parseInt(window.getComputedStyle(el).marginBottom)
	);
}

function elementsIntersect(a: HTMLElement, b: HTMLElement) {
	let halfA = a.offsetWidth / 2;
	let halfB = b.offsetWidth / 2;
	let centerA = a.offsetLeft + halfA;
	let centerB = b.offsetLeft + halfB;
	return Math.abs(centerA - centerB) < halfA + halfB - 1; // -1 for threshold because widths are rounded
}

export class Item extends Component<HTMLElement> {}

export class Masonry extends Component<HTMLElement> {
	static components = {
		item: Item,
	};

	$item: Item[] = [];

	init() {
		this.update();

		window.addEventListener("resize", () => {
			this.update();
		});
	}

	update() {
		this.$item.forEach((item) => {
			// Reset previous marginTop settings because they affect positions.
			item.$element.style.marginTop = "";
		});

		let prevElements: HTMLElement[] = [];

		this.$item.forEach((item) => {
			let el = item.$element;

			let aboveElements = prevElements.filter((prev) => {
				return prev.offsetTop < el.offsetTop && elementsIntersect(el, prev);
			});

			let lowestElement = aboveElements.reduce((memo, node) => {
				if (!memo) {
					return node;
				}

				let bottom = getElementBottom(node);
				let memoBottom = getElementBottom(memo);

				if (bottom > memoBottom) {
					return node;
				} else {
					return memo;
				}
			}, null);

			if (lowestElement) {
				let currentMarginTop = parseInt(window.getComputedStyle(el).marginTop);
				let marginTop =
					getElementBottom(lowestElement) - el.offsetTop + currentMarginTop * 2;

				if (marginTop !== currentMarginTop) {
					el.style.marginTop = `${marginTop}px`;
				}
			}

			prevElements.push(el);
		});
	}
}

export default Masonry;
