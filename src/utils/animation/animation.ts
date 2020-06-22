import { Tween } from './tween'

export interface Options<T> {
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

	constructor (options: Options<T>) {
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
