/**
 * @todo when clicking on a link, the document fragment is not added to the
 * address bar (due to preventDefault)
 * @todo the cliecked element should be focused as per default behavior
 */

import { getTag } from '../../utils/dom'
import { linear } from '../../utils/easings'
import { scrollTo } from '../../utils/scroll'
import { Component } from '../..'

export function monitorLinks (options: Parameters<typeof scrollTo>[0]) {
	window.addEventListener('click', (event) => {
		var link = getTag(event.target, 'A')

		if (link) {
			var href = link.getAttribute('href')

			if (typeof href === 'string' && href[0] === '#') {
				var target = document.querySelector(href)

				if (target) {
					scrollTo({
						...options,
						target
					})

					event.preventDefault()
				}
			}
		}
	})
}

interface Options {
	event: keyof GlobalEventHandlersEventMap
	target: HTMLElement
	duration: number
	easing: string
	offset: string
}

interface Easings {
	[key: string]: (pos: number) => number
}

export class ScrollTo extends Component<Element, Options> {
	static easings: Easings = {
		linear
	}

	static defaults = {
		event: 'click',
		duration: 650,
		easing: 'linear',
		offset: 0
	}

	target: HTMLElement
	handler: any

	create () {
		if (!this.$options.target) {
			throw new Error('No scroll target specified')
		}

		this.target = this.$options.target

		let offset: number
		if (typeof this.$options.offset === 'number') {
			offset = this.$options.offset
		} else if (typeof this.$options.offset === 'string') {
			offset = parseInt(this.$options.offset)
		}

		this.handler = (event) => {
			scrollTo({
				duration: this.$options.duration,
				easing: ScrollTo.easings[this.$options.easing],
				target: this.target,
				offset
			})
		}

		this.$element.addEventListener(this.$options.event, this.handler)
	}

	destroy () {
		this.$element.removeEventListener(this.$options.event, this.handler)
	}
}

export default ScrollTo
