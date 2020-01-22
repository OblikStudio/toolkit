import { Observer } from '..'
import { windowClientRect } from '../../../../utils'

interface RelativeOptions {
	offset: number
	after: boolean
	sense: string
	edge: string
}

export default class Relative implements Observer {
	options: RelativeOptions
	$stickyOffset = {
		x: 0,
		y: 0
	}

	constructor (effect, options) {
		this.options = Object.assign({
			offset: 0,
			target: null,
			after: true,
			sense: 'bottom',
			edge: 'bottom'
		}, options)
	}

	$check (boundingRect: ClientRect, windowRect: ClientRect) {
		let sensedEdge = windowRect[this.options.sense]
		let boundingEdge = boundingRect[this.options.edge] + this.options.offset
		let diff = sensedEdge - boundingEdge

		this.$stickyOffset.y = -this.options.offset

		if (this.options.after) {
			return diff > 0
		} else {
			return diff < 0
		}
	}
}
