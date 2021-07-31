import { Component } from "../..";
import { mutate } from "../../core/mutate";

export class Item extends Component<HTMLElement> {
	top: number;
	right: number;
	bottom: number;
	left: number;
	width: number;
	height: number;
	renderTop: number;
	renderBottom: number;

	updateOrigin() {
		this.top = this.$element.offsetTop;
		this.left = this.$element.offsetLeft;
		this.width = this.$element.offsetWidth;
		this.height = this.$element.offsetHeight;
		this.right = this.left + this.width;
		this.bottom = this.top + this.height;
	}

	render() {
		this.$element.style.transform = `translateY(${
			this.renderTop - this.top
		}px)`;
	}
}

export class Masonry extends Component<HTMLElement> {
	static components = {
		item: Item,
	};

	$item: Item[] = [];
	height: number;
	visualHeight: number;

	init() {
		window.addEventListener("resize", () => {
			this.update();
		});

		this.update();
	}

	measure() {
		this.height = this.$element.offsetHeight;

		this.$item.forEach((e) => {
			e.updateOrigin();
		});
	}

	calculate() {
		let sorted = [...this.$item].sort((a, b) => {
			let d = a.top - b.top;
			return d !== 0 ? d : a.left - b.left;
		});

		for (let i = 0; i < sorted.length; i++) {
			let e1 = sorted[i];
			let bottom = null;
			let gap = null;

			for (let i2 = i - 1; i2 >= 0; i2--) {
				let e2 = sorted[i2];
				let diff = e1.top - e2.bottom;

				if (e1.left < e2.right && e1.right > e2.left) {
					bottom = Math.max(bottom, e2.renderBottom);
				}

				if (diff >= 0) {
					gap = gap !== null ? Math.min(diff, gap) : diff;
				}
			}

			if (bottom !== null) {
				bottom += gap !== null ? gap : 0;
			} else {
				bottom = Math.min(0, e1.top);
			}

			e1.renderTop = bottom;
			e1.renderBottom = bottom + e1.height;
		}

		this.visualHeight = sorted.reduce((a, b) =>
			a.renderBottom > b.renderBottom ? a : b
		).renderBottom;
	}

	render() {
		this.$item.forEach((e) => e.render());
		this.$element.style.marginBottom = `${this.visualHeight - this.height}px`;
	}

	update() {
		this.measure();
		this.calculate();
		mutate(() => this.render());
	}
}

export default Masonry;
