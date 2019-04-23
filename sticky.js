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
			console.log('action on result', observerResult)
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
	constructor (element) {
		this.element = element
		this.static = element
		this.isFixed = false

		this.effects = [
			new Effect(
				this,
				observers.before.call(this, {
					target: '.test'
				}),
				actions.fixed.call(this)
			)
		]

		window.addEventListener('scroll', this.update.bind(this))
		window.addEventListener('resize', this.update.bind(this))
	}

	setFixed (value) {
		console.log('set fixed', value)
		if (!!value) {
			this.element.classList.add('is-fixed')
			this.placeholder.style.position = this.element.style.position
			this.element.style.position = 'fixed'
			this.static = this.placeholder
		} else {
			this.element.classList.remove('is-fixed')
			this.element.style.position = ''
			this.placeholder.style.position = 'fixed'
			this.static = this.element
		}
	}

	createPlaceholder () {
		if (this.placeholder) {
			return
		}

		this.placeholder = document.createElement('div')
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
	return new Sticky(element)
}
