export default class {
	constructor (sensor, options) {
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

	check (boundingRect) {
		if (this.targetElement) {
			boundingRect = this.targetElement.getBoundingClientRect()
		}

		var edgeValue = boundingRect[this.areaEdge] || 0
		edgeValue += this.options.offset

		if (this.areaEdge === 'top') {
			this.$fixedOffset = -this.options.offset
		} else {
			this.$fixedOffset = -(boundingRect.height + this.options.offset)
		}

		if (this.areaCompare === 'after') {
			return edgeValue < 0
		} else {
			return edgeValue > 0
		}
	}
}
