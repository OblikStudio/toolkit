import { findAncestor } from '../../utils/dom'
import { easeOutQuint } from '../../utils/easings'
import { debounce } from '../../utils/functions'
import { scrollTo } from '../../utils/scroll'
import { Component } from '../..'
import { Cache } from './cache'

interface State {
	scroll: number
}

export class Container extends Component {
	promiseTransition () {
		return new Promise(resolve => {
			let handler = () => {
				this.$element.removeEventListener('animationend', handler)
				resolve()
			}

			this.$element.addEventListener('animationend', handler)
		})
	}

	animateIn () {
		this.$element.classList.add('is-animate-in')
		return this.promiseTransition()
	}

	animateOut () {
		this.$element.classList.add('is-animate-out')
		return this.promiseTransition()
	}
}

export class Loader extends Component {
	static components = {
		container: Container
	}

	static scrollDefaults () {
		return {
			duration: 900,
			easing: easeOutQuint
		}
	}

	cache: Cache
	parser: DOMParser
	promiseTransition: Promise<any>
	isIgnoreNextPop: boolean

	protected popStateHandler = this.handlePopState.bind(this)
	protected clickHandler = this.handleClick.bind(this)
	protected scrollHandler = this.handleScroll.bind(this)
	protected scrollUpdateDebounced = debounce(this.scrollUpdate.bind(this), 100)

	create () {
		this.cache = new Cache()
		this.parser = new DOMParser()
	}

	init () {
		window.addEventListener('popstate', this.popStateHandler)
		document.addEventListener('click', this.clickHandler)
		document.addEventListener('scroll', this.scrollHandler)

		history.scrollRestoration = 'manual'
	}

	changeState (state: State, url?: string) {
		if (url) {
			history.pushState(state, '', url)
		} else {
			history.replaceState(state, '')
		}
	}

	scroll (options: { target: Element, offset?: number }) {
		let defaults = (this.constructor as typeof Loader).scrollDefaults
		let config: Parameters<typeof scrollTo>[0] = Object.assign(defaults(), options)
		return scrollTo(config)
	}

	containers () {
		let result: Container[] = []

		for (let name in this.constructor.components) {
			let comp = this['$' + name] as Container
			if (comp) {
				result.push(comp)
			}
		}

		return result
	}

	addContainers (doc: Document) {
		let promises = this.containers().map(container => {
			let element = doc.querySelector(`[ob-loader-${container.$name}]`)
			let parent = container.$element.parentElement

			if (element && container) {
				parent.insertBefore(element, container.$element)
				return this.$emitter.promise(`add:${container.$name}`)
			}
		})

		return Promise.all(promises)
	}

	showContainers () {
		return Promise.all(
			this.containers().map(container => {
				return this.interruptify(container.animateIn())
			})
		)
	}

	hideContainers () {
		return Promise.all(
			this.containers().map(container => {
				return this.interruptify(container.animateOut())
			})
		)
	}

	removeContainers () {
		let containers = this.containers()

		this.$children.forEach(child => {
			if (containers.indexOf(child as Container) < 0) {
				child.$element.parentElement.removeChild(child.$element)
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
					reject(new Error('Interrupted'))
				}
			})
		})
	}

	async transition (state: State, url: string, push: boolean) {
		let markup: string = null

		try {
			await Promise.all([
				this.hideContainers(),
				this.cache.fetch(url).then(v => markup = v)
			])

			let doc = this.parser.parseFromString(markup, 'text/html')
			await this.addContainers(doc)
			this.removeContainers()

			if (push) {
				this.changeState(state, url)
				document.title = doc.querySelector('head title')?.textContent
			}

			let element = this.getFragmentElement(new URL(url))
			let options = {
				target: document.scrollingElement,
				offset: 0
			}

			if (element) {
				options.target = element
			} else if (typeof state.scroll === 'number') {
				options.offset = state.scroll
			}

			this.scroll(options)

			await this.showContainers()
		} catch (e) {
			if (markup) {
				let doc = this.parser.parseFromString(markup, 'text/html')
				await this.addContainers(doc)
				document.scrollingElement.scrollTop = state.scroll
			}

			this.removeContainers()
		}

		this.promiseTransition = null
	}

	async performTransition (state: State, url: string, push = false) {
		this.$emitter.emit('navigation')

		if (this.promiseTransition) {
			await this.promiseTransition
		}

		this.promiseTransition = this.transition(state, url, push)
	}

	handleNavigation (href: string, target?: string) {
		let url = new URL(href, window.location.href)
		let sameOrigin = (url.host === window.location.host)
		let samePath = (url.pathname === window.location.pathname)
		let shouldLink = (sameOrigin && target !== '_blank')
		let shouldScrollOnly = (shouldLink && samePath && url.hash)

		if (shouldLink) {
			if (shouldScrollOnly) {
				// When the hash is changed, a popstate event is fired. Ignore
				// it to avoid changing the page.
				this.isIgnoreNextPop = true

				this.scroll({
					target: this.getFragmentElement(url)
				})

				// Do not preventDefault() to fire the window hashchange event.
				return false
			} else {
				this.performTransition({ scroll: 0 }, url.href, true)

				return true
			}
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

				if (href && this.handleNavigation(href, target) === true) {
					event.preventDefault()
				}
			}
		}
	}

	handlePopState () {
		if (this.isIgnoreNextPop) {
			this.isIgnoreNextPop = false
			return
		}

		this.performTransition(history.state, window.location.href)
	}

	handleScroll () {
		if (!this.promiseTransition) {
			this.scrollUpdateDebounced()
		}
	}

	scrollUpdate () {
		this.changeState({
			...history.state,
			scroll: document.scrollingElement.scrollTop
		})
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
