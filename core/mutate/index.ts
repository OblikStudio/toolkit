interface Mutation {
	callback: () => void;
	priority: number;
}

let req: number;
let mutations: Mutation[] = [];

function invoke() {
	let copy = [...mutations].sort((a, b) => {
		return b.priority - a.priority;
	});

	mutations = [];
	req = null;

	copy.forEach((m) => m.callback());
}

export function mutate(callback: () => void, priority = 0) {
	mutations.push({ callback, priority });

	if (!req) {
		req = window.requestAnimationFrame(invoke);
	}
}

export function afterMutate(callback: () => void, priority = 0) {
	if (mutations.length) {
		mutate(() => {
			mutate(callback, priority);
		});
	} else {
		callback();
	}
}
