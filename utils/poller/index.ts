import { ticker } from "../..";
import { Emitter } from "../emitter";

type Change<T> = {
	newValue: T;
	oldValue?: T;
	initial?: boolean;
};

type Events<T extends { [K in P[number]]: any }, P extends string[]> = {
	init: (state: { [K in P[number]]: T[K] }) => void;
	change: (
		changes: Partial<{ [K in P[number]]: Change<T[K]> }>,
		initial: boolean
	) => void;
};

export class Poller<T, P extends (keyof T & string)[]> extends Emitter<
	Events<T, P>
> {
	private memo: { [K in P[number]]: any } = {} as any;
	private polls: number = 0;

	target: T;
	props: P;

	constructor(target: T, ...props: P) {
		super();

		this.target = target;
		this.props = props;

		ticker.on("measure", this.update, this);
	}

	update() {
		let changes: Partial<{ [K in P[number]]: Change<T[K]> }> = {};
		let isChanged = false;
		let isInitial = this.polls === 0;

		for (let prop of this.props) {
			if (prop in this.target) {
				let memo = this.memo[prop];
				let value = this.target[prop];
				let change: Change<T[typeof prop]>;

				if (prop in this.memo) {
					if (value !== memo) {
						change = {
							newValue: value,
							oldValue: memo,
						};
					}
				} else {
					change = {
						newValue: value,
						initial: true,
					};
				}

				if (change) {
					this.memo[prop] = change.newValue;
					changes[prop] = change;
					isChanged = true;
				}
			}
		}

		if (isInitial) {
			this.emit("init", this.memo);
		}

		if (isChanged) {
			this.emit("change", changes, isInitial);
		}

		this.polls++;
	}

	get(prop: P[number]) {
		return this.memo[prop];
	}

	destroy() {
		ticker.purge(this);
		super.destroy();
	}
}
