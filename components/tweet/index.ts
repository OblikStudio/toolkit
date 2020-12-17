import { injectScript } from '../../utils'
import { Component } from '../..'

interface Options {
	url: string,
	lang?: string
}

export class Tweet extends Component<HTMLElement, Options> {
	static injected = ('twttr' in window)

	static defaults: Partial<Options> = {
		lang: 'en'
	}

	init () {
		// Twitter uses this class to look for tweets.
		this.$element.classList.add('twitter-tweet')
		this.$element.setAttribute('data-lang', this.$options.lang)

		// The tweet URL is inferred from this anchor element.
		this.$element.innerHTML = `<a href="${this.$options.url}"></a>`

		this.load()
	}

	load () {
		let ctor = this.constructor as typeof Tweet

		if (!ctor.injected) {
			injectScript('https://platform.twitter.com/widgets.js')
			ctor.injected = true
		}
	}
}

export default Tweet
