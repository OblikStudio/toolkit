import { Emitter } from '../emitter'

export class Ticker extends Emitter {
	private stamp: number = null
	private isTicking: boolean = false
	private handler = this.run.bind(this)

	protected schedule () {
		window.requestAnimationFrame(this.handler)
	}

	protected run () {
		if (!this.isTicking) {
			return
		}

		let now = Date.now()
		let diff = now - this.stamp

		this.tick(diff)

		this.stamp = now
		this.schedule()
	}

	protected tick (delta: number) {
		this.emit('tick', delta)
	}

	start () {
		this.isTicking = true
		this.stamp = Date.now()
		this.schedule()
	}

	stop () {
		this.isTicking = false
	}
}
