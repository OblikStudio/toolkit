/**
 * @todo IE doesn't support Media events, add fallback
 * @see https://caniuse.com/#feat=mdn-api_mediaquerylistevent
 */

import query from 'querel'
import { Component } from '../../../core'

interface Options {
	media: string,
	target: string
}

export class Portal extends Component<Element, Options> {
	static isMovable = true
	static queries = {}

	media: MediaQueryList
	origin: Element
	target: Element
	reference: Node

	handleChange: () => void

	init () {
		let mediaQuery = Portal.queries[this.$options.media]

		if (!mediaQuery) {
			throw new Error(`Missing query: ${ this.$options.media }`)
		}

		this.media = window.matchMedia(mediaQuery)
		this.target = query(this.$element, this.$options.target)[0]
		this.origin = this.$element.parentElement
		this.reference = this.$element.nextSibling

		this.update(this.media.matches)

		this.handleChange = () => {
			this.update(this.media.matches)
		}

		if (typeof this.media.addEventListener === 'function') {
			this.media.addEventListener('change', this.handleChange)
		}
	}

	update (state: boolean) {
		if (state) {
			this.target.appendChild(this.$element)
		} else {
			this.origin.insertBefore(this.$element, this.reference)
		}
	}

	destroy () {
		if (typeof this.media.removeEventListener === 'function') {
			this.media.removeEventListener('change', this.handleChange)
		}
	}
}
