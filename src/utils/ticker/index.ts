import { Emitter } from '../emitter'

export class Ticker extends Emitter {
	_isTicking: boolean
	_stamp: number
	_tickHandler: Ticker['_tick']

	constructor () {
		super()

		this._isTicking = false
		this._stamp = null
		this._tickHandler = this._tick.bind(this)
	}

	_run () {
		window.requestAnimationFrame(this._tickHandler)
	}

	_tick () {
		if (!this._isTicking) {
			return
		}

		let now = Date.now()
		let diff = now - this._stamp

		this.emit('tick', diff)
		this.emit('measure')

		// Timeout ensures callback mutations happen after promised measures.
		setTimeout(() => {
			this.emit('mutate')
		}, 0)

		this._stamp = now
		this._run()
	}

	start () {
		this._isTicking = true
		this._stamp = Date.now()
		this._run()
	}

	stop () {
		this._isTicking = false
	}
}
