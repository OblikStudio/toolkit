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

	constructor (callback: Function, duration: number, easing?: Function) {
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
		if (typeof this.callback === 'function') {
			this.callback.call(this, this.value)
		}
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

interface AnimationOptions<T> {
	onStop?: () => void
	onUpdate?: () => void
	easing?: Function
	duration: number
	values: {
		[k in keyof T]: {
			start: number
			end: number
		}
	}
}

export class Animation<T> extends Tween {
	onStop: () => void
	isRunning: boolean
	isTicking: boolean
	values: {
		[k in keyof T]: {
			start: number
			end: number
		}
	}
	computed: {
		[k in keyof T]: number
	}

	constructor (options: AnimationOptions<T>) {
		super(options.onUpdate, options.duration, options.easing)
		this.isRunning = false
		this.isTicking = false

		this.onStop = options.onStop
		this.values = options.values
		this.computed = {} as any
		this.updateValues()
	}

	run () {
		if (this.isTicking) {
			// Avoid running multiple times and creating excess RAFs.
			return
		}

		if (this.isComplete) {
			this.isRunning = false

			if (typeof this.onStop === 'function') {
				this.onStop()
			}

			return
		}

		if (!this.isRunning) {
			this.isRunning = true
			this.stamp = Date.now()
		}

		if (this.elapsed < this.duration) {
			setTimeout(() => {
				this.isTicking = false

				if (this.isRunning) {
					this.step()
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

			this.computed[name] = value.start + (diff * this.value)
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
