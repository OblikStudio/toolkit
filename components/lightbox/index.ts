import { Component } from "../../core/component";
import { afterMutate, mutate } from "../../core/mutate";
import { ticker } from "../../core/ticker";
import { Gesture, GestureEvent } from "../../utils/gesture";
import { Point, Vector } from "../../utils/math";

interface Options {
	template: HTMLTemplateElement;
}

export class Lightbox extends Component<HTMLImageElement, Options> {
	elBox: HTMLElement;
	elImgWrap: HTMLElement;
	elImg: HTMLImageElement;
	elWrap: HTMLElement;
	width: number;
	height: number;
	isExpandable: boolean;
	isExpanded: boolean;
	isClosing = false;
	scaleX: number;
	scaleY: number;
	isDragging = false;
	wasDragging = false;
	gesture: Gesture;
	ptImg: Point;
	ptDrag: Point;
	ptDragTick: Point;
	ptDragLastTick: Point;
	vcDrag: Vector;
	vcInertia: Vector;
	rectImgWrap: DOMRect;
	rectImg: DOMRect;
	rectWrap: DOMRect;
	rectBounds: DOMRectReadOnly;

	handleTickExpandedFn = this.handleTickExpanded.bind(this);

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
		this.elWrap = this.elBox.querySelector("[data-box]");
		this.elImgWrap = this.elBox.querySelector("[data-img-wrap]");
		this.elImg = this.elBox.querySelector("[data-img]") as HTMLImageElement;
		this.elImg.width = this.width;
		this.elImg.height = this.height;

		this.elBox.addEventListener("click", () => {
			this.close();
		});

		this.elImg.addEventListener("click", (e) => {
			if (this.isClosing) {
				return;
			}

			e.stopPropagation();

			if (this.isExpandable && !this.isExpanded) {
				let r = this.elImg.getBoundingClientRect();
				let rx = (e.clientX - r.x) / r.width;
				let ry = (e.clientY - r.y) / r.height;
				this.expand(rx, ry);
			} else if (this.isExpanded) {
				if (this.wasDragging) {
					this.wasDragging = false;
				} else {
					this.contract();
				}
			}
		});

		this.preload();

