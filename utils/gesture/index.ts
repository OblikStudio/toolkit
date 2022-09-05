import { ticker } from "../../core/ticker";
import { Emitter } from "../emitter";
import { Point, Vector } from "../math";

export type GestureEvent = MouseEvent | TouchEvent;
export type Events = {
	start: (event: GestureEvent) => void;
	down: (event: GestureEvent) => void;
	move: (event: GestureEvent) => void;
	up: (event: GestureEvent) => void;
	end: (event: GestureEvent) => void;
};

export class Swipe {
	id: number | string;
	origin: Point;
	position: Point;
	positionPrev: Point;
	delta: Vector;
	speed: number;

	constructor(id: number | string, origin: Point) {
		this.id = id;
		this.origin = origin;
		this.position = origin.clone();

		this.positionPrev = null;
		this.delta = null;
		this.speed = null;
	}

	offset() {
		return this.position.clone().subPoint(this.origin);
	}
}

export class Gesture extends Emitter<Events> {
	swipes: Swipe[] = [];

	protected mouseStartHandler = this.mouseStart.bind(this);
	protected mouseMoveHandler = this.mouseMove.bind(this);
	protected mouseEndHandler = this.mouseEnd.bind(this);
	protected touchStartHandler = this.touchStart.bind(this);
	protected touchMoveHandler = this.touchMove.bind(this);
	protected touchEndHandler = this.touchEnd.bind(this);
	protected tickHandler = this.handleTick.bind(this);

	constructor(public element: Element) {
		super();

		this.element.addEventListener("mousedown", this.mouseStartHandler);
		this.element.addEventListener("touchstart", this.touchStartHandler);
		this.element.addEventListener("touchmove", this.touchMoveHandler);
		this.element.addEventListener("touchend", this.touchEndHandler);
		this.element.addEventListener("touchcancel", this.touchEndHandler);
	}

	protected getEventPoint(input: MouseEvent | Touch) {
		return new Point(input.clientX, input.clientY);
	}

	protected touchStart(event: TouchEvent) {
		for (let touch of event.changedTouches) {
			let origin = this.getEventPoint(touch);
			let swipe = new Swipe(touch.identifier, origin);
			this.swipes.push(swipe);
		}

		this.emitStart(event);
	}

	protected touchMove(event: TouchEvent) {
		for (let touch of event.changedTouches) {
			let swipe = this.swipes.find((el) => el.id === touch.identifier);

			if (swipe) {
				swipe.position = this.getEventPoint(touch);
			}
		}

		this.emitMove(event);
	}

	protected touchEnd(event: TouchEvent) {
		for (let touch of event.changedTouches) {
			this.swipes = this.swipes.filter((el) => el.id !== touch.identifier);
		}

		this.emitEnd(event);
	}

	protected mouseStart(event: MouseEvent) {
		let origin = this.getEventPoint(event);
		let swipe = new Swipe("mouse", origin);
		this.swipes.push(swipe);

		this.element.addEventListener("mousemove", this.mouseMoveHandler);
		this.element.addEventListener("mouseup", this.mouseEndHandler);
		this.element.addEventListener("mouseleave", this.mouseEndHandler);

		this.emitStart(event);
	}

	protected mouseMove(event: MouseEvent) {
		let swipe = this.swipes.find((el) => el.id === "mouse");

		if (swipe) {
			swipe.position = this.getEventPoint(event);
		}

		this.emitMove(event);
	}

	protected mouseEnd(event: MouseEvent) {
		this.element.removeEventListener("mousemove", this.mouseMoveHandler);
		this.element.removeEventListener("mouseup", this.mouseEndHandler);
		this.element.removeEventListener("mouseleave", this.mouseEndHandler);

		this.swipes = this.swipes.filter((el) => el.id !== "mouse");
		this.emitEnd(event);
	}

	protected emitStart(event: GestureEvent) {
		if (this.swipes.length === 1) {
			this.emit("start", event);
		}

		this.emit("down", event);
		ticker.on("tick", this.tickHandler);
	}

	protected emitMove(event: GestureEvent) {
		this.emit("move", event);
	}

	protected emitEnd(event: GestureEvent) {
		if (this.swipes.length === 0) {
			this.emit("end", event);
		}

		this.emit("up", event);
		ticker.off("tick", this.tickHandler);
	}

	protected handleTick(delta: number) {
		this.swipes.forEach((el) => {
			if (el.positionPrev) {
				el.delta = new Vector(el.positionPrev, el.position);
				el.speed = el.delta.magnitude * (1000 / delta);
			}

			el.positionPrev = el.position;
		});
	}

	destroy() {
		this.element.removeEventListener("mousedown", this.mouseStartHandler);
		this.element.removeEventListener("mousemove", this.mouseMoveHandler);
		this.element.removeEventListener("mouseup", this.mouseEndHandler);
		this.element.removeEventListener("mouseleave", this.mouseEndHandler);
		this.element.removeEventListener("touchstart", this.touchStartHandler);
		this.element.removeEventListener("touchmove", this.touchMoveHandler);
		this.element.removeEventListener("touchend", this.touchEndHandler);
		this.element.removeEventListener("touchcancel", this.touchEndHandler);
		ticker.off("tick", this.tickHandler);
	}
}
