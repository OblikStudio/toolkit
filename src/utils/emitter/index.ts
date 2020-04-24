type EmitterCallback = (...args: any) => any

class Listener {
	callback: EmitterCallback
	context: any
	limit: number = Infinity
	calls: number = 0

	constructor (callback: EmitterCallback, context?: any) {
		this.callback = callback
		this.context = context
	}

	invoke (args: any[]) {
		this.callback.apply(this.context, args)
		this.calls++
	}
}

interface ListenersIndex {
	[key: string]: Listener[]
}

export class Emitter {
	listeners: ListenersIndex = {}

	list (name: string) {
		return this.listeners[name] || (this.listeners[name] = [])
	}

	on (name: string, callback: EmitterCallback, context?: any) {
		let list = this.list(name)
		let listener = new Listener(callback, context)

		list.push(listener)
		return listener
	}

	few (limit: number, name: string, callback: EmitterCallback, context?: any) {
		let listener = this.on(name, callback, context)
		listener.limit = limit
		return listener
	}

	once (name: string, callback: EmitterCallback, context?: any) {
		return this.few(1, name, callback, context)
	}

	promise (name: string) {
		return new Promise<any>(resolve => {
			this.once(name, resolve)
		})
	}

	emit (name: string, ...args: any[]) {
		let list = this.list(name)
		let obsolete = []

		list.forEach(listener => {
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

	remove (name: string, listeners?: Listener[]) {
		let list = this.list(name)

		if (listeners) {
			list = list.filter(l => listeners.indexOf(l) < 0)
		} else {
			list = []
		}

		if (list.length) {
			this.listeners[name] = list
		} else {
			delete this.listeners[name]
		}
	}

	off (name: string, callback?: EmitterCallback, context?: any) {
		if (arguments.length > 1) {
			let list = this.list(name)
			let obsolete = list.filter(l => {
				let result = false

				if (typeof callback === 'function') {
					result = l.callback === callback
				}

				if (typeof context !== 'undefined') {
					result = l.context === context
				}

				return result
			})

			this.remove(name, obsolete)
		} else if (arguments.length === 1) {
			this.remove(name)
		} else {
			this.listeners = {}
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
