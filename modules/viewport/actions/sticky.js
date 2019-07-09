const PLACEHOLDER_COPIED_PROPERTIES = [
	'position',
	'float',
	'flex',
	'width',
	'height',
	'margin',
	'padding',
	'border',
	'box-sizing'
]

export default class {
	constructor (sensor, options) {
		this.sensor = sensor
		this.options = Object.assign({
			animate: false,
			initialAnimation: true,
			setWidth: true,
			classFixed: 'is-fixed',
			classUnfixed: null,
			classTransition: 'is-transition'
		}, options)

		this.element = this.sensor.element
		this.static = this.element
		this.isFixed = false

		this.animationElement = (this.options.animationTarget)
			? document.querySelector(this.options.animationTarget)
			: this.element

		this.placeholder = document.createElement('div')
		this.placeholder.style.display = 'none'
		this.placeholder.style.opacity = 0
		this.element.parentNode.insertBefore(this.placeholder, this.element.nextSibling)
		this.updatePlaceholder()
	}

	updatePlaceholder () {
		this.elementLatestStyles = window.getComputedStyle(this.element)
		PLACEHOLDER_COPIED_PROPERTIES.forEach(property => {
			this.placeholder.style[property] = this.elementLatestStyles.getPropertyValue(property)
		})
	}

	transition (callback) {
		return new Promise((resolve, reject) => {
			if (this.animationHandler) {
				this.animationHandler()
			}

			this.animationHandler = () => {
				this.animationElement.classList.remove(this.options.classTransition)
				this.animationElement.removeEventListener('transitionend', this.animationHandler)
				this.animationHandler = null
				resolve()
			}

			this.animationElement.addEventListener('transitionend', this.animationHandler)
			this.animationElement.classList.add(this.options.classTransition)
		}).then(callback)
	}

	applyFixed (value) {
		if (!!value) {
			this.element.classList.add(this.options.classFixed)
			this.element.classList.remove(this.options.classUnfixed)
			this.element.style.position = 'fixed'
			this.placeholder.style.display = this.elementLatestStyles.getPropertyValue('display')
			this.static = this.placeholder

			if (this.options.setWidth) {
				this.element.style.width = this.placeholder.offsetWidth + 'px'
			}
		} else {
			this.element.classList.remove(this.options.classFixed)
			this.element.classList.add(this.options.classUnfixed)
			this.element.style.position = ''
			this.placeholder.style.display = 'none'
			this.static = this.element

			if (this.options.setWidth) {
				this.element.style.width = ''
			}
		}

		this.sensor.element = this.static
	}

	update (value, observer) {
		if (document.readyState === 'loading' && !this.options.initialAnimation) {
			var parent = this.element.parentNode
			var sibling = this.element.nextSibling

			parent.removeChild(this.element)
			this.applyFixed(value)
			parent.insertBefore(this.element, sibling)

			return
		}

		if (value) {
			// Get the latest element styles before fixing it.
			this.updatePlaceholder()

			if (observer.$fixedOffset) {
				this.element.style.top = observer.$fixedOffset + 'px'
			}
		}

		if (this.options.animate) {
			this.transition(() => {
				this.applyFixed(value)
				return Promise.resolve()
			})
		} else {
			this.applyFixed(value)
		}
	}

	destroy () {
		this.placeholder.parentNode.removeChild(this.placeholder)
	}
}
