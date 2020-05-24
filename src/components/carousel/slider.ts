import { getTag } from '../../utils/dom'
import { Gesture, Swipe } from '../../utils/gesture'
import { Ticker } from '../../utils'
import { Component } from '../..'

interface Location {
	left: number
	right: number
}

export class Item extends Component<HTMLElement> {
	location: Location = null
	marginLeft: number = 0
	marginRight: number = 0
	width: number = 0

	update () {
		let style = window.getComputedStyle(this.$element)
		this.marginLeft = parseFloat(style.marginLeft)
		this.marginRight = parseFloat(style.marginRight)
		this.width = parseFloat(style.width)
	}

	space () {
		return this.marginLeft + this.width + this.marginRight
	}
}

interface Options {
	clickThreshold: number
	screenChangeSpeed: number
	overdrag: number
	infinite: boolean
	itemsPerScreen?: number
}

class Screen {
	items: Item[]
	offset: number

	constructor (items: Item[]) {
		this.items = items
		this.offset = 0.5
	}

	left () {
		return this.items[0].location.left
	}

	right () {
		return this.items[this.items.length - 1].location.right
	}

	width () {
		return this.right() - this.left()
	}

	anchor (space: number) {
		let remainder = space - this.width()
		return this.left() - remainder * this.offset
	}
}

export class Slider extends Component<HTMLElement, Options> {
	static components = {
		item: Item,
	}

