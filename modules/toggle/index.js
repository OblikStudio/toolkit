import { query } from '../../utils/query'
import { debounce } from 'lodash-es'

export default class {
	constructor (element, options) {
		this.element = element
		this.options = Object.assign({
			on: 'click',
			off: null,
			class: 'is-active',
			delay: null
		}, options)

		if (this.options.target) {
			this.targets = [query(this.options.target, this.element)]
		}

		if (this.options.targets) {
			this.targets = document.querySelectorAll(this.options.targets)
		}

		this.state = false
		
		if (this.options.off && this.options.off !== this.options.on) {
			this.onHandler = this.on.bind(this)
			this.offHandler = this.off.bind(this)

			if (typeof this.options.delay === 'number') {
				this.offHandler = debounce(this.offHandler, this.options.delay)
			}

			this.element.addEventListener(this.options.off, this.offHandler)
		} else {
			this.onHandler = this.toggle.bind(this)
		}

		this.element.addEventListener(this.options.on, this.onHandler)
	}

	on () {
		if (this.offHandler && this.offHandler.cancel) {
			this.offHandler.cancel()
		}

		if (this.state === false) {
			this.state = true
			this.update()
		}
	}

	off () {
		if (this.state === true) {
			this.state = false
			this.update()
		}
	}

	toggle () {
		this.state = !this.state
		this.update()
	}

	update () {
		for (var target of this.targets) {
			if (this.state === true) {
				target.classList.add(this.options.class)
			} else {
				target.classList.remove(this.options.class)
			}
		}
	}

	$destroy () {
		this.element.removeEventListener(this.options.on, this.onHandler)

		if (this.offHandler) {
			this.element.removeEventListener(this.options.off, this.offHandler)
		}
	}
}
