import { Emitter } from './emitter'
import { Point } from './math'

interface Delta {
	id: number | string
	origin: Point
	position: Point
}

export class Drag extends Emitter {
	element: HTMLElement
	deltas: Delta[]

	mouseStartHandler = this.mouseStart.bind(this)
	mouseMoveHandler = this.mouseMove.bind(this)
	mouseEndHandler = this.mouseEnd.bind(this)
	touchStartHandler = this.touchStart.bind(this)
	touchMoveHandler = this.touchMove.bind(this)
	touchEndHandler = this.touchEnd.bind(this)

	constructor (element) {
		super()

		this.element = element
		this.deltas = []

		this.element.addEventListener('mousedown', this.mouseStartHandler)
		this.element.addEventListener('touchstart', this.touchStartHandler)
		this.element.addEventListener('touchmove', this.touchMoveHandler)
		this.element.addEventListener('touchend', this.touchEndHandler)
		this.element.addEventListener('touchcancel', this.touchEndHandler)
	}

	touchStart (event: TouchEvent) {
		for (let touch of event.changedTouches) {
			let origin = new Point(touch.clientX, touch.clientY)
			let position = new Point(touch.clientX, touch.clientY)

			this.deltas.push({
				id: touch.identifier,
				origin,
				position
			})
		}

		this.emitStart(event)
	}

	touchMove (event: TouchEvent) {
		for (let touch of event.changedTouches) {
			let delta = this.deltas.find(el => el.id === touch.identifier)

			if (delta) {
				delta.position.set(touch.clientX, touch.clientY)
			}
		}

		this.emitMove(event)
	}

	touchEnd (event: TouchEvent) {
		for (let touch of event.changedTouches) {
			this.deltas = this.deltas.filter(delta => delta.id !== touch.identifier)
		}

		this.emitEnd(event)
	}

	mouseStart (event: MouseEvent) {
		let origin = new Point(event.clientX, event.clientY)
		let position = new Point(event.clientX, event.clientY)
		let delta: Delta = {
			id: 'mouse',
			origin,
			position
		}

		this.deltas.push(delta)

		this.element.addEventListener('mousemove', this.mouseMoveHandler)
		this.element.addEventListener('mouseup', this.mouseEndHandler)
		this.element.addEventListener('mouseleave', this.mouseEndHandler)

		this.emitStart(event)
	}

	mouseMove (event: MouseEvent) {
		let delta = this.deltas.find(el => el.id === 'mouse')
		if (delta) {
			delta.position.set(event.clientX, event.clientY)
		}

		this.emitMove(event)
	}

	mouseEnd (event: MouseEvent) {
		this.element.removeEventListener('mousemove', this.mouseMoveHandler)
		this.element.removeEventListener('mouseup', this.mouseEndHandler)
		this.element.removeEventListener('mouseleave', this.mouseEndHandler)

		this.deltas = this.deltas.filter(delta => delta.id !== 'mouse')
		this.emitEnd(event)
	}

	emitStart (event: Event) {
		if (this.deltas.length === 1) {
			this.emit('start', event)
		}

		this.emit('down', event)
	}

	emitMove (event: Event) {
		this.emit('move', event, this.getOffset())
	}

	emitEnd (event: Event) {
		if (this.deltas.length === 0) {
			this.emit('end', event)
		}

		this.emit('up', event)
	}

	origin () {
		if (this.deltas.length) {
			return this.deltas[0].origin
		}
	}

	getOffset () {
		let result = new Point()

		this.deltas.forEach(delta => {
			result.x += delta.position.x - delta.origin.x
			result.y += delta.position.y - delta.origin.y
		})

		return result
	}
}
