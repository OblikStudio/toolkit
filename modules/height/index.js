export default class {
	constructor (element, options) {
		this.element = element

    this.varName = 'height'
    this.varElement = null
		this.updateHandler = this.update.bind(this)

		this.observer = new MutationObserver(this.updateHandler)
		this.observer.observe(this.element, {
			attributes: true,
			childList: true,
			subtree: true
		})

    if (options && options.var) {
      if (typeof options.var === 'string') {
        this.varName = options.var
      }

      if (options.target) {
        this.varElement = document.querySelector(options.target)
      } else {
        this.varElement = this.element.parentElement
      }
    }

		window.addEventListener('resize', this.updateHandler)
		window.addEventListener('load', this.updateHandler)
		this.updateHandler()
	}

	update () {
    var value
    var element = this.element.firstElementChild

    if (element) {
      value = element.offsetHeight + 'px'
    }

    if (this.varElement) {
      this.varElement.style.setProperty('--' + this.varName, value)
    } else if (value) {
      this.element.style.height = value
    }
	}

	$destroy () {
		window.removeEventListener('resize', this.updateHandler)
		window.removeEventListener('load', this.updateHandler)
		this.observer.disconnect()
	}
}
