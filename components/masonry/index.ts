import { Component } from "../..";

export class Item extends Component<HTMLElement> {
	bounds: Rect;

	render() {
		this.$element.style.transform = `translate(${this.bounds.left}px, ${this.bounds.top}px)`;
	}
}

interface Rect {
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
	gaps: Rect[];

	init() {
		window.addEventListener("resize", () => {
			this.update();
		});

		this.update();
	}

	update() {
		let rect = this.$element.getBoundingClientRect();
		this.gaps = [
			{
				top: 0,
				left: 0,
				right: rect.width,
				bottom: Infinity,
			},
		];

		this.$item.forEach((e) => {
			let rect = e.$element.getBoundingClientRect();
			let gap = this.chooseGap(this.gaps, rect);

			e.bounds = {
				...gap,
				right: gap.left + rect.width,
				bottom: gap.top + rect.height,
			};

			e.render();

			this.gaps = this.updateGaps(this.gaps, e.bounds);
		});

		this.$element.style.height = `${this.getHeight()}px`;
	}

	getHeight() {
		let lowestItem = this.$item.reduce((memo, val) => {
			return val.bounds.bottom > memo.bounds.bottom ? val : memo;
		});

		return lowestItem.bounds.bottom;
	}

	chooseGap(gaps: Rect[], el: DOMRect): Rect {
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

	updateGaps(gaps: Rect[], rect: Rect): Rect[] {
		let map = gaps.map((gap) => {
			let newGaps: Rect[] = [];
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

		let updatedGaps: Rect[] = [].concat(...map);

		for (let i = 0; i < updatedGaps.length; i++) {
			let e1 = updatedGaps[i];

			for (let i2 = i + 1; i2 < updatedGaps.length; i2++) {
				let e2 = updatedGaps[i2];

				if (
					e1.top === e2.top &&
					e1.bottom === e2.bottom &&
					e1.right >= e2.left &&
					e1.left <= e2.right
				) {
					e1.left = Math.min(e1.left, e2.left);
					e1.right = Math.max(e1.right, e2.right);
					updatedGaps.splice(i2, 1);
					continue;
				}

				if (
					e1.left === e2.left &&
					e1.right === e2.right &&
					e1.bottom >= e2.top &&
					e1.top <= e2.bottom
				) {
					e1.top = Math.min(e1.top, e2.top);
					e1.bottom = Math.max(e1.bottom, e2.bottom);
					updatedGaps.splice(i2, 1);
				}
			}
		}

		return updatedGaps;
	}
}

export default Masonry;
