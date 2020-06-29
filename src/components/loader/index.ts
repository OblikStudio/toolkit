import { findAncestor } from '../../utils/dom'
import { Component } from '../..'
import { Cache, Entry } from './cache'
import { scrollTo } from '../../utils/scroll'
import { easeOutQuint } from '../../utils/easings'
import { debounce } from '../../utils/functions'

interface State {
	url: string
	scroll: number
}

export class Container extends Component {
	promiseTransition (className: string) {
		return new Promise(resolve => {
			let handler = () => {
				this.$element.removeEventListener('animationend', handler)
				resolve()
			}

			this.$element.addEventListener('animationend', handler)
			this.$element.classList.add(className)
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

		let handle = debounce(() => {
			this.updateState()
		}, 100)

		document.addEventListener('scroll', handle)
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

	interruptify (action: Promise<any>) {
		return new Promise((resolve, reject) => {
			let ready = false

			action
				.then(() => {
					ready = true
					resolve()
				})
				.catch(reject)

			this.$emitter.once('navigation', () => {
				if (!ready) {
					reject()
				}
			})
		})
	}

	transition (state: State, push: boolean) {
		let item = null

		return Promise.all([
			this.interruptify(this.hideContainers()),
			this.fetch(state.url).then(v => item = v)
		])
			.then(() => {
				this.removeContainers()
				return this.addContainers(item)
					.then(() => {
						if (push) {
							history.pushState(state, '', state.url)
						}

						let element = this.getFragmentElement(new URL(state.url))
						let options = {
							target: document.scrollingElement,
							offset: 0,
							duration: 900,
							easing: easeOutQuint
						}

						if (element) {
							options.target = element
						} else if (typeof state.scroll === 'number') {
							options.offset = state.scroll
						}

						scrollTo(options)

						return this.interruptify(this.showContainers())
					})
			})
			.catch(() => {
				this.removeContainers()

				if (item) {
					return this.addContainers(item)
						.then(() => {
							document.scrollingElement.scrollTop = state.scroll
						})
				} else {
					return Promise.resolve()
				}
			})
			.finally(() => {
				this.animationOut = null
			})
	}

	performTransition (state: State, push = false) {
		this.$emitter.emit('navigation')

		if (this.animationOut) {
			return this.animationOut.then(() => {
				this.animationOut = this.transition(state, push)
			})
		} else {
			this.animationOut = this.transition(state, push)
		}
	}

	handlePopState (event: PopStateEvent) {
		event.preventDefault()
		this.performTransition(history.state)
	}

	handleNavigation (href: string, target?: string) {
		let url = new URL(href, window.location.href)
		let sameOrigin = (url.host === window.location.host)
		let samePath = (url.pathname === window.location.pathname)
		let shouldLink = (sameOrigin && target !== '_blank')
		let shouldScrollOnly = (shouldLink && samePath && url.hash)

		if (shouldLink) {
			if (shouldScrollOnly) {
				scrollTo({
					target: this.getFragmentElement(url),
					duration: 900,
					easing: easeOutQuint
				})

				history.replaceState(history.state, null, url.href)
			} else {
				this.performTransition({
					url: url.href,
					scroll: 0
				}, true)
			}

			return true
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
				let target = link.getAttribute('target')

				if (href && this.handleNavigation(href, target)) {
					event.preventDefault()
				}
			}
		}
	}

	getFragmentElement (url: URL) {
		if (url.hash) {
			return document.querySelector(url.hash)
		} else {
			return null
		}
	}

	destroy () {
		window.removeEventListener('popstate', this.popStateHandler)
		document.removeEventListener('click', this.clickHandler)
	}
}

export default Loader
