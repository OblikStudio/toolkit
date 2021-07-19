import { Emitter } from "../../utils/emitter";

type TickerEvents = {
	tick: (delta: number) => void;
};

class Ticker extends Emitter<TickerEvents> {
	private stamp: number;
	private isActive = false;
	private handler = this.run.bind(this);

	private schedule() {
		window.requestAnimationFrame(this.handler);
	}

	private run() {
		if (!this.isActive) {
			return;
		}

		let now = Date.now();
		let delta = now - this.stamp;

		this.emit("tick", delta);

		if (this.isActive) {
			this.stamp = now;
			this.schedule();
		}
	}

	private start() {
		this.isActive = true;
		this.stamp = Date.now();
		this.schedule();
	}

	private stop() {
		this.isActive = false;
	}

	private checkListeners() {
		if (this.list("tick").length > 0) {
			if (!this.isActive) this.start();
		} else if (this.isActive) {
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
