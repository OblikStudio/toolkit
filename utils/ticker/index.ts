import { Emitter } from "../emitter";

type TickerEvents = {
	tick: (delta: number) => void;
};

export class Ticker extends Emitter<TickerEvents> {
	protected stamp: number;
	protected isTicking = false;
	protected handler = this.run.bind(this);

	protected schedule() {
		window.requestAnimationFrame(this.handler);
	}

	protected run() {
		if (!this.isTicking) {
			return;
		}

		let now = Date.now();
		let delta = now - this.stamp;

		this.emit("tick", delta);

		if (this.isTicking) {
			this.stamp = now;
			this.schedule();
		}
	}

	start() {
		this.isTicking = true;
		this.stamp = Date.now();
		this.schedule();
	}

	stop() {
		this.isTicking = false;
	}
}
