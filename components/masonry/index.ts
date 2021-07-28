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

	/**
	 * @todo join same left+right/top+bottom gaps
	 */
	updateGaps(gaps: Gap[], rect: Gap): Gap[] {
		let map = gaps.map((gap) => {
			let newGaps: Gap[] = [];
			let x = rect.right > gap.left && rect.left < gap.right;
			let y = rect.bottom > gap.top && rect.top < gap.bottom;

			if (rect.top - gap.top >= 1 && rect.top < gap.bottom && x) {
				newGaps.push({ ...gap, bottom: rect.top });
			}

			if (gap.bottom - rect.bottom >= 1 && rect.bottom > gap.top && x) {
				newGaps.push({ ...gap, top: rect.bottom });
			}

			if (rect.left - gap.left >= 1 && rect.left < gap.right && y) {
				newGaps.push({ ...gap, right: rect.left });
			}

			if (gap.right - rect.right >= 1 && rect.right > gap.left && y) {
				newGaps.push({ ...gap, left: rect.right });
			}

			if (!x || !y) {
				newGaps.push(gap);
			}

			return newGaps;
		});

		return [].concat(...map);
	}
}

export default Masonry;
