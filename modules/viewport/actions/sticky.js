// todo:
// - support horizontal fixed and bounds
// - support offset left when position absolute
// - update elements on resize when fixed

import query from '../../../utils/context-query'

/**
 * Can't use shorthand properties for margin, padding, and border
 * @see https://stackoverflow.com/questions/18675828
 */
const PLACEHOLDER_COPIED_PROPERTIES = [
	'position',
	'top',
	'bottom',
	'float',
	'flex',
	'marginTop',
	'marginRight',
	'marginBottom',
	'marginLeft',
	'paddingTop',
	'paddingRight',
	'paddingBottom',
	'paddingLeft',
	'borderTopWidth',
	'borderRightWidth',
	'borderBottomWidth',
	'borderLeftWidth',
	'box-sizing'
]

export default class {
	constructor (effect, options) {
		this.effect = effect
		this.sensor = effect.sensor
		this.options = Object.assign({
			animate: false,
			initialAnimation: true,
			setWidth: true,
			classFixed: 'is-fixed',
			classUnfixed: null,
			classTransition: 'is-transition',
			bounds: null
		}, options)

		this.element = this.sensor.element
		this.static = this.element
		this.isFixed = false
		this.isAbsolute = false
		this.boundsElement = null
		this.boundsRatio = null
		this.offset = {
			x: 'auto',
			y: 0
		}

		this.animationElement = (this.options.animationTarget)
			? document.querySelector(this.options.animationTarget)
			: this.element

		this.placeholder = document.createElement('div')
		this.placeholder.style.display = 'none'
		this.placeholder.style.opacity = 0
		this.placeholder.style.pointerEvents = 'none'
		this.element.parentNode.insertBefore(this.placeholder, this.element.nextSibling)
		this.updatePlaceholder()

		if (this.options.bounds) {
			this.boundsElement = query(this.element, this.options.bounds)
		}
	}

	updatePlaceholder () {
		/**
		 * getComputedStyle() returns differing values for width/height across
		 * browsers @see https://stackoverflow.com/questions/19717907
		 */
		this.placeholder.style.width = this.element.offsetWidth + 'px'
		this.placeholder.style.height = this.element.offsetHeight + 'px'

		this.elementLatestStyles = window.getComputedStyle(this.element)
		PLACEHOLDER_COPIED_PROPERTIES.forEach(property => {
			this.placeholder.style[property] = this.elementLatestStyles[property]
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
		var value = !!value
		if (this.isFixed !== value) {
			this.isFixed = value
		} else {
			return
		}

		if (this.isFixed) {
			this.element.classList.add(this.options.classFixed)
			this.element.classList.remove(this.options.classUnfixed)
			this.element.style.position = 'fixed'
			this.updateOffset()
			this.placeholder.style.display = this.elementLatestStyles.getPropertyValue('display')
			this.static = this.placeholder

			if (this.options.setWidth) {
				this.element.style.width = this.placeholder.offsetWidth + 'px'
			}
		} else {
			this.element.classList.remove(this.options.classFixed)
			this.element.classList.add(this.options.classUnfixed)
			this.element.style.position = ''
			this.element.style.top = ''
			this.placeholder.style.display = 'none'
			this.static = this.element

			if (this.options.setWidth) {
				this.element.style.width = ''
			}
		}

		// Change the element that the sensor uses to element that is part of the
		// document flow. I.E. the default location of the element.
		this.sensor.element = this.static
	}

	applyAbsolute (value, location) {
		this.isAbsolute = !!value

		if (this.isAbsolute) {
			this.element.style.position = 'absolute'
			this.element.style.top = location.y + 'px'
		} else {
			this.element.style.position = 'fixed'
			this.updateOffset()
		}
	}

	updateOffset () {
		Object.assign(this.offset, this.effect.observer.$stickyOffset)
		this.element.style.top = this.offset.y + 'px'
	}

	$refresh (staticRect) {
		if (!this.boundsElement) {
			return
		}

		// If the module is not in a fixed state, the user has not yet scrolled to
		// it, so he couldn't have scolled past it.
		if (!this.isFixed) {
			this.boundsRatio = 0
			return
		}

		var elementRect = this.element.getBoundingClientRect()
		var boundsRect = this.boundsElement.getBoundingClientRect()

		if (this.isAbsolute) {
			this.boundsRatio = 1
		} else {
			this.boundsRatio = 
				(elementRect.top - boundsRect.top) / // difference
				(boundsRect.height - elementRect.height) // slack
		}

		if (boundsRect.bottom - elementRect.bottom < 0) {
			this.applyAbsolute(true, {
				y: boundsRect.bottom - staticRect.bottom + this.static.offsetTop
			})
		}

		if (this.offset.y + elementRect.height < boundsRect.bottom) {
			this.applyAbsolute(false)
		}
	}

	$update (value, observer) {
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

	$destroy () {
		this.placeholder.parentNode.removeChild(this.placeholder)
	}
}
