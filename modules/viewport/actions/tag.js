export default class {
	constructor (effect, options) {
		this.element = effect.sensor.element
		this.options = Object.assign({
			class: 'is-active'
		}, options)
	}

	$update (value, observer) {
		if (value) {
			this.element.classList.add(this.options.class)
		} else {
			this.element.classList.remove(this.options.class)
		}
	}
}
