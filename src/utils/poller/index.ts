import { ticker } from '../..'
import { Emitter } from '../emitter'

type Change = {
	newValue: any,
	oldValue?: any,
	initial?: boolean
}

export class Poller<T = object> extends Emitter {
	private memo: Partial<{ [k in keyof T]: any }> = {}
	private polls: number = 0

	target: T
	props: (keyof T)[]

	constructor (target: T, props: (keyof T)[]) {
		super()

		this.target = target
		this.props = props

		ticker.on('measure', this.update, this)
	}

	update () {
		let changes: Partial<{ [k in keyof T]: Change }> = {}
		let isChanged = false
		let isInitial = this.polls === 0

		for (let prop of this.props) {
			if (prop in this.target) {
				let memo = this.memo[prop]
				let value = this.target[prop]
				let change: Change

				if (prop in this.memo) {
					if (value !== memo) {
						change = {
							newValue: value,
							oldValue: memo
						}
					}
				} else {
					change = {
						newValue: value,
						initial: true
					}
				}

				if (change) {
					this.memo[prop] = change.newValue
					changes[prop] = change
					isChanged = true
				}
			}
		}

		if (isInitial) {
			this.emit('init', this.memo)
		}

		if (isChanged) {
			this.emit('change', changes, isInitial)
		}

		this.polls++
	}

	get (prop: keyof T) {
		return this.memo[prop]
	}

	destroy () {
		ticker.purge(this)
		super.destroy()
	}
}
