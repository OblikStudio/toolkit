import { Action, Sensor } from '..'

interface TagOptions {
	class: string
}

export default class Tag extends Action {
	element: HTMLElement
	options: TagOptions

	constructor (sensor: Sensor, options: TagOptions) {
		super()

		this.element = sensor.$element
		this.options = Object.assign({
			class: 'is-active'
		}, options)
	}

	update (value: boolean) {
		if (value) {
			this.element.classList.add(this.options.class)
		} else {
			this.element.classList.remove(this.options.class)
		}
	}
}
