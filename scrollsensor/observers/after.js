export default class {
	constructor (sensor, options) {
		this.sensor = sensor
		this.options = Object.assign({
			offset: 0,
			target: null,
			afterStart: false
		}, options)

		this.targetElement = null
		if (this.options.target) {
			this.targetElement = document.querySelector(this.options.target)
		}
	}

	check (boundingRect) {
		if (this.targetElement) {
			boundingRect = this.targetElement.getBoundingClientRect()
		}

		var compareValue = boundingRect.bottom

		if (this.options.afterStart) {
			compareValue = boundingRect.top
		}

		compareValue += this.options.offset

		return (compareValue < 0)
	}
}
