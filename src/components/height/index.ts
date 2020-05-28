import { Poller } from '../../utils/poller'
import { Component } from '../..'

interface Options {
	var?: string
	varTarget?: HTMLElement
	target?: HTMLElement
}

export class Height extends Component<HTMLElement, Options> {
	varName: string
	varTarget: HTMLElement
	poller: Poller<HTMLElement>

	create () {
		let target = this.$options.target ?? (this.$element.firstElementChild as HTMLElement)
		this.poller = new Poller(target, ['offsetHeight'])

		if (this.$options?.var) {
			this.varName = this.$options.var
			this.varTarget = this.$options.varTarget ?? this.$element
		}
	}

	init () {
		this.poller.on('change', changes => {
			this.update(changes.offsetHeight.newValue)
		})
	}

	update (value: number) {
		let height = `${value.toString()}px`

		if (this.varTarget) {
			this.varTarget.style.setProperty('--' + this.varName, height)
		} else if (value) {
			this.$element.style.height = height
		}
	}

	destroy () {
		this.poller.destroy()
	}
}

export default Height
