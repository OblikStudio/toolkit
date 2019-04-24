const observers = {
	before: function (data) {
		// var target = document.querySelector(data.target)
		var offset = (data.offset || 0)

		return function () {
			// var rect = target.getBoundingClientRect()
			var rect = this.sticky.static.getBoundingClientRect()
			return (rect.top + offset < 0)
		}
	}
}

const actions = {
	fixed: function () {
		this.createPlaceholder()

		return function (observerResult) {
			this.sticky.setFixed(observerResult === true)
		}
	}
}

class Effect {
	constructor (sticky, observer, action) {
		this.sticky = sticky
		this.observer = observer
		this.observerResult = undefined
		this.action = action
	}

	update (data) {
		var result = this.observer.call(this, data)
		if (result !== this.observerResult) {
			this.action.call(this, result)
			this.observerResult = result
		}
	}
}

class Sticky {
	constructor (element, options) {
		this.options = Object.assign({
			animate: false,
			initialAnimation: true,
			classFixed: 'is-fixed',
			classUnfixed: null,
			classTransition: 'is-transition'
		}, options)

		this.element = element
		this.static = element
		this.isFixed = false

		this.animationElement = (this.options.animationTarget)
			? document.querySelector(this.options.animationTarget)
			: this.element

		this.effects = [
			new Effect(
				this,
				observers.before.call(this, {}),
				actions.fixed.call(this, {})
			)
		]

		window.addEventListener('scroll', this.update.bind(this))
		window.addEventListener('resize', this.update.bind(this))
		this.update()
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
				console.log("transition ended")
				resolve()
			}

			this.animationElement.addEventListener('transitionend', this.animationHandler)
			this.animationElement.addEventListener('transitioncancel', () => {
				console.log('trans cancel')
			})

			this.animationElement.classList.add(this.options.classTransition)
		}).then(callback)
	}

	applyFixed (value) {
		console.log('apply fixed', value)

		if (!!value) {
			this.element.classList.add(this.options.classFixed)
			this.element.classList.remove(this.options.classUnfixed)
			this.placeholder.style.position = this.element.style.position
			this.element.style.position = 'fixed'
			this.static = this.placeholder
		} else {
			this.element.classList.remove(this.options.classFixed)
			this.element.classList.add(this.options.classUnfixed)
			this.element.style.position = ''
			this.placeholder.style.position = 'fixed'
			this.static = this.element
		}
	}

	setFixed (value) {
		if (document.readyState === 'loading' && !this.options.initialAnimation) {
			var parent = this.element.parentNode
			var sibling = this.element.nextSibling

			parent.removeChild(this.element)
			this.applyFixed(value)
			parent.insertBefore(this.element, sibling)

			return
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

	createPlaceholder () {
		if (this.placeholder) {
			return
		}

		this.placeholder = document.createElement('div')
		this.placeholder.style.position = 'fixed'
		this.element.parentNode.insertBefore(this.placeholder, this.element.nextSibling)
		this.updatePlaceholder()
	}

	updatePlaceholder () {
		var styles = window.getComputedStyle(this.element)
		this.placeholder.style.width = this.element.offsetWidth + 'px'
		this.placeholder.style.height = this.element.offsetHeight + 'px'
		this.placeholder.style.display = styles.getPropertyValue('display')
		this.placeholder.style.margin = styles.getPropertyValue('margin')
	}

	update () {
		var rect = this.static.getBoundingClientRect()

		this.effects.forEach(effect => {
			effect.update(rect)
		})
	}
}

export default function (element, options) {
	return new Sticky(element, options)
}
