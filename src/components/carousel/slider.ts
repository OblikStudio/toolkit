import { getTag } from '../../utils/dom'
import { Gesture, Swipe } from '../../utils/gesture'
import { Component, ticker } from '../..'

export class Item extends Component<HTMLElement> { }

interface Options {
	clickThreshold: number
	screenChangeSpeed: number
	overdrag: number
	infinite: boolean
}

interface Elem {
	left: number
	right: number
	element: HTMLElement
}

class Screen {
	elements: Elem[]
	offset: number

	constructor () {
		this.elements = []
		this.offset = 0
	}

	left () {
		return this.elements[0].left
	}

	right () {
		return this.elements[this.elements.length - 1].right
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
	order: HTMLElement[]
	orderNum: number = 1
	orderNumBack: number = -1
	offsetLogical: number
	elements: Elem[]

	init () {
		this.isDraggingLink = null
		this.isDrag = null
		this.offset = 0
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

		this.elements = this.$item.map(cmp => {
			return {
				left: cmp.$element.offsetLeft,
				right: cmp.$element.offsetLeft + cmp.$element.offsetWidth,
				element: cmp.$element
			}
		})

		this.order = this.$item.map(el => el.$element)
		this.screens = this.getScreens(this.elements)
		this.setScreen(this.screens[0])
	}

	getScreens (elements: Elem[]) {
		let screens: Screen[] = []
		let current: Screen = null

		elements.forEach(el => {
			if (!current || current.elements.length >= 2) {
				current = new Screen()
				screens.push(current)
			}

			current.elements.push(el)
		})

		return screens
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

	getClosestScreen (offset: number): Screen {
		let width = this.screens[this.screens.length - 1].right()
		let closest = null
		let min = null

		for (let screen of this.screens) {
			let offsetScreen = screen.left()
			let diff = Math.abs(offset - offsetScreen)
			let point = Math.min(diff, Math.abs(diff - width), Math.abs(diff + width))

			console.log(offset, offsetScreen, diff, point);

			if (typeof min !== 'number' || point < min) {
				closest = screen
				min = point
			}
		}

		return closest
	}

	setScreen (screen: Screen) {
		if (this.screens.includes(screen) && this.activeScreen !== screen) {
			this.offset = screen.left()
			return this.activeScreen = screen
		}

		return false
	}

	setScreenByOffset (offset: number) {
		let idx = this.screens.indexOf(this.activeScreen) + offset

		if (idx >= this.screens.length) {
			idx = 0
		} else if (idx < 0) {
			idx = this.screens.length - 1
		}

		return this.setScreen(this.screens[idx])
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
		let closestScreen = this.getClosestScreen(this.offsetRender)

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

	constrainOffset (offset: number) {
		let left = this.screens[0].left()
		let right = this.screens[this.screens.length - 1].left()

		if (offset < left) {
			return left - this.overdrag(left - offset)
		} else if (offset > right) {
			return right + this.overdrag(offset - right)
		}

		return offset
	}

	reorderElements (offset: number) {
		let first = this.order[0]
		let last = this.order[this.order.length - 1]
		let renderOffset = offset - this.offsetLogical

		if (last.offsetLeft + last.offsetWidth < renderOffset + this.$element.offsetWidth) {
			let target = this.order.shift()
			target.style.order = this.orderNum.toString()
			this.order.push(target)
			this.offsetLogical += target.offsetWidth
			this.orderNum++
		} else if (first.offsetLeft > renderOffset) {
			let target = this.order.pop()
			target.style.order = this.orderNumBack.toString()
			this.order.unshift(target)
			this.offsetLogical -= target.offsetWidth
			this.orderNumBack--
		}
	}

	update () {
		let renderOffset = this.offset

		if (this.swipe) {
			renderOffset -= this.swipe.offset().x
		}

		renderOffset = this.constrainOffset(renderOffset)

		// this.reorderElements(renderOffset)
		// renderOffset -= this.offsetLogical

		this.render(renderOffset)
	}

	render (offset: number) {
		this.$element.style.transform = `translateX(${-offset}px)`
		this.offsetRender = offset
	}
}

export default Slider
