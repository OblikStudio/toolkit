import Component from '../../component'
import { resource } from '../../../utils/config'
import * as observers from './observers'
import * as actions from './actions'
import { PositionObserver } from '../../../utils/position-observer'
import { measure } from '../../../core'
import { Emitter } from '../../../utils/emitter'

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

function rect (x: number, y: number, width: number, height: number): ClientRect {
	return {
		width,
		height,
		top: y,
		right: x + width,
		bottom: y + height,
		left: x
	}
}

class ViewportObserver extends Emitter {
	top: number
	left: number
	width: number
	height: number
	pageRect: ClientRect
	clientRect: ClientRect

	constructor () {
		super()

		window.addEventListener('scroll', () => {
			measure(() => {
				this.top = document.scrollingElement.scrollTop
				this.left = document.scrollingElement.scrollLeft
				this.updatePageRect()
			})
		})

		window.addEventListener('resize', () => {
			measure(() => {
				this.width = window.innerWidth
				this.height = window.innerHeight
				this.updateClientRect()
				this.updatePageRect()
			})
		})

		measure(() => {
			this.top = document.scrollingElement.scrollTop
			this.left = document.scrollingElement.scrollLeft
			this.width = window.innerWidth
			this.height = window.innerHeight
			this.pageRect = rect(this.left, this.top, this.width, this.height)
			this.clientRect = rect(0, 0, this.width, this.height)
			this.emit('init')
		})
	}

	updatePageRect () {
		this.pageRect = rect(this.left, this.top, this.width, this.height)
		this.emit('pageRectChange', this.pageRect)
	}

	updateClientRect () {
		this.clientRect = rect(0, 0, this.width, this.height)
		this.emit('clientRectChange', this.clientRect)
	}
}

let viewport = new ViewportObserver()

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

		if (this.$options.reference === 'page') {
			this.observer = new PositionObserver(this.$element)

			Promise.all([
				this.observer.promise('init').then(rect => {
					this.targetRect = rect
				}),
				viewport.promise('init').then(() => {
					this.windowRect = viewport.pageRect
				})
			]).then(() => {
				this.update()

				this.observer.on('change', rect => {
					this.targetRect = rect
					this.update()
				})

				viewport.on('pageRectChange', rect => {
					this.windowRect = rect
					this.update()
				})
			})
		} else {
			viewport.once('init', () => {
				this.windowRect = viewport.clientRect
				this.targetRect = this.$element.getBoundingClientRect()
				this.update()

				viewport.on('clientRectChange', rect => {
					this.windowRect = rect
					this.update()
				})
	
				window.addEventListener('scroll', () => {
					this.targetRect = this.$element.getBoundingClientRect()
					this.update()
				})
			})
		}
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
