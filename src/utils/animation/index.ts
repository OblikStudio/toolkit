import { Tween } from '../tween'

export class Animation extends Tween {
	isTicking: boolean = false
	isRunning: boolean = false

	run () {
		if (this.isTicking) {
			// Avoid running multiple times and creating excess RAFs.
			return
		}

		if (!this.isRunning) {
			this.stamp = Date.now()
			this.isRunning = true
			this.emit('start')
		}

		if (this.duration === 0) {
			this.step()
		}

		if (!this.isComplete) {
			window.requestAnimationFrame(() => {
				this.isTicking = false

				if (this.isRunning) {
					this.step()
					this.run()
				}
			})

			this.isTicking = true
		}
	}

	stop () {
		this.isRunning = false
		this.emit('stop')
	}
}
