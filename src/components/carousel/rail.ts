import { getTag } from '../../utils/dom'
import { Gesture, Swipe } from '../../utils/gesture'
import { Ticker } from '../../utils'
import { Component } from '../..'
import { Item } from './item'
import { Screen } from './screen'

interface Options {
	clickThreshold: number
	screenChangeSpeed: number
	overdrag: number
	infinite: boolean
	itemsPerScreen?: number
	orderContainer?: HTMLElement
}

export class Rail extends Component<HTMLElement, Options> {
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
	isDrag: boolean
	isDragging: boolean
	isDraggingLink: boolean
	gesture: Gesture
	swipe: Swipe
	ticker: Ticker
	screens: Screen[]
	activeScreen: Screen
	itemsPerScreen: number
	width: number
	offset: number
	offsetRender: number
	offsetLogical: number
	direction: number
	order: Item[]
	orderIndex: number = 1
	orderContainer: HTMLElement

	clickHandler = this.handleClick.bind(this)
	resizeHandler = this.handleResize.bind(this)

	create () {
		this.gesture = new Gesture(this.$element)
		this.ticker = new Ticker()
	}

	init () {
		this.isDraggingLink = null
		this.isDrag = null
		this.offset = 0
		this.offsetRender = 0
		this.offsetLogical = 0

		if (this.$options.infinite) {
			this.order = [...this.$item]

			if (this.$options.orderContainer) {
				this.orderContainer = this.$options.orderContainer
			} else {
				this.orderContainer = this.$element.parentElement
			}

			this.ticker.on('tick', this.updateOrder, this)
		}

		this.calc()
		this.setScreen(this.screens[0])
		this.update()

		this.gesture.on('start', this.pointerDown.bind(this))
		this.gesture.on('end', this.pointerUp.bind(this))

		this.ticker.start()
		this.$element.addEventListener('click', this.clickHandler)
		window.addEventListener('resize', this.resizeHandler)
	}

	destroy () {
		this.gesture.destroy()
		this.ticker.destroy()

		this.$element.removeEventListener('click', this.clickHandler)
		window.removeEventListener('resize', this.resizeHandler)
	}

	handleClick (event: Event) {
		if (this.isDraggingLink && this.isDrag) {
			// The user tried to drag, prevent redirection.
			event.preventDefault()
		}
	}

	handleResize () {
		let idx = this.screens.indexOf(this.activeScreen)

		this.calc()

		if (this.screens[idx]) {
			this.setScreen(this.screens[idx])
		}

		this.update()
	}

	calc () {
		this.calcDimensions()
		this.calcItemsPerScreen()
		this.calcScreens()
	}

	calcDimensions () {
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

	calcItemsPerScreen () {
		if (typeof this.$options.itemsPerScreen === 'number') {
			this.itemsPerScreen = this.$options.itemsPerScreen
		} else {
			this.itemsPerScreen = Math.round(this.$element.offsetWidth / this.$item[0].width)
		}
	}

	calcScreens () {
		let groups: Item[][] = []
		let current: Item[] = null

		this.$item.forEach(el => {
			if (!current || current.length >= this.itemsPerScreen) {
				current = []
				groups.push(current)
			}

			current.push(el)
		})

		this.screens = groups.map(items => new Screen(items, 0.5))
	}

	pointerDown (event) {
		this.swipe = this.gesture.swipes[0]

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

		this.ticker.on('tick', this.updateOffsetRender, this)
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

		this.ticker.off('tick', this.updateOffsetRender, this)
		this.updateOffsetRender()

		this.$element.classList.remove('is-dragged')
	}

	getClosestScreen (offset: number) {
		return this.screens.reduce((prev, curr) => {
			let offsetPrev = this.getSmallestDelta(offset, this.getScreenAnchor(prev))
			let offsetCurr = this.getSmallestDelta(offset, this.getScreenAnchor(curr))
			return Math.abs(offsetCurr) < Math.abs(offsetPrev) ? curr : prev
		})
	}

	getSmallestDelta (offset: number, point: number) {
		let diff = (point - offset) % this.width

		if (this.$options.infinite) {
			let points = [diff, diff + this.width, diff - this.width]

			if (typeof this.direction === 'number') {
				points = points.filter(n => Math.sign(n) === this.direction)
			}

			return points.reduce((prev, curr) => {
				return Math.abs(curr) < Math.abs(prev) ? curr : prev
			})
		} else {
			return diff
		}
	}

	getScreenAnchor (screen: Screen) {
		return screen.anchor(this.$element.offsetWidth)
	}

	nextScreen () {
		this.direction = 1
		this.setScreen(this.getScreenByOffset(1))
		this.direction = null
	}

	prevScreen () {
		this.direction = -1
		this.setScreen(this.getScreenByOffset(-1))
		this.direction = null
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

	setScreen (screen: Screen) {
		if (this.screens.includes(screen)) {
			if (this.$options.infinite) {
				this.offset = this.offsetRender + this.getSmallestDelta(this.offsetRender, this.getScreenAnchor(screen))
			} else {
				this.offset = this.getScreenAnchor(screen)
			}

			this.activeScreen = screen
		}
	}

	update () {
		this.updateOffsetRender()

		if (this.$options.infinite) {
			this.updateOffsetLogical()
		}
	}

	updateOffsetRender () {
		let offset = this.offset

		if (this.swipe) {
			let swipeOffset = this.swipe.offset().x

			offset -= swipeOffset

			if (!this.isDrag && Math.abs(swipeOffset) >= this.$options.clickThreshold) {
				this.isDrag = true
			}
		}

		if (!this.$options.infinite) {
			offset = this.getConstrainedOffset(offset)
		}

		this.offsetRender = offset
		this.render()
	}

	getConstrainedOffset (offset: number) {
		let left = this.getScreenAnchor(this.screens[0])
		let right = this.getScreenAnchor(this.screens[this.screens.length - 1])

		if (offset < left) {
			return left - this.getOverdrag(left - offset)
		} else if (offset > right) {
			return right + this.getOverdrag(offset - right)
		}

		return offset
	}

	getOverdrag (amount: number) {
		let limit = this.$element.offsetWidth * this.$options.overdrag
		return (amount * limit) / (amount + limit)
	}

	render () {
		this.$element.style.transform = `translateX(${-this.offsetRender}px)`
	}

	updateOffsetLogical () {
		let item = this.order[0]
		let itemOffset = item.location.left - item.marginLeft

		this.offsetLogical += this.getSmallestDelta(this.offsetLogical, itemOffset)
		this.renderOffsetLogical()
	}

	renderOffsetLogical () {
		this.$element.style.left = `${this.offsetLogical}px`
	}

	updateOrder () {
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
			this.renderOffsetLogical()
			this.orderIndex++
		}
	}
}

export default Rail
