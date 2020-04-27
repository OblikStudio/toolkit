import { Component } from '../..'
import { Point, Vector } from '../../utils/math'
import { Emitter } from '../../utils/emitter'

class Scroll extends Emitter {
	speed = 0
	posLast = 0
	posCurrent = 0
	timer: number

	constructor () {
		super()

		document.addEventListener('scroll', () => {
			this.posLast = this.posCurrent
			this.posCurrent = window.scrollY || window.pageYOffset
			this.setSpeed(this.posCurrent - this.posLast)

			window.cancelAnimationFrame(this.timer)
			this.timer = window.requestAnimationFrame(() => {
				this.timer = window.requestAnimationFrame(() => {
					this.setSpeed(0)
				})
			})
		})
	}

	setSpeed (value) {
		this.speed = value
		this.emit('change', this)
	}
}

let scroller = new Scroll()

function getPageRect (element) {
	let rect = element.getBoundingClientRect()
	let data = rect

	if (typeof rect.toJSON === 'function') {
		data = rect.toJSON()
	}

	data.top += window.pageYOffset
	data.left += window.pageXOffset

	return data
}

export class Magnetic extends Component<HTMLElement> {
	attached = false
	posRef = new Point()
	posRender = new Point()
	posTarget = new Point()
	vecRefMouse = new Vector()
	delta = new Vector()

	init () {
		document.addEventListener('mousemove', event => {
			let mousePos = new Point(event.pageX, event.pageY)
			this.vecRefMouse.set(this.posRef, mousePos)
		})

		this.updatePosRef()

		this.posTarget.set(this.posRef)
		this.posRender.set(this.posTarget)
		this.render()
	}

	updatePosRef () {
		let rect = getPageRect(this.$element)
		let x = rect.left + (rect.width / 2)
		let y = rect.top + (rect.height / 2)
		this.posRef.set(x, y)
	}

	update () {
		let movement = new Vector()
		movement.set(this.posRender, this.posTarget)
		movement.magnitude *= 0.2

		this.delta.add(movement)
		this.delta.magnitude *= 0.75

		this.posRender.add(this.delta)
	}

	render () {
		window.requestAnimationFrame(() => {
			let dist = 60
			let v = new Vector()
			v.magnitude = this.vecRefMouse.magnitude
			v.direction = this.vecRefMouse.direction
			this.posTarget.set(this.posRef)

			if (!this.attached) {
				v.magnitude = Math.max(dist - v.magnitude, 0)

				if (v.magnitude > dist / 3) {
					this.attached = true
				}
			} else {
				v.magnitude *= 0.8

				if (this.vecRefMouse.magnitude > dist * 1.8) {
					this.attached = false
				}
			}

			this.posTarget.add(v)
			this.posTarget.y += scroller.speed

			this.update()
			this.$element.style.transform = `translate(
				${this.posRender.x - this.posRef.x}px,
				${this.posRender.y - this.posRef.y}px
			)`

			this.render()
		})
	}
}

export default Magnetic
