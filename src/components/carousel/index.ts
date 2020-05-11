import { Component } from '../..'
import { Drag } from '../../utils/drag'
import { getTag } from '../../utils/dom'
import { ticker } from '../..'

export class Item extends Component<HTMLElement> { }

export class Carousel extends Component<HTMLElement> {
	static components = {
		item: Item,
	}

	$item: Item[] = []
	currentScreen: number
	origin: number
	dragOrigin: number
	delta: number
	clickThreshold = 40
	isDraggingLink: boolean
	isDrag: boolean
	isDragging: boolean
	offset: number
	drag: Drag

	init () {
		this.clickThreshold = 40
		this.isDraggingLink = null
		this.isDrag = null
		this.currentScreen = null
		this.origin = 0
		this.offset = 0

		this.drag = new Drag(this.$element)
		this.drag.on('start', this.pointerDown.bind(this))
		this.drag.on('change', this.pointerUpdate.bind(this))
		this.drag.on('end', this.pointerUp.bind(this))

		this.$element.addEventListener('click', (event) => {
			if (this.isDraggingLink && this.isDrag) {
				// The user tried to drag, prevent redirection.
				event.preventDefault()
			}
		})
	}

	pointerDown (event) {
		this.dragOrigin = event.pageX

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
		this.delta = this.drag.position.x - this.dragOrigin

		if (!this.isDrag && Math.abs(this.delta) >= this.clickThreshold) {
			this.isDrag = true
		}
	}

	getScreen (index: number, direction: number) {
		let itemsPerScreen = 2
		let leftItem = this.$item[index * itemsPerScreen]
		let rightItem = this.$item[index * itemsPerScreen + (itemsPerScreen - 1)]

		if (!rightItem) {
			rightItem = leftItem
		}

		if (!leftItem) {
			return null
		}

		return [
			leftItem.$element.offsetLeft,
			rightItem.$element.offsetLeft + rightItem.$element.offsetWidth
		]
	}

	getAllScreens (direction: number) {
		let idx = 0
		let screens = []

		do {
			let screen = this.getScreen(idx, direction)
			if (screen) {
				screens.push(screen)
				idx++
			}
		} while (screen)

		return screens
	}

	getClosestScreen (screens: number[][], center: number) {
		let closest = null

		screens.reduce((prev, curr) => {
			let screenCenter = (curr[0] + curr[1]) / 2
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

	pointerUp (event) {
		let dir = Math.sign(Math.cos(this.drag.movement.direction))
		let center = -this.offset - this.delta + (this.$element.offsetWidth / 2)
		let screens = this.getAllScreens(dir)
		let closest = this.getClosestScreen(screens, center)
		let closestCenter = (closest[0] + closest[1]) / 2

		this.currentScreen = screens.indexOf(closest)
		this.offset = -closestCenter + (this.$element.offsetWidth / 2)

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
