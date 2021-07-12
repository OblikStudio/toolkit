import { Ticker } from "../../utils/ticker";

class GlobalTicker extends Ticker {
	checkListeners() {
		if (this.list("tick").length > 0) {
			if (!this.isTicking) this.start();
		} else if (this.isTicking) {
			this.stop();
		}
	}

	on(...args: Parameters<Ticker["on"]>) {
		super.on(...args);
		this.checkListeners();
	}

	off(...args: Parameters<Ticker["off"]>) {
		super.off(...args);
		this.checkListeners();
	}
}

export let ticker = new GlobalTicker();
