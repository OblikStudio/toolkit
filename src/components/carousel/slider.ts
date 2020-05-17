import { getTag } from '../../utils/dom'
import { Gesture, Swipe } from '../../utils/gesture'
import { Component, ticker } from '../..'
import { Ticker } from '../../utils'

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
	elReference: HTMLElement

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

		this.elements = this.$item.map(cmp => {
			return {
				left: cmp.$element.offsetLeft,
				right: cmp.$element.offsetLeft + cmp.$element.offsetWidth,
				element: cmp.$element
			}
		})

		this.screens = this.getScreens(this.elements)
		this.setScreen(this.screens[0])
		this.elReference = this.$element.parentElement

		if (this.$options.infinite) {
			let ticker = new Ticker()
			ticker.on('tick', () => {
				let rect = this.elReference.getBoundingClientRect()
				this.reorderElements(rect)
			})
			ticker.start()
		}
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
		let finalOffset = offset % width

		for (let screen of this.screens) {
			let offsetScreen = screen.left()
			let diff = Math.abs(finalOffset - offsetScreen)
			let point: number

			if (this.$options.infinite) {
				point = Math.min(diff, Math.abs(diff - width), Math.abs(diff + width))
			} else {
				point = diff
			}

			if (typeof min !== 'number' || point < min) {
				closest = screen
				min = point
			}
		}

		return closest
	}

	setScreen (screen: Screen) {
		if (this.screens.includes(screen)) {
			if (this.$options.infinite) {
				let width = this.screens[this.screens.length - 1].right()
				let offset = this.offsetRender % width
				let off1 = (width + screen.left()) - offset
				let off2 = screen.left() - offset
				let off3 = (screen.left() - width) - offset
				let final = [off1, off2, off3].reduce((prev, curr) => {
					if (Math.abs(curr) < Math.abs(prev)) {
						return curr
					} else {
						return prev
					}
				})

				this.offset = this.offsetRender + final
			} else {
				this.offset = screen.left()
			}

			return this.activeScreen = screen
		}

		return false
	}

	setScreenByOffset (offset: number) {
		let idx = this.screens.indexOf(this.activeScreen) + offset

		if (this.$options.infinite) {
			if (idx >= this.screens.length) {
				idx = 0
			} else if (idx < 0) {
				idx = this.screens.length - 1
			}
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

		this.setScreen(closestScreen)

		if (this.swipe.speed > this.$options.screenChangeSpeed) {
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

	reorderElements (rect: DOMRect) {
		let first = this.elements[0]
		let last = this.elements[this.elements.length - 1]

		let rectFirst = first.element.getBoundingClientRect()
		let rectLast = last.element.getBoundingClientRect()

		if (rectLast.right < rect.right) {
			let target = this.elements.shift()
			target.element.style.order = this.orderNum.toString()
			this.elements.push(target)
			this.offsetLogical += target.element.offsetWidth
			this.orderNum++
		} else if (rectFirst.left > rect.left) {
			let target = this.elements.pop()
			target.element.style.order = this.orderNumBack.toString()
			this.elements.unshift(target)
			this.offsetLogical -= target.element.offsetWidth
			this.orderNumBack--
		}

		this.$element.style.left = `${this.offsetLogical}px`
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
