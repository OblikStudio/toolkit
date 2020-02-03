/**
 * @todo support horizontal fixed and bounds
 * @todo support offset left when position absolute
 * @todo update elements on resize when fixed
 */

import { default as query, QueryTarget } from 'querel'
import { Component, mutate } from '../../../core'
import { resource } from '../../../utils/config'
import { RectObserver } from '../../../utils/rect-observer'
import { Observer } from '.'

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
	// 'paddingTop',
	// 'paddingRight',
	// 'paddingBottom',
	// 'paddingLeft',
	'borderTopWidth',
	'borderRightWidth',
	'borderBottomWidth',
	'borderLeftWidth',
	'box-sizing'
]

interface StickyOptions {
	setWidth: boolean
	classFixed: string
	classUnfixed: string
  bounds: string

  observer: string
  target: QueryTarget
  reference: string
}

export class Sticky extends Component<HTMLElement, StickyOptions> {
  static resources = {
    observers: {}
  }

  static defaults = {
    setWidth: true,
    classFixed: 'is-fixed',
    classUnfixed: null,
    bounds: null
  }

  static: HTMLElement
  target: Window | HTMLElement
	boundsElement: HTMLElement = null
  placeholder: HTMLElement
  observer: Observer
  value: boolean

	isFixed = false
	isAbsolute = false
  elementLatestStyles: CSSStyleDeclaration
  
  private _elementObserver: RectObserver
  private _targetObserver: RectObserver
  private _placeholderObserver: RectObserver

	create () {
    let resources = this.constructor.resources

		this.observer = resource<Observer>(
			this.$options.observer,
			resources.observers,
			(Resource, options) => new Resource(this, options)
		)

		if (this.$options.target) {
			if (this.$options.target === 'window') {
				this.target = window
			} else {
				if (typeof this.$options.target === 'string') {
					this.target = query(this.$element, this.$options.target, HTMLElement)[0]
				} else if (this.$options.target instanceof HTMLElement) {
					this.target = this.$options.target
				}
			}
		} else {
			this.target = window
    }

    this.static = this.$element
    
    mutate().then(() => {
      this.placeholder = document.createElement('div')
      this.placeholder.style.display = 'none'
      this.placeholder.style.opacity = '0'
      this.placeholder.style.pointerEvents = 'none'
      this.$element.parentNode.insertBefore(this.placeholder, this.$element.nextSibling)
      this.updatePlaceholder()

      if (this.$options.bounds) {
        this.boundsElement = query(this.$element, this.$options.bounds, HTMLElement)[0]
      }

      let docRelative = (this.$options.reference === 'document')
      this._elementObserver = new RectObserver(this.$element, docRelative)
      this._targetObserver = new RectObserver(this.target, docRelative)
      this._placeholderObserver = new RectObserver(this.placeholder, docRelative)

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
			this.$element.classList.add(this.$options.classFixed)
			this.$element.classList.remove(this.$options.classUnfixed)
			this.$element.style.position = 'fixed'
			this.placeholder.style.display = this.elementLatestStyles.getPropertyValue('display')
			this.static = this.placeholder

			if (this.$options.setWidth) {
				this.$element.style.width = this.placeholder.offsetWidth + 'px'
			}
		} else {
			this.$element.classList.remove(this.$options.classFixed)
			this.$element.classList.add(this.$options.classUnfixed)
			this.$element.style.position = ''
			this.$element.style.top = ''
			this.placeholder.style.display = 'none'
			this.static = this.$element

			if (this.$options.setWidth) {
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

	refresh (staticRect) {
		if (!this.boundsElement) {
			return
		}

		// If the component is not in a fixed state, the user has not yet scrolled to
		// it, so he couldn't have scolled past it.
		if (!this.isFixed) {
			return
		}

		var elementRect = this.$element.getBoundingClientRect()
		var boundsRect = this.boundsElement.getBoundingClientRect()

		if (boundsRect.bottom - elementRect.bottom < 0) {
			this.applyAbsolute(true, boundsRect.bottom - staticRect.bottom + this.static.offsetTop)
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

    let value = this.observer.update(rect, this._targetObserver.rect)
		if (value !== this.value) {
      this.value = value

      if (value) {
        // Get the latest element styles before fixing it.
        this.updatePlaceholder()
      }
      
      this.applyFixed(value)
    }

    this.refresh(rect)
	}

	destroy () {
    super.destroy()
		this.placeholder.parentNode.removeChild(this.placeholder)
	}
}
