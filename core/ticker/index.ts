import { Emitter } from "../../utils/emitter";

type TickerEvents = {
	tick: (delta: number) => void;
};

class Ticker extends Emitter<TickerEvents> {
	private stamp: number;
	private isTicking = false;
	private handler = this.run.bind(this);

	private schedule() {
		window.requestAnimationFrame(this.handler);
	}

	private run() {
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

	private start() {
		this.isTicking = true;
		this.stamp = Date.now();
		this.schedule();
	}

	private stop() {
		this.isTicking = false;
	}

	private checkListeners() {
		if (this.list("tick").length > 0) {
			if (!this.isTicking) this.start();
		} else if (this.isTicking) {
			this.stop();
		}
	}

	on(...args: Parameters<Emitter<TickerEvents>["on"]>) {
		super.on(...args);
		this.checkListeners();
	}

	off(...args: Parameters<Emitter<TickerEvents>["off"]>) {
		super.off(...args);
		this.checkListeners();
	}
}

export let ticker = new Ticker();