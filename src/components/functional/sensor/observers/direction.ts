import { Observer } from '..'
import { getViewportScroller } from '../../../../utils/overflow'

interface DirectionOptions {
	direction: string
}

let scroller = getViewportScroller()

export default class Direction implements Observer {
	options: DirectionOptions
	lastPosition: number

	constructor (effect, options) {
		this.options = Object.assign({
			direction: 'up'
		}, options)

		this.lastPosition = null
	}

	$check () {
		var previous = this.lastPosition
		this.lastPosition = scroller.scrollTop

		return this.options.direction === 'up'
			? (this.lastPosition < previous)
			: (this.lastPosition > previous)
	}
}
