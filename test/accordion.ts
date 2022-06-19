class Accordion {
	id: string;
	items: NodeListOf<HTMLElement>;
	toggles: NodeListOf<HTMLButtonElement>;

	constructor(public root: HTMLElement) {
		this.id = root.id;
		this.items = root.querySelectorAll(".ob-accordion-item");
		this.toggles = root.querySelectorAll(".ob-accordion-toggle");

		this.toggles.forEach((el, index) => {
			el.addEventListener("click", () => this.activate(el));

			let item = this.items[index];
			if (item && this.id) {
				item.id = `${this.id}-${index + 1}`;
				el.setAttribute("aria-controls", `${this.id}-${index + 1}`);
			}
		});

		this.activate(this.toggles[0]);
	}

	activate(toggle: HTMLElement) {
		this.toggles.forEach((el, index) => {
			let isActive = el === toggle;
			let item = this.items[index];

			el.classList.toggle("is-active", isActive);
			el.setAttribute("aria-expanded", isActive ? "true" : "false");
			item.setAttribute("aria-hidden", isActive ? "false" : "true");

			let height = (item.firstElementChild as HTMLElement).offsetHeight;
			item.style.setProperty("--ob-height", `${height}px`);
			item.classList.toggle("is-active", isActive);
		});
	}
}

document
	.querySelectorAll(".ob-accordion")
	.forEach((el: HTMLElement) => new Accordion(el));
