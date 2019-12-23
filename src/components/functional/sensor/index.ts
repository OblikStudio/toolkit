import Component from "../../component"
import { resource } from '../../../utils/config'
import * as observers from './observers'
import * as actions from './actions'

export abstract class Observer {
	$check: (data: any) => boolean
	$destroy?: () => void
	$stickyOffset?: object
}

export abstract class Action {
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

export class Sensor extends Component<HTMLElement, Options> {
	static resources = {
		observers: {},
		actions: {}
	}

	effects: Effect[] = []
	updateHandler: () => void

	init () {
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
		let resources = this.constructor.resources

		let effect = new Effect(this)
		let observer = resource<Observer>(data.observer, resources.observers, (Resource, options) => new Resource(effect, options))
		let action = resource<Action>(data.action, resources.actions, (Resource, options) => new Resource(effect, options))

		effect.setObserver(observer)
		effect.setAction(action)

		return effect
	}

	update () {
		var rect = this.$element.getBoundingClientRect()

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

export const resources = {
	observers,
	actions
}

export default Sensor
