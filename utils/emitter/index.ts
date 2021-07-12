type Listener = (...args: any) => void;

type List<T> = {
	[K in keyof T]: Listener[];
};

interface Events {
	[key: string]: Listener;
}

export class Emitter<T extends Events> {
	listeners: List<T> = {} as any;

	list(name: keyof T) {
		return this.listeners[name] || (this.listeners[name] = []);
	}

	on<K extends keyof T>(name: K, callback: T[K]) {
		let l = this.list(name);
		if (l.indexOf(callback) < 0) l.push(callback);
	}

	emit<K extends keyof T>(name: K, ...args: Parameters<T[K]>) {
		this.list(name).forEach((listener) => {
			listener(...args);
		});
	}

	off<K extends keyof T>(name: K, callback: T[K]) {
		let l = this.list(name);
		let i = l.indexOf(callback);
		if (i >= 0) l.splice(i, 1);
	}
}
