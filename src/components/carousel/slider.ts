import { getTag } from '../../utils/dom'
import { Gesture, Swipe } from '../../utils/gesture'
import { Component, ticker } from '../..'

export class Item extends Component<HTMLElement> { }

interface Screen {
	id: number
	left: number
	right: number
	elements: Element[]
}

interface Options {
	clickThreshold: number
	screenChangeSpeed: number
	overdrag: number
	infinite: boolean
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
	screensDefinition: Screen[]
	offset: number
	order: HTMLElement[]
	orderNum: number = 1
	orderNumBack: number = -1
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

		this.screensDefinition = this.getAllScreens()
		this.order = this.$item.map(el => el.$element)
		this.screens = this.getScreens()
		this.setScreen(this.screens[5])
	}

	getScreens () {
		let screens: Screen[] = []

		this.screensDefinition.forEach(screen => {
			screens.push({
				...screen
			})
		})

		for (let index = 0; index < 5; index++) {
			let first = screens[0]
			let copy = screens[this.screensDefinition.length - 1]
			let width = copy.right - copy.left

			let newScreen = {
				...copy,
				left: first.left - width,
				right: first.left
			}

			screens.unshift(newScreen)
		}

		for (let index = 0; index < 5; index++) {
			let last = screens[screens.length - 1]
			let copy = screens[screens.length - 1 - (this.screensDefinition.length - 1)]
			let width = copy.right - copy.left

			let newScreen = {
				...copy,
				left: last.right,
				right: last.right + width
			}

			screens.push(newScreen)
		}

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

	getScreen (index: number): Screen {
		let itemsPerScreen = 2
		let elements = []
		let leftItem = this.$item[index * itemsPerScreen]
		let rightItem = this.$item[index * itemsPerScreen + (itemsPerScreen - 1)]

		if (leftItem) {
			elements.push(leftItem)
		}

		if (rightItem) {
			elements.push(rightItem)
		}

		if (!leftItem) {
			return null
		}

		if (!rightItem) {
			rightItem = leftItem
		}

		return {
			id: index,
			left: leftItem.$element.offsetLeft,
			right: rightItem.$element.offsetLeft + rightItem.$element.offsetWidth,
			elements
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

			if (typeof min !== 'number' || diff < min) {
				closest = screen
				min = diff
			}
		}

		return closest
	}

	getScreenOffset (screen: Screen) {
		return screen.left
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
		let left = this.getScreenOffset(this.screens[0])
		let right = this.getScreenOffset(this.screens[this.screens.length - 1])

		if (offset < left) {
			return left - this.overdrag(left - offset)
		} else if (offset > right) {
			return right + this.overdrag(offset - right)
		}

		return offset
	}

	ensureElementsVisible (screen: Screen) {
		let max = this.screensDefinition[this.screensDefinition.length - 1].right
		let left = screen.left % max
		let right = screen.right % max

		console.log(screen, max, left, right);

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

		this.ensureElementsVisible(this.activeScreen)

		this.render(renderOffset)
	}

	render (offset: number) {
		this.$element.style.transform = `translateX(${-offset}px)`
	}
}

export default Slider
