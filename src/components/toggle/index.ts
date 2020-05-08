import { debounce } from 'lodash-es'
import { Component } from '../..'

interface Options {
	on: keyof GlobalEventHandlersEventMap
	off: keyof GlobalEventHandlersEventMap
	class: string
	delay: null
	target: Element
}

export class Toggle extends Component<Element, Options> {
	static defaults: Partial<Options> = {
		on: 'click',
		off: null,
		class: 'is-active',
		delay: null
	}
	static presets = {
		mouse: {
			on: 'mouseover',
			off: 'mouseout'
		}
	}

	target: Element
	state = false
	onHandler: () => void
	offHandler: () => void
	offHandlerDebounced: ReturnType<typeof debounce>

	create () {
		this.target = this.$options.target

		if (this.$options.off && this.$options.off !== this.$options.on) {
			this.onHandler = this.on.bind(this)
			this.offHandler = this.off.bind(this)

			if (typeof this.$options.delay === 'number') {
				this.offHandlerDebounced = debounce(this.offHandler, this.$options.delay)
				this.offHandler = this.offHandlerDebounced
			}

			this.$element.addEventListener(this.$options.off, this.offHandler)
		} else {
			this.onHandler = this.toggle.bind(this)
		}

		this.$element.addEventListener(this.$options.on, this.onHandler)
	}

	on () {
		if (this.offHandlerDebounced) {
			this.offHandlerDebounced.cancel()
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
		if (this.state === true) {
			this.target.classList.add(this.$options.class)
		} else {
			this.target.classList.remove(this.$options.class)
		}

		this.$emitter.emit('change', this.state)
	}

	destroy () {
		this.$element.removeEventListener(this.$options.on, this.onHandler)

		if (this.offHandler) {
			this.$element.removeEventListener(this.$options.off, this.offHandler)
		}
	}
}

export default Toggle
