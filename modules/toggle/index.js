import { debounce } from 'lodash-es'
import Module from '../module'
import { query } from '../../utils/query'

export default class extends Module {
	constructor () {
		super(...arguments)
		this.$value = Object.assign({
			on: 'click',
			off: null,
			class: 'is-active',
			delay: null
		}, this.$value)

		if (this.$value.target) {
			this.targets = [query(this.$value.target, this.$element)]
		}

		if (this.$value.targets) {
			this.targets = document.querySelectorAll(this.$value.targets)
		}

		this.state = false

		if (this.$value.off && this.$value.off !== this.$value.on) {
			this.onHandler = this.on.bind(this)
			this.offHandler = this.off.bind(this)

			if (typeof this.$value.delay === 'number') {
				this.offHandler = debounce(this.offHandler, this.$value.delay)
			}

			this.$element.addEventListener(this.$value.off, this.offHandler)
		} else {
			this.onHandler = this.toggle.bind(this)
		}

		this.$element.addEventListener(this.$value.on, this.onHandler)
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
				target.classList.add(this.$value.class)
			} else {
				target.classList.remove(this.$value.class)
			}
		}

		this.$emitter.emit('change', this.state)
	}

	$destroy () {
		this.$element.removeEventListener(this.$value.on, this.onHandler)

		if (this.offHandler) {
			this.$element.removeEventListener(this.$value.off, this.offHandler)
		}
	}
}
