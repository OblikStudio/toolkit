import { query } from '../../utils'
import { debounce } from 'lodash-es'
import Module from '../module'

export default class extends Module {
	constructor () {
		super(...arguments)
		this.$options = Object.assign({
			on: 'click',
			off: null,
			class: 'is-active',
			delay: null
		}, this.$options)

		this.targets = query(this.$element, this.$options.target)

		this.state = false

		if (this.$options.off && this.$options.off !== this.$options.on) {
			this.onHandler = this.on.bind(this)
			this.offHandler = this.off.bind(this)

			if (typeof this.$options.delay === 'number') {
				this.offHandler = debounce(this.offHandler, this.$options.delay)
			}

			this.$element.addEventListener(this.$options.off, this.offHandler)
		} else {
			this.onHandler = this.toggle.bind(this)
		}

		this.$element.addEventListener(this.$options.on, this.onHandler)
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
		this.targets.each(element => {
			if (this.state === true) {
				element.classList.add(this.$options.class)
			} else {
				element.classList.remove(this.$options.class)
			}
		})

		this.$emitter.emit('change', this.state)
	}

	$destroy () {
		this.$element.removeEventListener(this.$options.on, this.onHandler)

		if (this.offHandler) {
			this.$element.removeEventListener(this.$options.off, this.offHandler)
		}
	}
}
