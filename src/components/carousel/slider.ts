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

export class Slider extends Component<HTMLElement, Options> {
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
	order: HTMLElement[]
	orderNum: number = 1
	offsetLogical: number

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

		this.screens = this.getAllScreens()
		this.order = this.$item.map(el => el.$element)
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

	getScreen (index: number): Screen {
		let itemsPerScreen = 2
		let leftItem = this.$item[index * itemsPerScreen]
		let rightItem = this.$item[index * itemsPerScreen + (itemsPerScreen - 1)]

		if (!leftItem) {
			return null
		}

		if (!rightItem) {
			rightItem = leftItem
		}

		return {
			left: leftItem.$element.offsetLeft,
			right: rightItem.$element.offsetLeft + rightItem.$element.offsetWidth
		}
	}

	getAllScreens (): Screen[] {
		let idx = 0
		let screens: Screen[] = []

		do {
			let screen = this.getScreen(idx)
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
			let offsetScreen = this.getScreenOffset(screen)
			let diff = Math.abs(offset - offsetScreen)

			debugger;

			if (typeof min !== 'number' || diff < min) {
				closest = screen
				min = diff
			}
		}

		return closest
	}

	getScreenOffset (screen: Screen) {
		let width = this.screens[this.screens.length - 1].right
		let loops = Math.floor(this.offsetLogical / width)

		if (this.offsetLogical % width >= screen.right) {
			loops++
		}

		return screen.left + loops * width
	}

	setScreen (screen: Screen) {
		if (this.screens.includes(screen) && this.activeScreen !== screen) {
			this.offset = this.getScreenOffset(screen)
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
		let location = this.offset - this.swipe.offset().x
		let closestScreen = this.getClosestScreen(location)

		console.log('closest', closestScreen);


		if (closestScreen !== this.activeScreen) {
			this.setScreen(closestScreen)
		} else if (this.swipe.speed > this.$options.screenChangeSpeed) {
			if (direction === 1) {
				this.prevScreen()
			} else {
				this.nextScreen()
			}
		}

		this.screens.forEach(scr => console.log(this.getScreenOffset(scr)))

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
		let lastRenderOffset = this.offsetRender
		this.offsetRender = -this.offset

		if (this.swipe) {
			this.offsetRender += this.swipe.offset().x
		}

		// this.constrainRender()

		let last = this.order[this.order.length - 1]
		let right = -lastRenderOffset + this.$element.offsetWidth
		if (last.offsetLeft < right) {
			let first = this.order.shift()
			first.style.order = this.orderNum.toString()
			this.order.push(first)
			this.offsetLogical += first.offsetWidth
			this.orderNum++
		}

		this.offsetRender += this.offsetLogical

		this.render()
	}

	render () {
		this.$element.style.transform = `translateX(${this.offsetRender}px)`
	}
}

export default Slider
