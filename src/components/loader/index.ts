import { findAncestor } from '../../utils/dom'
import { Component } from '../..'
import { Cache, Entry } from './cache'
import { scroll } from '../scroll-to'
import { easeOutQuad } from '../../utils/easings'
import { getViewportScroller } from '../../utils'

interface State {
	url: string
	scroll: number
}

export class Container extends Component {
	animateOut () {
		return Promise.resolve()
	}

	animateIn () {
		return Promise.resolve()
	}
}

export class Loader extends Component {
	static components = {
		container: Container
	}

	cache: Cache
	parser: DOMParser
	$container: Container[]

	protected popStateHandler: Loader['handlePopState']
	protected clickHandler: Loader['handleClick']

	create () {
		this.cache = new Cache()
		this.parser = new DOMParser()
		this.$container = []

		this.popStateHandler = this.handlePopState.bind(this)
		this.clickHandler = this.handleClick.bind(this)

		window.addEventListener('popstate', this.popStateHandler)
		document.addEventListener('click', this.clickHandler)
		history.scrollRestoration = 'manual'
	}

	init () {
		this.cache.set(window.location.href, {
			markup: document.documentElement.outerHTML
		})

		this.updateState()
	}

	updateState () {
		let state: State = {
			url: window.location.href,
			scroll: getViewportScroller().scrollTop
		}

		history.replaceState(state, '', state.url)
	}

	request (url: string, timeout: number = 3e3) {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest()

			xhr.addEventListener('readystatechange', () => {
				if (xhr.readyState === XMLHttpRequest.DONE) {
					// Don't check xhr.status because 404 pages should also be rendered.
					resolve(xhr)
				}
			})

			xhr.addEventListener('timeout', () => {
				reject(new Error('Request timed out'))
			})

			xhr.addEventListener('error', () => {
				reject(new Error('Network error'))
			})

			xhr.open('GET', url)
			xhr.timeout = timeout
			xhr.send()
		})
	}

	async fetch (url: string): Promise<Entry> {
		let entry = this.cache.get(url)

		if (!entry) {
			return this.request(url).then((xhr: XMLHttpRequest) => {
				let markup = xhr.responseText
				let entry = this.cache.set(url, {
					markup
				})

				return Promise.resolve(entry)
			})
		} else {
			return Promise.resolve(entry)
		}
	}

	async load (item: Entry) {
		let doc = this.parser.parseFromString(item.markup, 'text/html')
		let title = doc.querySelector('head title')?.textContent
		let container = doc.querySelector('[ob-loader-container]')

		document.title = title

		this.$element.appendChild(container)

		return new Promise((resolve, reject) => {
			this.$emitter.once('add:container', (container: Container) => {
				container.animateIn().then(resolve).catch(reject)
			})
		})
	}

	removeContainers () {
		let promises = this.$container.map(container => {
			return container.animateOut().then(() => {
				let parent = container.$element.parentElement

				if (parent) {
					parent.removeChild(container.$element)
				}
			})
		})

		return Promise.all(promises)
	}

	handlePopState (event: PopStateEvent) {
		event.preventDefault()

		let state = history.state as State
		let animation = this.removeContainers()

		if (typeof state.scroll === 'number') {
			scroll({
				target: getViewportScroller(),
				offset: state.scroll,
				duration: 900,
				easing: easeOutQuad
			})
		}

		return this.fetch(state.url).then((item) => {
			return animation.then(() => {
				return this.load(item)
			})
		})
	}

	handleClick (event: MouseEvent) {
		if (event.target instanceof Element) {
			let link: HTMLAnchorElement = null

			if (event.target.tagName === 'A') {
				link = event.target as HTMLAnchorElement
			} else {
				link = findAncestor(event.target, el => el.tagName === 'A') as HTMLAnchorElement
			}

			if (link) {
				let href = link.getAttribute('href')

				if (href) {
					let sameOrigin = true
					let url = null

					try {
						url = new URL(href)
					} catch (e) {
						// A relative/absolute URL starting with `/`
					}

					if (url) {
						sameOrigin = (url.host === window.location.host)
					}

					let target = link.getAttribute('target')

					if (sameOrigin && target !== '_blank') {
						this.handleLink(link)
						event.preventDefault()
					}
				}
			}
		}
	}

	handleLink (link: HTMLAnchorElement) {
		let href = link.getAttribute('href')
		let animation = this.removeContainers()

		this.updateState()

		let fragment = href.split('#')?.[1]
		let fragmentElement = null
		let scrollTarget = getViewportScroller()

		if (fragment) {
			fragmentElement = document.getElementById(fragment)

			if (fragmentElement) {
				scrollTarget = fragmentElement
			}
		}

		scroll({
			target: scrollTarget,
			duration: 900,
			easing: easeOutQuad
		})

		return this.fetch(href).then((item: Entry) => {
			let state: State = {
				url: href,
				scroll: getViewportScroller().scrollTop
			}

			history.pushState(state, '', href)

			return animation.then(() => {
				return this.load(item)
			})
		})
	}

	destroy () {
		window.removeEventListener('popstate', this.popStateHandler)
		document.removeEventListener('click', this.clickHandler)
	}
}

export default Loader
