import { windowClientRect } from '../../utils/dom'
import { Component } from '../..'

export interface Options {
	target?: Window | HTMLElement
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

	protected updateHandler = this.update.bind(this)

	init () {
		this.target = this.$options.target
		this.update()

		window.addEventListener('scroll', this.updateHandler)
		window.addEventListener('resize', this.updateHandler)
	}

	destroy () {
		window.removeEventListener('scroll', this.updateHandler)
		window.removeEventListener('resize', this.updateHandler)
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
		let elRect = this.$element.getBoundingClientRect()
		let targetRect = null

		if (this.target === window) {
			targetRect = windowClientRect()
		} else {
			targetRect = (this.target as HTMLElement).getBoundingClientRect()
		}

		let value = this.measure(elRect, targetRect)

		if (value !== this.value) {
			this.mutate(value)
			this.value = value
		}
	}
}

export default Sensor
