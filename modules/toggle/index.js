export default class {
	constructor (element, options) {
		this.element = element
		this.options = options
		this.targets = [element]

		if (this.options.target) {
			this.targets = [document.querySelector(this.options.target)]
		}

		if (this.options.targets) {
			this.targets = document.querySelectorAll(this.options.targets)
		}

		this.handler = this.toggle.bind(this)
		this.element.addEventListener('click', this.handler)
	}

	toggle () {
		for (var target of this.targets) {
			target.classList.toggle(this.options.class)
		}
	}

	destroy () {
		this.element.removeEventListener('click', this.handler)
	}
}
