export type Easing = (x: number) => number;

export function linear(x: number) {
	return x;
}

export function easeInQuad(x: number) {
	return Math.pow(x, 2);
}

export function easeOutQuad(x: number) {
	return -(Math.pow(x - 1, 2) - 1);
}

export function easeInOutQuad(x: number) {
	if ((x /= 0.5) < 1) {
		return 0.5 * Math.pow(x, 2);
	}

	return -0.5 * ((x -= 2) * x - 2);
}

export function easeInCubic(x: number) {
	return Math.pow(x, 3);
}

export function easeOutCubic(x: number) {
	return Math.pow(x - 1, 3) + 1;
}

export function easeInOutCubic(x: number) {
	if ((x /= 0.5) < 1) {
		return 0.5 * Math.pow(x, 3);
	}

	return 0.5 * (Math.pow(x - 2, 3) + 2);
}

export function easeInQuart(x: number) {
	return Math.pow(x, 4);
}

export function easeOutQuart(x: number) {
	return -(Math.pow(x - 1, 4) - 1);
}

export function easeInOutQuart(x: number) {
	if ((x /= 0.5) < 1) {
		return 0.5 * Math.pow(x, 4);
	}

	return -0.5 * ((x -= 2) * Math.pow(x, 3) - 2);
}

export function easeInQuint(x: number) {
	return Math.pow(x, 5);
}

export function easeOutQuint(x: number) {
	return Math.pow(x - 1, 5) + 1;
}

export function easeInOutQuint(x: number) {
	if ((x /= 0.5) < 1) {
		return 0.5 * Math.pow(x, 5);
	}

	return 0.5 * (Math.pow(x - 2, 5) + 2);
}

export function easeInSine(x: number) {
	return -Math.cos((x * Math.PI) / 2) + 1;
}

export function easeOutSine(x: number) {
	return Math.sin((x * Math.PI) / 2);
}

export function easeInOutSine(x: number) {
	return -0.5 * (Math.cos(Math.PI * x) - 1);
}

export function easeInExpo(x: number) {
	return x === 0 ? 0 : Math.pow(2, 10 * (x - 1));
}

export function easeOutExpo(x: number) {
	return x === 1 ? 1 : -Math.pow(2, -10 * x) + 1;
}

export function easeInOutExpo(x: number) {
	if (x === 0) {
		return 0;
	} else if (x === 1) {
		return 1;
	}

	if ((x /= 0.5) < 1) {
		return 0.5 * Math.pow(2, 10 * (x - 1));
	}

	return 0.5 * (-Math.pow(2, -10 * (x - 1)) + 2);
}

export function easeInCirc(x: number) {
	return -(Math.sqrt(1 - Math.pow(x, 2)) - 1);
}

export function easeOutCirc(x: number) {
	return Math.sqrt(1 - Math.pow(x - 1, 2));
}

export function easeInOutCirc(x: number) {
	if ((x /= 0.5) < 1) {
		return -0.5 * (Math.sqrt(1 - Math.pow(x, 2)) - 1);
	}

	return 0.5 * (Math.sqrt(1 - (x -= 2) * x) + 1);
}

export function easeInBack(x: number) {
	let s = 1.70158;

	return Math.pow(x, 2) * ((s + 1) * x - s);
}

export function easeOutBack(x: number) {
	let s = 1.70158;

	return Math.pow(--x, 2) * ((s + 1) * x + s) + 1;
}

export function easeInOutBack(x: number) {
	let s = 1.70158 * 1.525;

	if ((x /= 0.5) < 1) {
		return 0.5 * Math.pow(x, 2) * ((s + 1) * x - s);
	}

	return 0.5 * ((x -= 2) * x * ((s + 1) * x + s) + 2);
}

export function easeOutElastic(x: number) {
	return -Math.pow(4, -8 * x) * Math.sin((x * 6 - 1) * Math.PI) + 1;
}

export function easeOutBounce(x: number) {
	if (x < 1 / 2.75) {
		return 7.5625 * Math.pow(x, 2);
	} else if (x < 2 / 2.75) {
		return 7.5625 * (x -= 1.5 / 2.75) * x + 0.75;
	} else if (x < 2.5 / 2.75) {
		return 7.5625 * (x -= 2.25 / 2.75) * x + 0.9375;
	} else {
		return 7.5625 * (x -= 2.625 / 2.75) * x + 0.984375;
	}
}
