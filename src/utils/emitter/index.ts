class Listener {
	callback: (...args: any) => any
	context: any
	limit: number = Infinity
	calls: number = 0

	constructor (callback: Listener['callback'], context?: any) {
		this.callback = callback
		this.context = context
	}

	invoke (args: any[]) {
		this.callback.apply(this.context, args)
		this.calls++
	}
}

type List<T> = {
	[K in keyof T]: Listener[]
}

interface Events {
	[key: string]: (...args: any[]) => void
}

export class Emitter<T extends Events> {
	private listeners: List<T> = {} as any

	private list (name: keyof T) {
		return this.listeners[name] || (this.listeners[name] = [])
	}

	on<K extends keyof T> (name: K, callback: T[K], context?: any) {
		let listener = new Listener(callback, context)
		this.list(name).push(listener)
		return listener
	}

	few<K extends keyof T> (name: K, callback: T[K], limit: number, context?: any) {
		let listener = this.on(name, callback, context)
		listener.limit = limit
		return listener
	}

	once<K extends keyof T> (name: K, callback: T[K], context?: any) {
		return this.few(name, callback, 1, context)
	}

	promise<K extends keyof T> (name: K) {
		return new Promise<Parameters<T[K]>>(resolve => {
			let handler = function (...args: Parameters<typeof handler>) {
				resolve(args)
			} as T[K]

			this.once(name, handler)
		})
	}

	emit<K extends keyof T> (name: K, ...args: Parameters<T[K]>) {
		let obsolete = []

		this.list(name).forEach(listener => {
			if (listener.calls < listener.limit) {
				listener.invoke(args)
			}

			if (listener.calls >= listener.limit) {
				obsolete.push(listener)
			}
		})

		if (obsolete.length) {
			this.remove(name, obsolete)
		}
	}

	remove (name: keyof T, listeners?: Listener[]) {
		let list = this.list(name)

		if (listeners) {
			list = list.filter(lnr => !listeners.includes(lnr))
		} else {
			list = []
		}

		if (list.length) {
			this.listeners[name] = list
		} else {
			delete this.listeners[name]
		}
	}

	off<K extends keyof T> (name: K, callback?: T[K], context?: any) {
		if (arguments.length > 1) {
			let obsolete = this.list(name).filter(lnr => {
				let matchesCallback = true
				let matchesContext = true

				if (typeof callback === 'function') {
					matchesCallback = lnr.callback === callback
				}

				if (typeof context !== 'undefined') {
					matchesContext = lnr.context === context
				}

				return matchesCallback && matchesContext
			})

			this.remove(name, obsolete)
		} else if (arguments.length === 1) {
			this.remove(name)
		} else {
			this.listeners = {} as any
		}
	}

	purge (context: any) {
		for (let name in this.listeners) {
			this.off(name, null, context)
		}
	}

	destroy () {
		this.listeners = null
	}
}
