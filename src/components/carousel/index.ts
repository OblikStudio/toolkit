import { Component } from '../..'
import { Drag } from '../../utils/drag'
import { getTag } from '../../utils/dom'
import { ticker } from '../..'

export class Item extends Component<HTMLElement> { }

interface Screen {
	left: number
	right: number
}

interface Options {
	clickThreshold: number
}

export class Carousel extends Component<HTMLElement, Options> {
	static components = {
		item: Item,
	}

	static defaults: Options = {
		clickThreshold: 40
	}

	$item: Item[] = []
	origin: number
	dragOrigin: number
	delta: number
	isDraggingLink: boolean
	isDrag: boolean
	isDragging: boolean
	offset: number
	drag: Drag
	activeScreen: Screen
	screens: Screen[]

	init () {
		this.isDraggingLink = null
		this.isDrag = null
		this.origin = 0
		this.offset = 0

		this.drag = new Drag(this.$element)
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
		this.dragOrigin = this.drag.origin().x

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
		this.delta = 0

		ticker.on('tick', this.render, this)
	}

	pointerUpdate (vector) {
		this.delta = this.drag.getOffset().x

		if (!this.isDrag && Math.abs(this.delta) >= this.$options.clickThreshold) {
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

	getClosestScreen (center: number): Screen {
		let closest = null

		this.screens.reduce((prev, curr) => {
			let screenCenter = (curr.left + curr.right) / 2
			let diff = Math.abs(center - screenCenter)

			if (!prev || (typeof prev === 'number' && diff < prev)) {
				closest = curr
				return diff
			} else {
				return prev
			}
		}, null)

		return closest
	}

	setScreen (screen: Screen) {
		if (this.screens.includes(screen) && this.activeScreen !== screen) {
			let center = (screen.left + screen.right) / 2

			this.offset = -center + (this.$element.offsetWidth / 2)
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

	pointerUp (event) {
		// let dir = Math.sign(Math.cos(this.drag.movement.direction))
		let center = -this.offset - this.delta + (this.$element.offsetWidth / 2)
		let closestScreen = this.getClosestScreen(center)

		if (closestScreen !== this.activeScreen) {
			this.setScreen(closestScreen)
		}
		// } else if (this.drag.movement.magnitude > 500) {
		// 	if (dir === 1) {
		// 		this.prevScreen()
		// 	} else {
		// 		this.nextScreen()
		// 	}
		// }

		this.dragOrigin = null
		this.delta = null

		ticker.off('tick', this.render, this)
		this.render()

		this.$element.classList.remove('is-dragged')
	}

	render () {
		let renderOffset = this.offset

		if (this.delta) {
			renderOffset += this.delta
		}

		this.$element.style.transform = `translateX(${renderOffset}px)`
	}
}

export default Carousel
