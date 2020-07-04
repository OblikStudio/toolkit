import { windowClientRect } from '../../utils/dom'
import { clamp } from '../../utils/math'
import { Component } from '../..'

export interface Options {
	var: string
	axis: 'x' | 'y'
	clamp: boolean
	reference?: Window | Element
}

export class Parallax extends Component<HTMLElement, Options> {
	static defaults: Options = {
		var: 'parallax',
		axis: 'y',
		clamp: true,
		reference: window
	}

	reference: Window | Element
	scrollHandler = this.update.bind(this)

	init () {
		this.reference = this.$options.reference
		this.reference.addEventListener('scroll', this.scrollHandler)
		this.update()
	}

	update () {
		let value = this.getValue()

		if (this.$options.clamp) {
			value = clamp(value, 0, 1)
		}

		value = this.transform(value)

		this.apply(value)
	}

	getValue () {
		let rect = this.$element.getBoundingClientRect()
		let refRect = this.getRefRect()
		return this.calculate(rect, refRect, this.$options.axis)
	}

	getRefRect (): ClientRect {
		if (this.reference instanceof Element) {
			return this.reference.getBoundingClientRect()
		} else {
			return windowClientRect()
		}
	}

	calculate (elRect: ClientRect, refRect: ClientRect, axis: Options['axis']) {
		let offset: number
		let edge: number
		let edgeEnd: number

		if (axis === 'x') {
			offset = refRect.width
			edge = elRect.left - refRect.left
			edgeEnd = elRect.width
		} else {
			offset = refRect.height
			edge = elRect.top - refRect.top
			edgeEnd = elRect.height
		}

		let positionCurrent = offset - edge
		let positionEnd = edgeEnd + offset

		return positionCurrent / positionEnd
	}

	transform (value: number) {
		return (0.5 - value) * 2
	}

	apply (value: number) {
		this.$element.style.setProperty(`--${this.$options.var}`, value.toString())
	}

	destroy () {
		this.reference.removeEventListener('scroll', this.scrollHandler)
	}
}

export default Parallax