		document.body.appendChild(this.elBox);
	}

	getMaxBoundsRect() {
		let w = window.innerWidth / 3;
		let h = window.innerHeight / 3;
		return new DOMRect(w, h, w, h);
	}

	updateBounds() {
		let r1 = this.rectImg;
		let r2 = this.rectImgWrap;
		let r3 = this.getMaxBoundsRect();

		let bt = Math.min(r2.top, r2.bottom - r1.height, r3.bottom - r1.height);
		let br = Math.max(r2.right, r2.left + r1.width, r3.left + r1.width);
		let bb = Math.max(r2.bottom, r2.top + r1.height, r3.top + r1.height);
		let bl = Math.min(r2.left, r2.right - r1.width, r3.right - r1.width);

		this.rectBounds = new DOMRectReadOnly(bl, bt, br - bl, bb - bt);
	}

	constrainSlide() {
		let x = this.ptImg.x;
		let y = this.ptImg.y;
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
		let v = new Vector(this.ptImg, p);
		v.magnitude *= 0.2;
		this.ptImg.add(v);
	}

	handleTickExpanded() {
		this.rectImgWrap = this.elImgWrap.getBoundingClientRect();
		this.rectImg = this.elImg.getBoundingClientRect();
		this.rectWrap = this.elWrap.getBoundingClientRect();
		this.updateBounds();

		if (this.isDragging) {
			this.ptDragLastTick = this.ptDragTick;
			this.ptDragTick = this.ptDrag;
		} else {
			this.ptImg.add(this.vcInertia);
			this.vcInertia.magnitude *= 0.9;

			if (this.vcInertia.magnitude < 0.01) {
				this.vcInertia.magnitude = 0;
			}

			this.constrainSlide();
			this.render(this.ptImg);
		}
	}

	expand(rx: number, ry: number) {
		let pullX = (this.width - this.elImg.offsetWidth) * rx;
		let pullY = (this.height - this.elImg.offsetHeight) * ry;

		this.scaleX = this.width / this.elImg.offsetWidth;
		this.scaleY = this.height / this.elImg.offsetHeight;

		this.ptImg = new Point(
			this.elImg.offsetLeft - pullX,
			this.elImg.offsetTop - pullY
		);
		this.vcInertia = new Vector();

		this.gesture = new Gesture(this.elImg);
		this.gesture.on("start", this.handleDragStart.bind(this));
		this.gesture.on("move", this.handleDragMove.bind(this));
		this.gesture.on("end", this.handleDragEnd.bind(this));
		ticker.on("tick", this.handleTickExpandedFn);

		this.elBox.classList.add("is-expanded");
		this.render(this.ptImg);
		this.isExpanded = true;
	}

	contract() {
		ticker.off("tick", this.handleTickExpandedFn);
		this.gesture.destroy();
		this.gesture = null;

		this.isExpanded = false;

		mutate(() => {
			this.elBox.classList.remove("is-expanded", "is-moved");
			this.elImg.style.transform = "";
		});
	}

	handleDragStart(e: GestureEvent) {
		e.preventDefault();
		e.stopPropagation();

		this.ptDrag = this.ptImg.copy();
		this.elBox.classList.add("is-dragging");
		this.isDragging = true;
	}

	handleDragMove() {
		let p = this.gesture.swipes[0].position;
		let o = this.gesture.swipes[0].origin;
		let v = o.to(p);

		if (!this.wasDragging) {
			this.wasDragging = true;
			this.elBox.classList.add("is-moved");
		}

		this.ptDrag = this.ptImg.copy().add(v);

		this.constrainDrag();
		this.render(this.ptDrag);
	}

	handleDragEnd() {
		this.vcInertia.set(this.ptDragLastTick, this.ptDragTick);
		this.ptImg.x = this.ptDrag.x;
		this.ptImg.y = this.ptDrag.y;

		this.elBox.classList.remove("is-dragging");
		this.isDragging = false;
	}

	getOverdrag(amount: number) {
		let limit = 150;
		return (amount * limit) / (amount + limit);
	}

	constrainDrag() {
		let x = this.ptDrag.x;
		let y = this.ptDrag.y;
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

		this.ptDrag.x = x;
		this.ptDrag.y = y;
	}

	render(pt: Point) {
		let x = pt.x - this.elImg.offsetLeft;
		let y = pt.y - this.elImg.offsetTop;
		this.elImg.style.transform = `translate(${x}px, ${y}px) scale(${this.scaleX}, ${this.scaleY})`;
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

	updateTransform() {
		let r1 = this.$element.getBoundingClientRect();
		let r2 = this.elImgWrap.getBoundingClientRect();

		let sw = r1.width / r2.width;
		let sh = r1.height / r2.height;
		let sx = r1.left - r2.left;
		let sy = r1.top - r2.top;
		let trans = `translate(${sx}px, ${sy}px) scale(${sw}, ${sh})`;

		mutate(() => {
			this.elBox.style.setProperty("--img-transform", trans);
		});
	}

	open() {
		this.isClosing = false;
		this.updateTransform();

		afterMutate(() => {
			this.elBox.classList.add("is-open");
		});

		this.elBox.classList.add("is-moved");
		this.ptImg = new Point(this.elImg.offsetLeft, this.elImg.offsetTop);
		this.scaleX = 1;
		this.scaleY = 1;

		let gz = new Gesture(this.elImg);
		gz.on("down", () => {
			if (gz.swipes.length === 2) {
				console.log("down", gz.swipes);
			}
		});

		gz.on("move", (e) => {
			if (gz.swipes.length !== 2) {
				return;
			}

			e.preventDefault();

			let p1 = gz.swipes[0].origin;
			let p2 = gz.swipes[1].origin;
			let p3 = gz.swipes[0].position;
			let p4 = gz.swipes[1].position;
			let o = new Point((p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
			let p = new Point((p3.x + p4.x) / 2, (p3.y + p4.y) / 2);
			let odist = Math.hypot(Math.abs(p1.x - p2.x), Math.abs(p1.y - p2.y));
			let dist = Math.hypot(Math.abs(p3.x - p4.x), Math.abs(p3.y - p4.y));
			this.scaleX = this.scaleY = dist / odist;

			let v = o.to(p);
			let rx = (o.x - this.elImg.offsetLeft) / this.elImg.offsetWidth;
			let ry = (o.y - this.elImg.offsetTop) / this.elImg.offsetHeight;
			let w = this.elImg.offsetWidth;
			let h = this.elImg.offsetHeight;
			let px = (this.scaleX - 1) * rx * w;
			let py = (this.scaleY - 1) * ry * h;

			this.ptDrag = this.ptImg.copy().add(v);
			this.ptDrag.x -= px;
			this.ptDrag.y -= py;

			console.log(w, this.scaleX, px);

			this.render(this.ptDrag);
		});

		gz.on("up", () => {
			console.log("up");
		});
	}

	close() {
		if (this.isClosing) {
			return;
		}

		if (this.isExpanded) {
			this.contract();
		}

		this.updateTransform();

		let box = this.elBox;
		let remove = (e: TransitionEvent) => {
			if (e.target !== box) return;

			if (box.parentElement) {
				box.parentElement.removeChild(box);
			}

			if (box === this.elBox) {
				this.elBox = null;
				this.elWrap = null;
				this.elImgWrap = null;
				this.elImg = null;
			}
		};

		mutate(() => {
			this.elBox.classList.remove("is-open");
			this.elBox.classList.add("is-closing");
			this.elBox.addEventListener("transitionend", remove);
		});

		this.isClosing = true;
	}
}
