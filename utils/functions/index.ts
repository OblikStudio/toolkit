export function isObject(input: any): input is object {
	return input && typeof input === "object";
}

export function merge<T>(target: T, ...sources: object[]): T {
	sources.forEach((obj) => {
		if (isObject(obj)) {
			for (let k in obj) {
				if (obj.hasOwnProperty(k)) {
					if (isObject(obj[k]) && isObject(target[k])) {
						merge(target[k], obj[k]);
					} else {
						target[k] = obj[k];
					}
				}
			}
		}
	});

	return target;
}

export function debounce<T extends (...args: any) => any>(
	callback: T,
	time: number
) {
	let timer: number;

	return function (...args: Parameters<T>) {
		clearTimeout(timer);

		timer = window.setTimeout(() => {
			callback.apply(null, args);
		}, time);
	};
}

export function throttle<T extends (...args: any) => any>(
	callback: T,
	time: number
) {
	let stamp = null;

	return function (...args: Parameters<T>) {
		let now = Date.now();

		if (now - stamp >= time) {
			stamp = now;
			callback.apply(null, args);
		}
	};
}
