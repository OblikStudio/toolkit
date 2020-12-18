import { Item } from "./item";

export class Screen {
	items: Item[];
	offset: number;

	constructor(options: { items: Item[]; offset: number }) {
		this.items = options.items;
		this.offset = options.offset;
	}

	left() {
		return this.items[0].location.left;
	}

	right() {
		return this.items[this.items.length - 1].location.right;
	}

	width() {
		return this.right() - this.left();
	}

	anchor(space: number) {
		let remainder = space - this.width();
		return this.left() - remainder * this.offset;
	}

	activate() {}
	deactivate() {}
}
