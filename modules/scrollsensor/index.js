const observers = {}
const actions = {}

class ScrollEffect {
	constructor (sensor, observer, action) {
		this.sensor = sensor
		this.observer = observer
		this.observerResult = undefined
		this.action = action
	}

	update (data) {
		var result = this.observer.check(data)
		if (result !== this.observerResult) {
			this.action.update(result)
			this.observerResult = result
		}
	}

	destroy () {
		if (typeof this.observer.destroy === 'function') {
			this.observer.destroy()
		}

		if (typeof this.action.destroy === 'function') {
			this.action.destroy()
		}
	}
}

class ScrollSensor {
	constructor (element, options) {
		this.element = element
		this.effects = []

		if (Array.isArray(options.effects)) {
			this.effects = options.effects.map(data => this.createEffect(data))
		}

		if (options.observer && options.action) {
			this.effects.push(this.createEffect({
				observer: options.observer,
				action: options.action
			}))
		}

		if (!this.effects.length) {
			throw new Error('No effects specified.')
		}

		this.updateHandler = this.update.bind(this)
		window.addEventListener('scroll', this.updateHandler)
		window.addEventListener('resize', this.updateHandler)
		this.updateHandler()
	}

	createEffect (data) {
		if (!data.observer) {
			throw new Error('Observer not specified.')
		}

		if (!data.action) {
			throw new Error('Action not specified.')
		}

		var observerType
		var observerOptions

		if (typeof data.observer === 'object') {
			observerType = data.observer.type
			observerOptions = data.observer
		} else {
			observerType = data.observer
			observerOptions = null
		}

		var actionType
		var actionOptions

		if (typeof data.action === 'object') {
			actionType = data.action.type
			actionOptions = data.action
		} else {
			actionType = data.action
			actionOptions = null
		}

		var observer = observers[observerType]
		var action = actions[actionType]

		if (!observer) {
			throw new Error('Observer not found: ' + observerType)
		}

		if (!action) {
			throw new Error('Action not found: ' + actionType)
		}

		return new ScrollEffect(
			this,
			new observer(this, observerOptions),
			new action(this, actionOptions)
		)
	}

	update () {
		var rect = this.element.getBoundingClientRect()

		this.effects.forEach(effect => {
			effect.update(rect)
		})
	}

	destroy () {
		this.effects.forEach(effect => effect.destroy())
		this.effects = null

		window.removeEventListener('scroll', this.updateHandler)
		window.removeEventListener('resize', this.updateHandler)
	}
}

export function register (data) {
	Object.assign(observers, data.observers)
	Object.assign(actions, data.actions)
}

export default ScrollSensor
