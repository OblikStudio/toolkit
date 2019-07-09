export default class {
	constructor (sensor, options) {
		this.sensor = sensor
		this.options = Object.assign({
			direction: 'up'
		}, options)

		this.lastPosition = null
	}

	check () {
		var previous = this.lastPosition
		this.lastPosition = document.documentElement.scrollTop

		return this.options.direction === 'up'
			? (this.lastPosition < previous)
			: (this.lastPosition > previous)
	}
}
