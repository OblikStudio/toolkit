import { findAncestor } from '../../utils/dom'
import { Component } from '../..'
import { Cache, Entry } from './cache'
import { scrollTo } from '../../utils/scroll'
import { easeOutQuint } from '../../utils/easings'
import { debounce } from '../../utils/functions'

interface State {
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
	animationOut: Promise<any>
	$container: Container

	protected names: string[]

	protected popStateHandler = this.handlePopState.bind(this)
	protected clickHandler = this.handleClick.bind(this)
	protected scrollHandler = debounce(() => {
		this.updateState()
	}, 100)

	create () {
		this.cache = new Cache()
		this.parser = new DOMParser()
		this.names = Object.keys(this.constructor.components)
	}

	init () {
		this.cache.set(window.location.href, {
			markup: document.documentElement.outerHTML
		})

		history.scrollRestoration = 'manual'
		window.addEventListener('popstate', this.popStateHandler)
		document.addEventListener('click', this.clickHandler)
		document.addEventListener('scroll', this.scrollHandler)
	}

	updateState () {
		let state: State = {
			scroll: document.scrollingElement.scrollTop
		}

		history.replaceState(state, '')
	}

	async fetch (url: string): Promise<Entry> {
		let entry = this.cache.get(url)

		if (!entry) {
			entry = this.cache.set(url, {
				markup: await fetch(url).then(response => response.text())
			})
		}

		return entry
	}

	addContainers (item: Entry) {
		let doc = this.parser.parseFromString(item.markup, 'text/html')
		document.title = doc.querySelector('head title')?.textContent

		let promises = this.names.map(name => {
			let container = doc.querySelector(`[ob-loader-${name}]`)
			this.$element.appendChild(container)
			return this.$emitter.promise(`add:${name}`)
		})

		return Promise.all(promises)
	}

	showContainers () {
		let animationPromises = this.names.map(name => {
			let comp = this['$' + name] as Container
			if (comp) {
				return this.interruptify(comp.animateIn())
			}
		})

		return Promise.all(animationPromises)
	}

	hideContainers () {
		let proms = this.names.map(name => {
			let comp = this['$' + name] as Container
			if (comp) {
				return this.interruptify(comp.animateOut())
			}
		})

		return Promise.all(proms)
	}

	removeContainers () {
		this.names.forEach(name => {
			let comp = this['$' + name] as Container
			if (comp) {
				let parent = comp.$element.parentElement

				if (parent) {
					parent.removeChild(comp.$element)
				}
			}
		})
	}

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

	async transition (state: State, url: string, push: boolean) {
		let item = null

		try {
			await Promise.all([
				this.hideContainers(),
				this.fetch(url).then(v => item = v)
			])

			this.removeContainers()
			await this.addContainers(item)

			if (push) {
				history.pushState(state, '', url)
			}

			let element = this.getFragmentElement(new URL(url))
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

			await this.showContainers()
		} catch (e) {
			this.removeContainers()

			if (item) {
				await this.addContainers(item)
				document.scrollingElement.scrollTop = state.scroll
			}
		}
	}

	async performTransition (state: State, url: string, push = false) {
		this.$emitter.emit('navigation')

		if (this.animationOut) {
			await this.animationOut
		}

		this.animationOut = this.transition(state, url, push)
	}

	handlePopState (event: PopStateEvent) {
		event.preventDefault()
		this.performTransition(history.state, window.location.href)
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
				this.performTransition({ scroll: 0 }, url.href, true)
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