	static defaults: Options = {
		clickThreshold: 40,
		screenChangeSpeed: 500,
		overdrag: 0.3,
		infinite: false
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
	order: Item[]
	orderIndex: number = 1
	orderContainer: HTMLElement
	ticker: Ticker
	itemsPerScreen: number
	offsetLogical: number
	width: number

	init () {
		this.isDraggingLink = null
		this.isDrag = null
		this.offset = 0
		this.offsetRender = 0
		this.offsetLogical = 0

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

		this.ticker = new Ticker()
		this.ticker.start()

		if (this.$options.infinite) {
			this.order = [...this.$item]
			this.orderContainer = this.$element.parentElement
			this.ticker.on('tick', this.reorderElements, this)
		}

		this.updateDimensions()
		this.updateItemsPerScreen()
		this.screens = this.getScreens()
		this.setScreen(this.screens[0])

		this.update()

		if (this.$options.infinite) {
			this.updateOffsetLogical()
		}

		window.addEventListener('resize', () => {
			let idx = this.screens.indexOf(this.activeScreen)

			this.updateDimensions()
			this.updateItemsPerScreen()
			this.screens = this.getScreens()

			if (this.screens[idx]) {
				this.setScreen(this.screens[idx])
			}

			this.update()

			if (this.$options.infinite) {
				this.updateOffsetLogical()
			}
		})
	}

	updateDimensions () {
		let width = 0

		for (let item of this.$item) {
			item.update()
			item.location = {
				left: width + item.marginLeft,
				right: width + item.marginLeft + item.width
			}

			width += item.space()
		}

		this.width = width
	}

	updateItemsPerScreen () {
		if (typeof this.$options.itemsPerScreen === 'number') {
			this.itemsPerScreen = this.$options.itemsPerScreen
		} else {
			this.itemsPerScreen = Math.round(this.$element.offsetWidth / this.$item[0].width)
		}
	}

	getScreens (): Screen[] {
		let groups: Item[][] = []
		let current: Item[] = null

		this.$item.forEach(el => {
			if (!current || current.length >= this.itemsPerScreen) {
				current = []
				groups.push(current)
			}

			current.push(el)
		})

		return groups.map(items => new Screen(items))
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

		this.ticker.on('tick', this.update, this)
	}

	pointerUpdate () {
		if (!this.isDrag && Math.abs(this.swipe.offset().x) >= this.$options.clickThreshold) {
			this.isDrag = true
		}
	}

	getClosestScreen (offset: number) {
		return this.screens.reduce((prev, curr) => {
			let offsetPrev = this.getSmallestDelta(offset, this.getScreenAnchor(prev))
			let offsetCurr = this.getSmallestDelta(offset, this.getScreenAnchor(curr))
			return Math.abs(offsetCurr) < Math.abs(offsetPrev) ? curr : prev
		})
	}

	getScreenAnchor (screen: Screen) {
		return screen.anchor(this.$element.offsetWidth)
	}

	setScreen (screen: Screen, direction?: number) {
		if (this.$options.infinite) {
			this.offset = this.offsetRender + this.getSmallestDelta(this.offsetRender, this.getScreenAnchor(screen), direction)
		} else {
			this.offset = this.getScreenAnchor(screen)
		}

		this.activeScreen = screen
	}

	getScreenByOffset (offset: number) {
		let idx = this.screens.indexOf(this.activeScreen) + offset

		if (this.$options.infinite) {
			if (idx >= this.screens.length) {
				idx = 0
			} else if (idx < 0) {
				idx = this.screens.length - 1
			}
		}

		return this.screens[idx]
	}

	nextScreen () {
		let screen = this.getScreenByOffset(1)

		if (screen) {
			this.setScreen(screen, 1)
		}
	}

	prevScreen () {
		let screen = this.getScreenByOffset(-1)

		if (screen) {
			this.setScreen(screen, -1)
		}
	}

	pointerUp () {
		let diff = this.swipe.origin.to(this.swipe.position)
		let direction = Math.sign(Math.cos(diff.direction))
		let closestScreen = this.getClosestScreen(this.offsetRender)

		this.setScreen(closestScreen)

		if (this.swipe.speed > this.$options.screenChangeSpeed) {
			if (direction === 1) {
				this.prevScreen()
			} else {
				this.nextScreen()
			}
		}

		this.swipe = null

		this.ticker.off('tick', this.update, this)
		this.update()

		this.$element.classList.remove('is-dragged')
	}

	overdrag (amount: number) {
		let limit = this.$element.offsetWidth * this.$options.overdrag
		return (amount * limit) / (amount + limit)
	}

	constrainOffset (offset: number) {
		let left = this.getScreenAnchor(this.screens[0])
		let right = this.getScreenAnchor(this.screens[this.screens.length - 1])

		if (offset < left) {
			return left - this.overdrag(left - offset)
		} else if (offset > right) {
			return right + this.overdrag(offset - right)
		}

		return offset
	}

	reorderElements () {
		let rectContainer = this.orderContainer.getBoundingClientRect()
		let rectFirst = this.order[0].$element.getBoundingClientRect()
		let rectLast = this.order[this.order.length - 1].$element.getBoundingClientRect()
		let target: Item

		if (rectLast.right < rectContainer.right && rectFirst.right <= rectContainer.left) {
			target = this.order.shift()
			target.$element.style.order = this.orderIndex.toString()
			this.offsetLogical += target.space()
			this.order.push(target)
		} else if (rectFirst.left > rectContainer.left && rectLast.left >= rectContainer.right) {
			target = this.order.pop()
			target.$element.style.order = (-this.orderIndex).toString()
			this.offsetLogical -= target.space()
			this.order.unshift(target)
		}

		if (target) {
			this.updateOffsetLogical()
			this.orderIndex++
		}
	}

	updateOffsetLogical () {
		let item = this.order[0]
		let itemOffset = item.location.left - item.marginLeft

		this.offsetLogical += this.getSmallestDelta(this.offsetLogical, itemOffset)
		this.$element.style.left = `${this.offsetLogical}px`
	}

	getSmallestDelta (offset: number, point: number, direction?: number) {
		let diff = (point - offset) % this.width

		if (this.$options.infinite) {
			let points = [diff, diff + this.width, diff - this.width]

			if (typeof direction === 'number') {
				points = points.filter(n => Math.sign(n) === direction)
			}

			return points.reduce((prev, curr) => {
				return Math.abs(curr) < Math.abs(prev) ? curr : prev
			})
		} else {
			return diff
		}
	}

	update () {
		let renderOffset = this.offset

		if (this.swipe) {
			renderOffset -= this.swipe.offset().x
		}

		if (!this.$options.infinite) {
			renderOffset = this.constrainOffset(renderOffset)
		}

		this.render(renderOffset)
	}

	render (offset: number) {
		this.$element.style.transform = `translateX(${-offset}px)`
		this.offsetRender = offset
	}
}

export default Slider
