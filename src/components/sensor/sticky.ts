/**
 * @todo support horizontal fixed and bounds
 * @todo support offset left when position absolute
 * @todo update elements on resize when fixed
 */

import query from '../../utils/query'
import { mutate } from '../..'
import { RectObserver } from '../../utils/rect-observer'
import { Sensor, Options } from '.'

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
	'borderTopWidth',
	'borderRightWidth',
	'borderBottomWidth',
	'borderLeftWidth',
	'box-sizing'
]

interface StickyOptions extends Options {
	measure: Options['measure'] & {
		bounds: string
	}
	mutate: Options['mutate'] & {
		setWidth: boolean
	}
}

export class Sticky extends Sensor {
	static defaults = {
		target: window,
		reference: 'viewport',
		measure: {
			offset: 0,
			after: true,
			edge: 'top',
			targetEdge: 'top',
			bounds: null
		},
		mutate: {
			class: 'is-fixed',
			setWidth: true
		}
	}

	$options: StickyOptions

	static: HTMLElement
  placeholder: HTMLElement
	boundsElement: HTMLElement
	isFixed = false
	isAbsolute = false
  elementLatestStyles: CSSStyleDeclaration
	
	private _boundsObserver: RectObserver
  private _placeholderObserver: RectObserver

	init () {
		if (typeof this.$options.target === 'string') {
			this.target = query(this.$element, this.$options.target, HTMLElement)[0]
		} else {
			this.target = this.$options.target as Window | HTMLElement
		}

		this.static = this.$element
    
    mutate().then(() => {
      this.placeholder = document.createElement('div')
      this.placeholder.style.display = 'none'
      this.placeholder.style.opacity = '0'
      this.placeholder.style.pointerEvents = 'none'
      this.$element.parentNode.insertBefore(this.placeholder, this.$element.nextSibling)
      this.updatePlaceholder()

      let docRelative = (this.$options.reference === 'document')
      this._elementObserver = new RectObserver(this.$element, docRelative)
      this._targetObserver = new RectObserver(this.target, docRelative)
			this._placeholderObserver = new RectObserver(this.placeholder, docRelative)
			
			if (this.$options.measure.bounds) {
				this.boundsElement = query(this.$element, this.$options.measure.bounds, HTMLElement)[0]
				this._boundsObserver = new RectObserver(this.boundsElement, docRelative)
      }

      return Promise.all([
        this._elementObserver.promise('init'),
        this._targetObserver.promise('init'),
        this._placeholderObserver.promise('init')
      ])
    }).then(() => {
			this._elementObserver.on('change', this.update, this)
			this._targetObserver.on('change', this.update, this)
			this._placeholderObserver.on('change', this.update, this)
			this.update()
		})
	}

	updatePlaceholder () {
		/**
		 * getComputedStyle() returns differing values for width/height across
		 * browsers @see https://stackoverflow.com/questions/19717907
		 */
		this.placeholder.style.width = this.$element.offsetWidth + 'px'
		this.placeholder.style.height = this.$element.offsetHeight + 'px'

		this.elementLatestStyles = window.getComputedStyle(this.$element)
		PLACEHOLDER_COPIED_PROPERTIES.forEach(property => {
			this.placeholder.style[property] = this.elementLatestStyles[property]
		})
	}

	applyFixed (value) {
		if (this.isFixed !== value) {
			this.isFixed = value
		} else {
			return
		}

		if (this.isFixed) {
			this.$element.classList.add(this.$options.mutate.class)
			this.$element.style.position = 'fixed'
			this.$element.style.top = '0px'
			this.placeholder.style.display = this.elementLatestStyles.getPropertyValue('display')
			this.static = this.placeholder

			if (this.$options.mutate.setWidth) {
				this.$element.style.width = this.placeholder.offsetWidth + 'px'
			}
		} else {
			this.$element.classList.remove(this.$options.mutate.class)
			this.$element.style.position = ''
			this.$element.style.top = ''
			this.placeholder.style.display = 'none'
			this.static = this.$element

			if (this.$options.mutate.setWidth) {
				this.$element.style.width = ''
			}
		}
	}

	applyAbsolute (value, offset?: number) {
		this.isAbsolute = !!value

		if (this.isAbsolute) {
			this.$element.style.position = 'absolute'
			this.$element.style.top = offset + 'px'
		} else {
			this.$element.style.position = 'fixed'
			this.$element.style.top = '0px'
		}
	}

	mutate (value: boolean) {
		if (value) {
			// Get the latest element styles before fixing it.
			this.updatePlaceholder()
		}
		
		this.applyFixed(value)
	}

	checkBounds (rect: ClientRect) {
		// If the component is not in a fixed state, the user has not yet scrolled to
		// it, so he couldn't have scolled past it.
		if (!this.isFixed) {
			return
		}

		let elementRect = this._elementObserver.rect
		let boundsRect = this._boundsObserver.rect

		if (boundsRect.bottom - elementRect.bottom < 0) {
			this.applyAbsolute(true, boundsRect.bottom - rect.bottom + this.static.offsetTop)
		}

		if (elementRect.height < boundsRect.bottom) {
			this.applyAbsolute(false)
		}
	}

	update () {
    let rect = null

    if (this.static === this.$element) {
      rect = this._elementObserver.rect
    } else {
      rect = this._placeholderObserver.rect
    }

    let value = this.measure(rect, this._targetObserver.rect)
		if (value !== this.value) {
			this.mutate(value)
      this.value = value
		}

    if (this.boundsElement) {
			this.checkBounds(rect)
		}
	}

	destroy () {
    super.destroy()
		this.placeholder.parentNode.removeChild(this.placeholder)
	}
}
