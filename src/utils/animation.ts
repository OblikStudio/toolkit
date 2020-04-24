import { linear } from './easings'

export class Tween {
	callback: Function
	duration: number
	easing: Function

	elapsed: number
	progress: number
	value: number
	stamp: number
	delta: number

	isComplete: boolean

	constructor (callback: Function, duration: number, easing: Function) {
		this.callback = callback
		this.duration = duration
		this.easing = easing

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
		this.callback.call(this, this.value)
	}

	step () {
		var newStamp = Date.now()
		this.delta = newStamp - this.stamp
		this.elapsed += this.delta

		if (this.elapsed > this.duration) {
			this.elapsed = this.duration
		}

		if (this.duration > 0) {
			this.progress = this.elapsed / this.duration
		} else {
			this.progress = 1
		}

		this.value = this.easing(this.progress)
		this.update()

		this.isComplete = this.elapsed >= this.duration
		this.stamp = newStamp
	}
}

interface AnimationOptions {
	update: Function
	duration: number
	easing: Function
	values: object
}

export class Animation extends Tween {
	isRunning: boolean
	isTicking: boolean
	values: object

	constructor (options: AnimationOptions) {
		super(options.update, options.duration, options.easing)
		this.isRunning = false
		this.isTicking = false

		this.values = options.values
		this.updateValues()
	}

	run () {
		if (this.isTicking) {
			// Avoid running multiple times and creating excess RAFs.
			return
		}

		if (this.isComplete) {
			this.isRunning = false
			return
		}

		if (!this.isRunning) {
			this.isRunning = true
			this.stamp = Date.now()
		}

		if (this.elapsed < this.duration) {
			setTimeout(() => {
				this.isTicking = false
				this.step()

				if (this.isRunning) {
					this.run()
				}
			}, 0)

			this.isTicking = true
		} else {
			this.step()
		}
	}

	updateValues () {
		for (let name in this.values) {
			let value = this.values[name]
			let diff = value.end - value.start

			this[name] = value.start + (diff * this.value)
		}
	}

	update () {
		this.updateValues()
		super.update()
	}

	stop () {
		this.isRunning = false
	}
}
