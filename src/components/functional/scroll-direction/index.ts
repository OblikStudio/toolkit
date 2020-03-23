import { Component } from '../../../core'
import { getViewportScroller } from '../../../utils'

interface Options {
	direction: 'up' | 'down'
}

export class ScrollDirection extends Component<HTMLElement, Options> {
	static defaults = {
		direction: 'up'
	}

	lastPosition: number
	scrolled: boolean
	scroller: Element

	init () {
		this.lastPosition = 0
		this.scroller = getViewportScroller()

		window.addEventListener('scroll', this.update.bind(this))
	}

	update () {
		let value = this.check()

		if (value) {
			this.$element.classList.add('is-active')
		} else {
			this.$element.classList.remove('is-active')
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

	check () {
		let previous = this.lastPosition
		this.lastPosition = this.scroller.scrollTop

		let scrolled = (this.scroller.scrollTop > 10)
		if (scrolled !== this.scrolled) {
			this.updateScrolled(scrolled)
		}

		return this.$options.direction === 'up'
			? (this.lastPosition < previous)
			: (this.lastPosition > previous)
	}
}
