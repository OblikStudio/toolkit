import { findAncestor } from '../../utils/dom'
import { Component } from '../..'
import { Cache, Entry } from './cache'
import { scrollTo } from '../../utils/scroll'
import { easeOutQuint } from '../../utils/easings'

interface State {
	url: string
	scroll: number
}

export class Container extends Component {
	promiseTransition (className: string) {
		return new Promise((resolve, reject) => {
			let handler = () => {
				this.$parent.$emitter.off('navigation')
				this.$element.removeEventListener('animationend', handler)
				resolve()
			}

			this.$element.addEventListener('animationend', handler)
			this.$element.classList.add(className)

			this.$parent.$emitter.once('navigation', () => {
				this.$element.removeEventListener('animationend', handler)
				reject(new Error('Animation interruped'))
			}, this)
		})
	}

	animateIn () {
		return this.promiseTransition('is-animate-in')
	}

	animateOut () {
		return this.promiseTransition('is-animate-out')
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
			scroll: document.scrollingElement.scrollTop
		}

		history.replaceState(state, '', state.url)
	}

	request (url: string, timeout: number = 3e3) {
		return new Promise<XMLHttpRequest>((resolve, reject) => {
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
			return this.request(url).then(xhr => {
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

	async addContainers (item: Entry) {
		let doc = this.parser.parseFromString(item.markup, 'text/html')
		let title = doc.querySelector('head title')?.textContent
		let container = doc.querySelector('[ob-loader-container]')

		document.title = title

		this.$element.appendChild(container)

		return new Promise(resolve => {
			this.$emitter.once('add:container', () => {
				resolve()
			})
		})
	}

	showContainers () {
		return Promise.all(this.$container.map(container => {
			return container.animateIn()
		}))
	}

	hideContainers () {
		return Promise.all(this.$container.map(container => {
			return container.animateOut()
		}))
	}

	removeContainers () {
		this.$container.forEach(container => {
			let parent = container.$element.parentElement

			if (parent) {
				parent.removeChild(container.$element)
			}
		})
	}

	animationOut: Promise<any>

	transition () {
		let state = history.state as State
		let nextItem = null

		let promiseAnimation = this.hideContainers()
		let promiseFetch = this.fetch(state.url).then(item => {
			nextItem = item
		})

		this.animationOut = Promise.all([
			promiseAnimation,
			promiseFetch
		]).then(() => {
			this.removeContainers()
			return this.addContainers(nextItem)
		}).then(() => {
			if (typeof state.scroll === 'number') {
				scrollTo({
					target: document.scrollingElement,
					offset: state.scroll,
					duration: 900,
					easing: easeOutQuint
				})
			}

			return this.showContainers()
		}).catch(() => {
			this.removeContainers()
			return this.addContainers(nextItem)
		}).then(() => {
			this.animationOut = null
		})
	}

	handlePopState (event: PopStateEvent) {
		event.preventDefault()

		this.$emitter.emit('navigation')

		if (this.animationOut) {
			return this.animationOut.then(() => {
				return this.transition()
			})
		} else {
			return this.transition()
		}
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

	getScrollElement (href: string) {
		let fragment = href.split('#')?.[1]
		let element = document.scrollingElement

		if (fragment) {
			let fragmentElement = document.getElementById(fragment)

			if (fragmentElement) {
				element = fragmentElement
			}
		}

		return element
	}

	handleLink (link: HTMLAnchorElement) {
		let href = link.getAttribute('href')
		let animation = this.hideContainers()
		let element = this.getScrollElement(href)

		this.updateState()

		return this.fetch(href).then((item: Entry) => {
			return animation.then(() => {
				let state: State = {
					url: href,
					scroll: document.scrollingElement.scrollTop
				}

				history.pushState(state, '', href)

				this.removeContainers()

				return this.addContainers(item).then(() => {
					scrollTo({
						target: element,
						duration: 900,
						easing: easeOutQuint
					})
				})
			})
		})
	}

	destroy () {
		window.removeEventListener('popstate', this.popStateHandler)
		document.removeEventListener('click', this.clickHandler)
	}
}

export default Loader
