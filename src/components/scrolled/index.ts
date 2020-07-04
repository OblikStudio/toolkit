import { Component } from '../..'

export interface Options {
	slack: number
	slackActive: number
	slackScrolled: number
	classActive: string
	classScrolled: string
}

export class Scrolled extends Component<HTMLElement, Options> {
	static defaults: Options = {
		slack: 200,
		slackActive: 20,
		slackScrolled: 10,
		classActive: 'is-scrolled-up',
		classScrolled: 'is-scrolled'
	}

	position: number
	positionAnchor: number
	isDown: boolean
	scrollHandler = this.update.bind(this)

	init () {
		window.addEventListener('scroll', this.scrollHandler)
	}

	update () {
		let lastPosition = this.position
		this.position = document.scrollingElement.scrollTop
		this.updateScrolled(this.position > this.$options.slackScrolled)

		let down = lastPosition < this.position
		if (down !== this.isDown) {
			this.positionAnchor = this.position
			this.isDown = down
		} else if (typeof this.positionAnchor === 'number') {
			let diff = this.position - this.positionAnchor
			if (diff > this.$options.slack) {
				this.positionAnchor = null
				this.updateActive(false)
			} else if (diff < -this.$options.slackActive) {
				this.positionAnchor = null
				this.updateActive(true)
			}
		}
	}

	updateScrolled (value: boolean) {
		if (value) {
			this.$element.classList.add(this.$options.classScrolled)
		} else {
			this.$element.classList.remove(this.$options.classScrolled)
		}
	}

	updateActive (value: boolean) {
		if (value) {
			this.$element.classList.add(this.$options.classActive)
		} else {
			this.$element.classList.remove(this.$options.classActive)
		}
	}

	destroy () {
		window.removeEventListener('scroll', this.scrollHandler)
	}
}

export default Scrolled
