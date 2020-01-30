import { resource } from '../../../utils/config'
import { PositionObserver } from '../../../utils/position-observer'
import Component from '../../component'
import * as observers from './observers'
import * as actions from './actions'
import { RectObserver } from '../../../utils/rect-observer'

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

	update (targetRect, windowRect) {
		var result = this.observer.$check(targetRect, windowRect)

		if (result !== this.observerResult) {
			this.action.$update(result, this.observer)
			this.observerResult = result
		}

		if (typeof this.action.$refresh === 'function') {
			this.action.$refresh(targetRect, windowRect)
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
	reference: 'page' | 'element'
}

export class Sensor extends Component<HTMLElement, Options> {
	static resources = {
		observers: {},
		actions: {}
	}

	observer: PositionObserver
	effects: Effect[] = []
	windowRect: object
	targetRect: object
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

		let mode: 'document' | 'viewport' = (this.$options.reference === 'page') ? 'document' : 'viewport'
		let obs = new RectObserver(this.$element, { reference: mode })
		let obs2 = new RectObserver(window, { reference: mode })

		Promise.all([
			obs.promise('init'),
			obs2.promise('init')
		]).then(() => {
			obs.on('change', rect => {
				this.targetRect = rect
				this.update()
			})

			obs2.on('change', rect => {
				this.windowRect = rect
				this.update()
			})

			this.targetRect = obs.rect
			this.windowRect = obs2.rect
			this.update()
		})
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
		this.effects.forEach(effect => {
			effect.update(this.targetRect, this.windowRect)
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
