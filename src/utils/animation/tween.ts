import { Easing, linear } from '../easings'
import { Emitter } from '../emitter'
import { components } from '../..'

export class Tween extends Emitter<any> {
	elapsed: number
	progress: number
	value: number
	stamp: number
	delta: number
	isComplete: boolean

	constructor (public duration: number, public easing?: Easing) {
		super()

		if (typeof this.duration !== 'number') {
			throw new Error('Duration must be a number')
		}

		if (typeof this.easing !== 'function') {
			this.easing = linear
		}

		this.elapsed = 0
		this.progress = 0
		this.value = 0

		this.stamp = Date.now()
		this.delta = 0

		this.isComplete = false
	}

	update () {
		this.emit('update', this.value)
	}

	step () {
		let oldStamp = this.stamp

		this.stamp = Date.now()
		this.delta = this.stamp - oldStamp
		this.elapsed += this.delta

		if (this.duration > 0) {
			this.progress = Math.min(this.elapsed / this.duration, 1)
		} else {
			this.progress = 1
		}

		this.value = this.easing(this.progress)
		this.update()

		let complete = this.elapsed >= this.duration
		if (complete && !this.isComplete) {
			this.isComplete = true
			this.emit('end')
		}
	}
}
