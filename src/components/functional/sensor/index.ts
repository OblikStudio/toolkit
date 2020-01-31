import { default as query, QueryTarget } from 'querel'
import { Component } from '../../../core'
import { resource } from '../../../utils/config'
import { RectObserver } from '../../../utils/rect-observer'

export abstract class Observer {
	abstract update (elementRect: ClientRect, targetRect: ClientRect): any
	destroy () {}
}

export abstract class Action {
	abstract update (value: any): void
	destroy () {}
}

interface Options {
	observer?: string | object
	action?: string | object
	target?: QueryTarget
	reference?: 'document' | 'viewport'
}

export class Sensor extends Component<HTMLElement, Options> {
	static resources = {
		observers: {},
		actions: {}
	}

	observer: Observer
	action: Action
	target: Window | HTMLElement
	value: any

	private _elementObserver: RectObserver
	private _targetObserver: RectObserver

	init () {
		let resources = this.constructor.resources

		this.observer = resource<Observer>(
			this.$options.observer,
			resources.observers,
			(Resource, options) => new Resource(this, options)
		)

		this.action = resource<Action>(
			this.$options.action,
			resources.actions,
			(Resource, options) => new Resource(this, options)
		)

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

	update () {
		let value = this.observer.update(this._elementObserver.rect, this._targetObserver.rect)

		if (value !== this.value) {
			this.action.update(value)
			this.value = value
		}
	}

	destroy () {
		this.observer.destroy()
		this.action.destroy()
		this._elementObserver.destroy()
		this._targetObserver.destroy()
	}
}

export default Sensor
