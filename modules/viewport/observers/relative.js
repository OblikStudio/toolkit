export default class {
	constructor (effect, options) {
		this.options = Object.assign({
			offset: 0,
			target: null,
			area: "after top"
		}, options)

		this.targetElement = null
		this.$stickyOffset = {
			x: 0,
			y: 0
		}

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

		if (this.areaEdge === 'top') {
			this.$stickyOffset.y = -this.options.offset
		} else {
			this.$stickyOffset.y = -(boundingRect.height + this.options.offset)
		}

		if (this.areaCompare === 'after') {
			return edgeValue < 0
		} else {
			return edgeValue > 0
		}
	}
}
