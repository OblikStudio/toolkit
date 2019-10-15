import { Observer } from '..'
import { windowClientRect } from '../../../../utils'

interface RelativeOptions {
	offset: number
	target: string
	after: boolean
	sense: string
	edge: string
}

export default class Relative implements Observer {
	options: RelativeOptions
	targetElement: HTMLElement
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
			edge: 'top'
		}, options)

		this.targetElement = null

		if (this.options.target) {
			this.targetElement = document.querySelector(this.options.target)
		}
	}

	$check (boundingRect: ClientRect) {
		if (this.targetElement) {
			boundingRect = this.targetElement.getBoundingClientRect()
		}
		
		let sensorRect = windowClientRect()
		let sensedEdge = sensorRect[this.options.sense]
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
