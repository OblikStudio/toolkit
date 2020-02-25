import { findAncestor } from '../../../utils/dom'
import { Component } from '../../component'
import { Cache, Entry } from './cache'

interface State {
	url: string
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
	}

	handlePopState (event: PopStateEvent) {
		event.preventDefault()

		let state = history.state as State

		this.fetch(state.url).then((item) => {
			this.load(item)
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
					let target = link.getAttribute('target')
					let sameOrigin = (href.indexOf(window.location.host) > 0)

					if (sameOrigin && target !== '_blank') {
						event.preventDefault()
						this.handleLink(link)
					}
				}
			}
		}
	}

	handleLink (link: HTMLAnchorElement) {
		let href = link.getAttribute('href')

		this.fetch(href).then((item: Entry) => {
			let state: State = {
				url: href
			}

			history.pushState(state, '', href)
			this.load(item)
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

		let promises = this.$container.map(container => {
			return container.animateOut().then(() => {
				container.$element.parentElement.removeChild(container.$element)
			})
		})

		return Promise.all(promises).then(() => {
			this.$element.appendChild(container)

			return new Promise((resolve, reject) => {
				this.$emitter.once('add:container', (container: Container) => {
					container.animateIn().then(resolve).catch(reject)
				})
			})
		})
	}

	init () {
		let url = window.location.href
		let state: State = {
			url
		}

		this.cache.set(url, {
			markup: document.documentElement.outerHTML
		})

		history.replaceState(state, '', url)
	}

	request (url: string, timeout: number = 3e3) {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest()

			xhr.addEventListener('readystatechange', () => {
				if (xhr.readyState === XMLHttpRequest.DONE) {
					if (xhr.status === 200) {
						resolve(xhr)
					} else {
						reject(xhr)
					}
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

	destroy () {
		window.removeEventListener('popstate', this.popStateHandler)
		document.removeEventListener('click', this.clickHandler)
	}
}
