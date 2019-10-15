import Component from "../../component"

export const observers = {}
export const actions = {}

export interface Observer {
	$check: (data: any) => boolean
	$destroy?: () => void
	$stickyOffset?: object
}

export interface Action {
	$update: (result: boolean, observer: Observer) => void
	$refresh?: (data: any) => void
	$destroy?: () => any
}

export class Effect {
	sensor: Sensor
	observer: Observer
	action: Action
	observerResult: any

	constructor (sensor: Sensor) {
		this.sensor = sensor
	}

	setObserver (observer) {
		this.observer = observer
	}

	setAction (action) {
		this.action = action
	}

	update (data) {
		var result = this.observer.$check(data)

		if (result !== this.observerResult) {
			this.action.$update(result, this.observer)
			this.observerResult = result
		}

		if (typeof this.action.$refresh === 'function') {
			this.action.$refresh(data)
		}
	}

	destroy () {
		if (typeof this.observer.$destroy === 'function') {
			this.observer.$destroy()
		}

		if (typeof this.action.$destroy === 'function') {
			this.action.$destroy()
		}
	}
}

interface Options {
	effects?: object[]
	observer?: string | object
	action?: string | object
}

export class Sensor extends Component<Options> {
	effects: Effect[] = []
	updateHandler: () => void

	$init () {
		if (Array.isArray(this.$options.effects)) {
			this.effects = this.$options.effects.map(data => this.createEffect(data))
		}

		if (this.$options.observer && this.$options.action) {
			this.effects.push(this.createEffect({
				observer: this.$options.observer,
				action: this.$options.action
			}))
		}

		if (!this.effects.length) {
			throw new Error('No effects specified.')
		}

		this.updateHandler = this.update.bind(this)
		window.addEventListener('scroll', this.updateHandler)
		window.addEventListener('resize', this.updateHandler)

		// When some fonts/images are loaded, they may displace the content, so this
		// change must be reflected.
		window.addEventListener('load', this.updateHandler)

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

		var effect = new Effect(this)
		var observerInstance = new observer(effect, observerOptions)
		var actionInstance = new action(effect, actionOptions)

		effect.setObserver(observerInstance)
		effect.setAction(actionInstance)

		return effect
	}

	update () {
		var rect = this.$element.getBoundingClientRect()

		this.effects.forEach(effect => {
			effect.update(rect)
		})
	}

	$destroy () {
		this.effects.forEach(effect => effect.destroy())
		this.effects = null

		window.removeEventListener('scroll', this.updateHandler)
		window.removeEventListener('resize', this.updateHandler)
	}
}

export default Sensor
