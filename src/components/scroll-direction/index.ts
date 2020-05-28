import { Component } from '../..'

interface Options {
	direction: 'up' | 'down',
	slack: number
}

export class ScrollDirection extends Component<HTMLElement, Options> {
	static defaults: Options = {
		direction: 'up',
		slack: 200
	}

	scroller: Element
	anchor: number
	position: number
	scrolled: boolean
	down: boolean

	checkHandler: () => void

	init () {
		this.anchor = null
		this.position = null
		this.scroller = document.scrollingElement

		this.checkHandler = this.check.bind(this)
		window.addEventListener('scroll', this.checkHandler)
	}

	check () {
		let lastPosition = this.position
		this.position = this.scroller.scrollTop

		let scrolled = (this.position > 10)
		if (scrolled !== this.scrolled) {
			this.updateScrolled(scrolled)
		}

		let down = lastPosition < this.position
		if (down !== this.down) {
			this.anchor = this.position
			this.down = down
		} else if (typeof this.anchor === 'number') {
			let diff = this.position - this.anchor
			let slack = this.$options.slack

			if (diff > slack) {
				this.anchor = null
				this.updateActive(true)
			} else if (diff < -slack) {
				this.anchor = null
				this.updateActive(false)
			}
		}
	}

	updateActive (down: boolean) {
		let expected = this.$options.direction === 'down'

		if (expected === down) {
			this.$element.classList.add(`is-scrolled-${this.$options.direction}`)
		} else {
			this.$element.classList.remove(`is-scrolled-${this.$options.direction}`)
		}
	}

	updateScrolled (value: boolean) {
		this.scrolled = value

		if (value) {
			this.$element.classList.add('is-scrolled')
		} else {
			this.$element.classList.remove('is-scrolled')
		}
	}

	destroy () {
		window.removeEventListener('scroll', this.checkHandler)
	}
}

export default ScrollDirection
