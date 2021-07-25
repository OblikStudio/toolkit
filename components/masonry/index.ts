import { Component } from "../..";

export class Item extends Component<HTMLElement> {}

interface Gap {
	top: number;
	left: number;
	right: number;
	bottom: number;
}

interface Element {
	width: number;
	height: number;
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
		let gaps: Gap[] = [
			{
				top: 0,
				left: 0,
				right: this.$element.offsetWidth,
				bottom: Infinity,
			},
		];

		this.$item.forEach((e) => {
			let el: Element = {
				width: e.$element.offsetWidth,
				height: e.$element.offsetHeight + 50,
			};

			let gap = this.chooseGap(gaps, el);
			let newGaps = this.splitGap(gap, el);

			gaps.splice(gaps.indexOf(gap), 1);
			gaps.push(...newGaps);

			gaps = this.clearGaps(gaps);

			e.$element.style.transform = `translate(${gap.left}px, ${gap.top}px)`;
		});
	}

	chooseGap(gaps: Gap[], el: Element): Gap {
		return gaps
			.filter((gap) => {
				return gap.right - gap.left >= el.width;
			})
			.reduce((memo, val) => {
				return val.top < memo.top ? val : memo;
			});
	}

	splitGap(gap: Gap, el: Element): Gap[] {
		let gaps: Gap[] = [];

		if (gap.right - gap.left > el.width + 1) {
			gaps.push({
				...gap,
				left: gap.left + el.width,
			});
		}

		gaps.push({
			...gap,
			top: gap.top + el.height,
		});

		return gaps;
	}

	clearGaps(gaps: Gap[]) {
		let filtered: Gap[] = [];

		gaps.forEach((gap) => {
			let remove = false;

			filtered.forEach((gap2) => {
				if (
					gap.top >= gap2.top &&
					gap.left >= gap2.left &&
					gap.right <= gap2.right
				) {
					remove = true;
				}
			});

			if (!remove) {
				filtered.push(gap);
			}
		});

		return filtered;
	}
}

export default Masonry;
