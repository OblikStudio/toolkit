import { Action } from '..'

interface TagOptions {
	class: string
}

export default class Tag implements Action {
	element: HTMLElement
	options: TagOptions

	constructor (effect, options: TagOptions) {
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
