import { Emitter } from './emitter'
import { Poller } from './poller'

function getOffsetParents (element) {
	let result = []

	while (element = element.offsetParent) {
		result.push(element)
	}

	return result
}

export class PositionObserver extends Emitter {
  target: HTMLElement
  observers: Poller<HTMLElement>[]
  position: {
    x: number,
    y: number
  }

	constructor (element) {
		super()
		this.target = element
		this.observers = []

		this.updateObservers()
		this.updatePosition()
	}

	updateObservers () {
		let parents = getOffsetParents(this.target)
		parents.unshift(this.target)

		/** @todo reuse observers */
		this.observers.forEach(obs => obs.destroy())
    this.observers = []

		parents.forEach(par => {
			let obs = new Poller(par, ['offsetTop', 'offsetLeft', 'offsetParent'])
			obs.on('change', this.change, this)
			this.observers.push(obs)
		})
	}

	change (changes) {
		if (changes.offsetParent && !changes.offsetParent.initial) {
			this.updateObservers()
		}

		this.updatePosition()
	}
  
	updatePosition () {
		let x = 0
		let y = 0

		this.observers.forEach(obs => {
      x += obs.target.offsetLeft
			y += obs.target.offsetTop
		})
    
		this.position = { x, y }
    this.emit('change', this.position)
	}

	destroy () {
		this.observers.forEach(obs => {
			obs.destroy()
		})

		this.destroy()
	}
}
