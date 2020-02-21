import query from 'querel'
import { Component } from '../../../core'

interface Options {
  var: string
  target: string
}

export default class Height extends Component<HTMLElement, Options> {
  varName: string
  varElement: HTMLElement
  updateHandler: () => any
  observer: MutationObserver

	create () {
    this.varName = 'height'
    this.varElement = null
    this.updateHandler = this.update.bind(this)

		this.observer = new MutationObserver(this.updateHandler)
		this.observer.observe(this.$element, {
			childList: true,
			subtree: true
		})

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

		window.addEventListener('resize', this.updateHandler)
		window.addEventListener('load', this.updateHandler)
		this.updateHandler()
	}

	update () {
    var value
    var element = this.$element.firstElementChild

    if (element instanceof HTMLElement) {
      value = element.offsetHeight + 'px'
    }

    if (this.varElement) {
      this.varElement.style.setProperty('--' + this.varName, value)
    } else if (value) {
      this.$element.style.height = value
    }
	}

	destroy () {
		window.removeEventListener('resize', this.updateHandler)
		window.removeEventListener('load', this.updateHandler)
		this.observer.disconnect()
	}
}
