import { default as query, QueryTarget } from 'querel'
import { Component } from '../../../core'
import { resource } from '../../../utils/config'
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
	reference?: 'document' | 'viewport'
	target?: QueryTarget
	effects?: object[]
	observer?: string | object
	action?: string | object
}

export class Sensor extends Component<HTMLElement, Options> {
	static resources = {
		observers: {},
		actions: {}
	}

	effects: Effect[]
	target: Window | HTMLElement

	private _elementObserver: RectObserver
	private _targetObserver: RectObserver

	init () {
		this.effects = []

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

		if (this.$options.target) {
			if (this.$options.target === 'window') {
				this.target = window
			} else {
				if (typeof this.$options.target === 'string') {
					this.target = query(this.$element, this.$options.target, HTMLElement)[0]
				} else if (this.$options.target instanceof HTMLElement) {
					this.target = this.$options.target
				}
			}
		} else {
			this.target = window
		}

		let docRelative = (this.$options.reference === 'document')
		this._elementObserver = new RectObserver(this.$element, docRelative)
		this._targetObserver = new RectObserver(this.target, docRelative)

		Promise.all([
			this._elementObserver.promise('init'),
			this._targetObserver.promise('init')
		]).then(() => {
			this._elementObserver.on('change', this.update, this)
			this._targetObserver.on('change', this.update, this)
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
			effect.update(this._elementObserver.rect, this._targetObserver.rect)
		})
	}

	destroy () {
		this.effects.forEach(effect => effect.destroy())
		this.effects = null

		this._elementObserver.destroy()
		this._targetObserver.destroy()
	}
}

export default Sensor
