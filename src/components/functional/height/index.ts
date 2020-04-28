import query from 'querel'
import { Poller } from '../../../utils/poller'
import { Component } from '../../../core'

interface Options {
	var: string
	target: string
	self: boolean
}

export default class Height extends Component<HTMLElement, Options> {
	varName: string
	varElement: HTMLElement
	poller: Poller

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

		let target = this.$options.self ? this.$element : this.$element.firstElementChild

		this.poller = new Poller(target, ['offsetHeight'])
		this.poller.on('change', changes => {
			this.update(changes.offsetHeight.newValue)
		})
	}

	update (value: number) {
		if (this.varElement) {
			this.varElement.style.setProperty('--' + this.varName, value.toString() + 'px')
		} else if (value) {
			this.$element.style.height = value.toString()
		}
	}
}
