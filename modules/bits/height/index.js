export default class {
	constructor (element, options) {
		this.element = element

    this.varElement = null
		this.updateHandler = this.update.bind(this)

		this.observer = new MutationObserver(this.updateHandler)
		this.observer.observe(this.element, {
			attributes: true,
			childList: true,
			subtree: true
		})

    if (options && options.var && this.element.parentElement) {
      this.varElement = this.element.parentElement
    }

		window.addEventListener('resize', this.updateHandler)
		window.addEventListener('load', this.updateHandler)
		this.updateHandler()
	}

	update () {
    var value = this.element.firstElementChild.offsetHeight + 'px'

    if (this.varElement) {
      this.varElement.style.setProperty('--height', value)
    } else {
      this.element.style.height = value
    }
	}

	$destroy () {
		window.removeEventListener('resize', this.updateHandler)
		window.removeEventListener('load', this.updateHandler)
		this.observer.disconnect()
	}
}
