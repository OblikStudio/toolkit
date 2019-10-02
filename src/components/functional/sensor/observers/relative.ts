import { Observer } from '..'

interface RelativeOptions {
	offset: number
	target: string
	area: string
}

export default class Relative implements Observer {
	options: RelativeOptions
	targetElement: HTMLElement
	areaCompare: string
	areaEdge: string
	$stickyOffset = {
		x: 0,
		y: 0
	}

	constructor (effect, options) {
		this.options = Object.assign({
			offset: 0,
			target: null,
			area: "after top"
		}, options)

		this.targetElement = null

		var area = this.options.area.split(' ')
		this.areaCompare = area[0]
		this.areaEdge = area[1]

		if (this.options.target) {
			this.targetElement = document.querySelector(this.options.target)
		}
	}

	$check (boundingRect) {
		if (this.targetElement) {
			boundingRect = this.targetElement.getBoundingClientRect()
		}

		var edgeValue = boundingRect[this.areaEdge] || 0
		edgeValue += this.options.offset

		this.$stickyOffset.y = -this.options.offset

		if (this.areaCompare === 'after') {
			return edgeValue < 0
		} else {
			return edgeValue > 0
		}
	}
}
