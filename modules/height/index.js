function findOriginNode (element) {
	while (true) {
		if (
			element.parentElement &&
			element.parentElement !== document.body
		) {
			element = element.parentElement
		} else {
			return element
		}
	}
}

export default class {
	constructor (element) {
		this.element = element
		this.updateHandler = this.update.bind(this)

		this.observer = new MutationObserver(this.updateHandler)
		this.observer.observe(findOriginNode(this.element) || this.element, {
			attributes: true,
			childList: true,
			subtree: true
		})

		window.addEventListener('resize', this.updateHandler)
		window.addEventListener('load', this.updateHandler)
		this.updateHandler()
	}

	update () {
		this.element.style.height = this.element.firstElementChild.offsetHeight + 'px'
	}

	destroy () {
		window.removeEventListener('resize', this.updateHandler)
		window.removeEventListener('load', this.updateHandler)
		this.observer.disconnect()
	}
}
