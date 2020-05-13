import { getTag } from '../../utils/dom'
import { Gesture, Swipe } from '../../utils/gesture'
import { Component, ticker } from '../..'

export class Item extends Component<HTMLElement> { }

interface Screen {
	left: number
	right: number
}

interface Options {
	clickThreshold: number
	screenChangeSpeed: number
	overdrag: number
}

export class Carousel extends Component<HTMLElement, Options> {
	static components = {
		item: Item,
	}

	static defaults: Options = {
		clickThreshold: 40,
		screenChangeSpeed: 500,
		overdrag: 0.3
	}

	$item: Item[] = []
	isDraggingLink: boolean
	isDrag: boolean
	isDragging: boolean
	drag: Gesture
	swipe: Swipe
	activeScreen: Screen
	screens: Screen[]
	offset: number
	offsetRender: number

	init () {
		this.isDraggingLink = null
		this.isDrag = null
		this.offset = 0

		this.drag = new Gesture(this.$element)
		this.drag.on('start', this.pointerDown.bind(this))
		this.drag.on('move', this.pointerUpdate.bind(this))
		this.drag.on('end', this.pointerUp.bind(this))

		this.$element.addEventListener('click', (event) => {
			if (this.isDraggingLink && this.isDrag) {
				// The user tried to drag, prevent redirection.
				event.preventDefault()
			}
		})

		this.screens = this.getAllScreens(1)
	}

	pointerDown (event) {
		this.swipe = this.drag.swipes[0]

		this.isDrag = false
		this.isDragging = false
		this.isDraggingLink = !!getTag(event.target, 'A')
		this.$element.classList.add('is-dragged')

		// Don't prevent default for touchstart because if the slide is a link,
		// you can't follow it. The browser should automatically detect a drag and
		// prevent redirection.
		if (event.type !== 'touchstart') {
			event.preventDefault()
		}

		// Stop propagating so when nesting sliders, parent sliders don't move.
		event.stopPropagation()

		ticker.on('tick', this.update, this)
	}

	pointerUpdate () {
		if (!this.isDrag && Math.abs(this.swipe.offset().x) >= this.$options.clickThreshold) {
			this.isDrag = true
		}
	}

	getScreen (index: number, direction: number): Screen {
		let itemsPerScreen = 2
		let leftItem = this.$item[index * itemsPerScreen]
		let rightItem = this.$item[index * itemsPerScreen + (itemsPerScreen - 1)]

		if (!rightItem) {
			rightItem = leftItem
		}

		if (!leftItem) {
			return null
		}

		return {
			left: leftItem.$element.offsetLeft,
			right: rightItem.$element.offsetLeft + rightItem.$element.offsetWidth
		}
	}

	getAllScreens (direction: number): Screen[] {
		let idx = 0
		let screens: Screen[] = []

		do {
			let screen = this.getScreen(idx, direction)
			if (screen) {
				screens.push(screen)
				idx++
			}
		} while (screen)

		return screens
	}

	getClosestScreen (offset: number): Screen {
		let closest = null
		let min = null

		for (let screen of this.screens) {
			let center = (screen.left + screen.right) / 2
			let diff = Math.abs(offset - center)

			if (typeof min !== 'number' || diff < min) {
				closest = screen
				min = diff
			}
		}

		return closest
	}

	getScreenOffset (screen: Screen) {
		let center = (screen.left + screen.right) / 2
		return -center + (this.$element.offsetWidth / 2)
	}

	setScreen (screen: Screen) {
		if (this.screens.includes(screen) && this.activeScreen !== screen) {
			this.offset = this.getScreenOffset(screen)
			return this.activeScreen = screen
		}

		return false
	}

	setScreenByOffset (offset: number) {
		let idx = this.screens.indexOf(this.activeScreen)
		return this.setScreen(this.screens[idx + offset])
	}

	nextScreen () {
		return this.setScreenByOffset(1)
	}

	prevScreen () {
		return this.setScreenByOffset(-1)
	}

	pointerUp () {
		let diff = this.swipe.origin.to(this.swipe.position)
		let direction = Math.sign(Math.cos(diff.direction))
		let center = -this.offset - this.swipe.offset().x + (this.$element.offsetWidth / 2)
		let closestScreen = this.getClosestScreen(center)

		if (closestScreen !== this.activeScreen) {
			this.setScreen(closestScreen)
		} else if (this.swipe.speed > this.$options.screenChangeSpeed) {
			if (direction === 1) {
				this.prevScreen()
			} else {
				this.nextScreen()
			}
		}

		this.swipe = null

		ticker.off('tick', this.update, this)
		this.update()

		this.$element.classList.remove('is-dragged')
	}

	overdrag (amount: number) {
		let limit = this.$element.offsetWidth * this.$options.overdrag
		return (amount * limit) / (amount + limit)
	}

	constrainRender () {
		let left = this.getScreenOffset(this.screens[0])
		let right = this.getScreenOffset(this.screens[this.screens.length - 1])

		if (this.offsetRender > left) {
			this.offsetRender = left + this.overdrag(this.offsetRender - left)
		} else if (this.offsetRender < right) {
			this.offsetRender = right - this.overdrag(right - this.offsetRender)
		}
	}

	update () {
		this.offsetRender = this.offset

		if (this.swipe) {
			this.offsetRender += this.swipe.offset().x
		}

		this.constrainRender()
		this.render()
	}

	render () {
		this.$element.style.transform = `translateX(${this.offsetRender}px)`
	}
}

export default Carousel
