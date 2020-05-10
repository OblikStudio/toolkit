import { Ticker } from '../../utils/ticker'

let ticker = new Ticker()
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
