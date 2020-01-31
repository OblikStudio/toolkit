import { Observer } from '..'

interface RelativeOptions {
	offset: number
	after: boolean
	edge: string
	targetEdge: string
}

export default class Relative extends Observer {
	options: RelativeOptions

	constructor (sensor, options: RelativeOptions) {
		super()

		this.options = Object.assign({
			offset: 0,
			target: null,
			after: true,
			edge: 'bottom',
			targetEdge: 'bottom'
		}, options)
	}

	update (elementRect: ClientRect, targetRect: ClientRect) {
		let val = targetRect[this.options.edge]
		let targetVal = elementRect[this.options.targetEdge] + this.options.offset
		let diff = val - targetVal

		if (this.options.after) {
			return diff > 0
		} else {
			return diff < 0
		}
	}
}
