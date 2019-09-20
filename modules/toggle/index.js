import query from 'querel'
import { debounce } from 'lodash-es'
import Module from '../module'

export default class extends Module {
	constructor () {
		super(...arguments)
		this.$value = Object.assign({
			on: 'click',
			off: null,
			class: 'is-active',
			delay: null
		}, this.$value)

		this.targets = query(this.$element, this.$value.target)

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
		this.targets.each(element => {
			if (this.state === true) {
				element.classList.add(this.$value.class)
			} else {
				element.classList.remove(this.$value.class)
			}
		})

		this.$emitter.emit('change', this.state)
	}

	$destroy () {
		this.$element.removeEventListener(this.$value.on, this.onHandler)

		if (this.offHandler) {
			this.$element.removeEventListener(this.$value.off, this.offHandler)
		}
	}
}
