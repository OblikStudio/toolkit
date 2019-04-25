import sticky from './actions/sticky'
import after from './observers/after'

const observers = {
	after
}

const actions = {
	sticky
}

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

		var boundUpdate = this.update.bind(this)
		window.addEventListener('scroll', boundUpdate)
		window.addEventListener('resize', boundUpdate)

		this.update()
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
			new observer(this, data.observer),
			new action(this, data.action)
		)
	}

	update () {
		var rect = this.element.getBoundingClientRect()

		this.effects.forEach(effect => {
			effect.update(rect)
		})
	}
}

export default function (element, options) {
	return new ScrollSensor(element, options)
}
