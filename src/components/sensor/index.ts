import { default as query, QueryTarget } from '../../utils/query'
import { Component } from '../..'
import { RectObserver } from '../../utils/rect-observer'

export interface Options {
	target?: Window | QueryTarget
	reference?: 'document' | 'viewport'
	measure: {
		offset: number
		after: boolean
		edge: string
		targetEdge: string
	}
	mutate: {
		class: string
	}
}

export class Sensor extends Component<HTMLElement, Options> {
	static defaults = {
		target: window,
		reference: 'viewport',
		measure: {
			offset: 0,
			after: true,
			edge: 'top',
			targetEdge: 'bottom'
		},
		mutate: {
			class: 'is-active'
		}
	}

	target: Window | HTMLElement
	value: any

	protected _elementObserver: RectObserver
	protected _targetObserver: RectObserver

	init () {
		if (typeof this.$options.target === 'string') {
			this.target = query(this.$element, this.$options.target, HTMLElement)[0]
		} else {
			this.target = this.$options.target as Window | HTMLElement
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

	measure (elementRect: ClientRect, targetRect: ClientRect) {
		let val = elementRect[this.$options.measure.edge]
		let targetVal = targetRect[this.$options.measure.targetEdge] + this.$options.measure.offset
		let diff = targetVal - val

		if (this.$options.measure.after) {
			return diff > 0
		} else {
			return diff < 0
		}
	}

	mutate (input: any) {
		if (input) {
			this.$element.classList.add(this.$options.mutate.class)
		} else {
			this.$element.classList.remove(this.$options.mutate.class)
		}
	}

	update () {
		let value = this.measure(this._elementObserver.rect, this._targetObserver.rect)

		if (value !== this.value) {
			this.mutate(value)
			this.value = value
		}
	}

	destroy () {
		this._elementObserver.destroy()
		this._targetObserver.destroy()
	}
}

export default Sensor
