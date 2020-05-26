import query from '../../utils/query'
import { Poller } from '../../utils/poller'
import { Component } from '../..'

interface Options {
	var: string
	target: string
}

export class Height extends Component<HTMLElement, Options> {
	varName: string
	varElement: HTMLElement
	poller: Poller<HTMLElement>

	create () {
		this.varName = 'height'
		this.varElement = null

		if (this.$options && this.$options.var) {
			if (typeof this.$options.var === 'string') {
				this.varName = this.$options.var
			}

			if (this.$options.target) {
				this.varElement = query(this.$element, this.$options.target, HTMLElement)[0]
			} else {
				this.varElement = this.$element
			}
		}

		this.poller = new Poller(this.$element.firstElementChild as HTMLElement, ['offsetHeight'])
		this.poller.on('change', changes => {
			this.update(changes.offsetHeight.newValue)
		})
	}

	update (value: number) {
		if (this.varElement) {
			this.varElement.style.setProperty('--' + this.varName, value.toString())
		} else if (value) {
			this.$element.style.height = value.toString()
		}
	}
}

export default Height
