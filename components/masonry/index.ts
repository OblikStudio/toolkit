import { Component } from "../..";

export class Item extends Component<HTMLElement> {}

interface Gap {
	top: number;
	left: number;
	right: number;
	bottom: number;
}

export class Masonry extends Component<HTMLElement> {
	static components = {
		item: Item,
	};

	$item: Item[] = [];

	init() {
		this.$element.style.height = `1000px`;
		this.update();

		window.addEventListener("resize", () => {
			this.update();
		});
	}

	update() {
		let rect = this.$element.getBoundingClientRect();
		let gaps: Gap[] = [
			{
				top: 0,
				left: 0,
				right: rect.width,
				bottom: Infinity,
			},
		];

		this.$item.forEach((e) => {
			let rect = e.$element.getBoundingClientRect();
			let gap = this.chooseGap(gaps, rect);

			e.$element.style.transform = `translate(${gap.left}px, ${gap.top}px)`;

			gaps = this.updateGaps(gaps, {
				...gap,
				right: gap.left + rect.width,
				bottom: gap.top + rect.height,
			});
		});
	}

	chooseGap(gaps: Gap[], el: DOMRect): Gap {
		return gaps
			.filter((gap) => {
				return (
					gap.right - gap.left >= el.width && gap.bottom - gap.top >= el.height
				);
			})
			.reduce((memo, val) => {
				return val.top < memo.top ? val : memo;
			});
	}

	updateGaps(gaps: Gap[], rect: Gap): Gap[] {
		let map = gaps.map((gap) => {
			let newGaps: Gap[] = [];

			if (
				rect.left <= gap.left &&
				rect.top <= gap.top &&
				rect.right >= gap.right &&
				rect.bottom >= gap.bottom
			) {
				return newGaps;
			}

			let top = rect.top >= gap.top && rect.top < gap.bottom;
			let bottom = rect.bottom > gap.top && rect.bottom <= gap.bottom;
			let left = rect.left >= gap.left && rect.left < gap.right;
			let right = rect.right > gap.left && rect.right <= gap.right;
			let hor = left || right;
			let ver = top || bottom;

			if (top && hor) {
				newGaps.push({
					...gap,
					bottom: rect.top,
				});
			}

			if (bottom && hor) {
				newGaps.push({
					...gap,
					top: rect.bottom,
				});
			}

			if (left && ver) {
				newGaps.push({
					...gap,
					right: rect.left,
				});
			}

			if (right && ver) {
				newGaps.push({
					...gap,
					left: rect.right,
				});
			}

			if (!hor || !ver) {
				newGaps.push(gap);
			}

			return newGaps;
		});

		return [].concat(...map);
	}
}

export default Masonry;
