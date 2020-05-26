import { Ticker } from '../../utils/ticker'

export class Timer extends Ticker {
	tick (delta: number) {
		super.tick(delta)
		this.emit('measure')

		// Timeout ensures callback mutations happen after promised measures.
		setTimeout(() => {
			this.emit('mutate')
		}, 0)
	}
}

let ticker = new Timer()
ticker.start()

function measure (callback: () => any, context?: any): void
function measure (): Promise<void>
function measure (callback?: () => any, context?: any) {
	if (arguments.length > 0) {
		ticker.once('measure', callback, context)
	} else {
		return ticker.promise('measure')
	}
}

function mutate (callback: () => any, context?: any): void
function mutate (): Promise<void>
function mutate (callback?: () => any, context?: any) {
	if (arguments.length > 0) {
		ticker.once('mutate', callback, context)
	} else {
		return ticker.promise('mutate')
	}
}

export {
	ticker,
	measure,
	mutate
}
