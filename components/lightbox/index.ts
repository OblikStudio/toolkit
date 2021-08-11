import { Component } from "../../core/component";
import { mutate } from "../../core/mutate";
import { ticker } from "../../core/ticker";
import { Gesture } from "../../utils/gesture";
import { Point, Vector } from "../../utils/math";

interface Options {
	template: HTMLTemplateElement;
}

export class Lightbox extends Component<HTMLImageElement, Options> {
	elBox: HTMLElement;
	elImg: HTMLImageElement;
	elWrap: HTMLElement;
	width: number;
	height: number;
	isExpandable: boolean;
	isExpanded: boolean;
	scaleX: number;
	scaleY: number;
	pos: Point;
	transX: number;
	transY: number;
	acc: Vector;
	rp = new Point();
	isDragging = false;
	lastRp: Point;
	rectImg: DOMRect;
	rectWrap: DOMRect;
	rectBounds: DOMRectReadOnly;

	init() {
		this.width = parseInt(this.$element.getAttribute("width"));
		this.height = parseInt(this.$element.getAttribute("height"));

		this.$element.addEventListener("click", () => {
			this.clone();
			this.open();
			this.checkExpand();
		});
	}

	preload() {
		let loader = new Image();
		loader.src = this.$element.src;

		if (loader.complete) {
			this.elImg.src = loader.src;
		} else {
			this.elImg.src = this.$element.currentSrc;
			loader.addEventListener("load", () => {
				if (this.elImg.naturalWidth) {
					this.elImg.src = loader.src;
				}
			});
		}
	}

	clone() {
		let target = this.$options.template.content.firstElementChild;

		this.elBox = target.cloneNode(true) as HTMLElement;
		this.elWrap = this.elBox.querySelector("[data-box]") as HTMLImageElement;
		this.elImg = this.elBox.querySelector("[data-img]") as HTMLImageElement;
		this.elImg.width = this.width;
		this.elImg.height = this.height;

		this.elBox.addEventListener("click", () => {
			if (!this.isExpanded) {
				this.close();
			}
		});

		this.elImg.addEventListener("click", (e) => {
			if (this.isExpandable && !this.isExpanded) {
				e.stopPropagation();
				this.expand();
			}
		});

		this.preload();

		document.body.appendChild(this.elBox);
	}

	updateBounds() {
		let r1 = this.rectImg;
		let r2 = this.rectWrap;

		let bt = Math.min(r2.top, r2.bottom - r1.height);
		let br = Math.max(r2.right, r2.left + r1.width);
		let bb = Math.max(r2.bottom, r2.top + r1.height);
		let bl = Math.min(r2.left, r2.right - r1.width);

		this.rectBounds = new DOMRectReadOnly(bl, bt, br - bl, bb - bt);
	}

	constrainSlide() {
		let x = this.pos.x;
		let y = this.pos.y;
		let r1 = this.rectImg;
		let r2 = this.rectBounds;
		let dt = r2.top - r1.top;
		let dl = r2.left - r1.left;
		let dr = r1.right - r2.right;
		let db = r1.bottom - r2.bottom;

		if (dt > 0) y += dt;
		if (dl > 0) x += dl;
		if (dr > 0) x -= dr;
		if (db > 0) y -= db;

		let p = new Point(x, y);
		let v = new Vector(this.pos, p);
		v.magnitude *= 0.25;
		this.pos.add(v);
	}

	handleTick = () => {
		this.rectImg = this.elImg.getBoundingClientRect();
		this.rectWrap = this.elWrap.getBoundingClientRect();
		this.updateBounds();

		if (this.isDragging) {
			this.lastRp = this.rp;
		} else {
			this.pos.add(this.acc);
			this.acc.magnitude *= 0.85;
			this.constrainSlide();
			this.render();
		}
	};

	expand() {
		this.scaleX = this.width / this.elImg.offsetWidth;
		this.scaleY = this.height / this.elImg.offsetHeight;
		this.elImg.style.transform = `scale(${this.scaleX}, ${this.scaleY})`;
		this.isExpanded = true;
		this.pos = new Point(this.elImg.offsetLeft, this.elImg.offsetTop);
		this.acc = new Vector(this.pos, this.pos);
		ticker.on("tick", this.handleTick);

		let g = new Gesture(this.elImg);
		g.on("start", (e) => {
			this.elBox.classList.add("is-dragging");
			this.isDragging = true;

			e.preventDefault();
			e.stopPropagation();
		});

		g.on("move", (e) => {
			let p = g.swipes[0].position;
			let o = g.swipes[0].origin;
			this.transX = p.x - o.x;
			this.transY = p.y - o.y;

			this.render();
		});

		g.on("end", (e) => {
			this.acc.set(this.lastRp, this.rp);
			this.pos.x = this.rp.x;
			this.pos.y = this.rp.y;
			this.transX = 0;
			this.transY = 0;

			// this.elBox.classList.remove("is-dragging");

			this.isDragging = false;
		});
	}

	getOverdrag(amount: number) {
		let limit = 150;
		return (amount * limit) / (amount + limit);
	}

	constrainDrag() {
		let x = this.rp.x;
		let y = this.rp.y;
		let r1 = this.rectImg;
		let r2 = this.rectBounds;
		let dt = r2.top - y;
		let dl = r2.left - x;
		let dr = x + r1.width - r2.right;
		let db = y + r1.height - r2.bottom;

		if (dt > 0) y = r2.top - this.getOverdrag(dt);
		if (dl > 0) x = r2.left - this.getOverdrag(dl);
		if (dr > 0) x = r2.right - r1.width + this.getOverdrag(dr);
		if (db > 0) y = r2.bottom - r1.height + this.getOverdrag(db);

		this.rp.x = x;
		this.rp.y = y;
	}

	render() {
		this.rp = new Point(this.pos.x + this.transX, this.pos.y + this.transY);

		if (this.isDragging) {
			this.constrainDrag();
		}

		this.elImg.style.transform = `translate(${
			this.rp.x - this.elImg.offsetLeft
		}px, ${this.rp.y - this.elImg.offsetTop}px) scale(${this.scaleX}, ${
			this.scaleY
		})`;
	}

	checkExpand() {
		let w = this.elImg.offsetWidth;
		let h = this.elImg.offsetHeight;

		this.isExpandable = this.width > w || this.height > h;

		if (this.isExpandable) {
			this.elBox.classList.add("is-expandable");
		} else {
			this.elBox.classList.remove("is-expandable");
		}
	}

	open() {
		let r1 = this.$element.getBoundingClientRect();
		let r2 = this.elImg.getBoundingClientRect();

		let sw = r1.width / r2.width;
		let sh = r1.height / r2.height;
		let sx = r1.left - r2.left;
		let sy = r1.top - r2.top;
		let trans = `translate(${sx}px, ${sy}px) scale(${sw}, ${sh})`;

		mutate(() => {
			this.elBox.style.setProperty("--img-transform", trans);

			mutate(() => {
				this.elBox.classList.add("is-open");
			});
		});
	}

	close() {
		this.elBox.classList.remove("is-open");
		document.body.removeChild(this.elBox);
	}
}
