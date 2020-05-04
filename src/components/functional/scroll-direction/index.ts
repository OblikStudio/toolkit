import { Component } from '../../../core'
import { getViewportScroller } from '../../../utils'

interface Options {
	target: string
	class: string
	direction: 'up' | 'down'
	slack: number
}

export class ScrollDirection extends Component<HTMLElement, Options> {
	static defaults: Partial<Options> = {
		class: 'is-scrolled',
		direction: 'up',
		slack: 200
	}

	target: Element
	scroller: Element
	handler: Element | Window
	anchor: number
	position: number
	scrolled: boolean
	down: boolean

	checkHandler: () => void

	init () {
		this.anchor = null
		this.position = null
		this.target = this.$element
		this.scroller = this.$element
		this.handler = this.$element

		if (this.$options.target) {
			this.target = document.querySelector(this.$options.target)
		}

		if (this.$element === document.body) {
			this.scroller = getViewportScroller()
			this.handler = window
		}

		this.checkHandler = this.check.bind(this)
		this.handler.addEventListener('scroll', this.checkHandler)
	}

	check () {
		let lastPosition = this.position
		this.position = this.scroller.scrollTop

		let scrolled = (this.position > 100)
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
			} else if (diff < -slack / 10) {
				this.anchor = null
				this.updateActive(false)
			}
		}
	}

	updateActive (down: boolean) {
		let expected = this.$options.direction === 'down'
		let className = `${this.$options.class}-${this.$options.direction}`

		if (expected === down) {
			this.target.classList.add(className)
		} else {
			this.target.classList.remove(className)
		}
	}

	updateScrolled (value: boolean) {
		this.scrolled = value

		if (value) {
			this.target.classList.add(this.$options.class)
		} else {
			this.target.classList.remove(this.$options.class)
		}
	}

	destroy () {
		this.handler.removeEventListener('scroll', this.checkHandler)
	}
}

export default ScrollDirection
