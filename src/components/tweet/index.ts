import { Component } from '../..'

function appendScript ({ src, async = true }) {
	return new Promise((resolve, reject) => {
		var script = document.createElement('script')
		script.type = 'text/javascript'
		script.async = async
		script.onload = resolve
		script.onerror = reject
		script.src = src
		document.getElementsByTagName('head')[0].appendChild(script)
	})
}

interface Options {
	url: string,
	lang?: string
}

export class Tweet extends Component<HTMLElement, Options> {
	static injected = ('twttr' in window)
	static defaults = {
		lang: 'en'
	}

	create () {
		// Twitter uses this class to look for tweets.
		this.$element.classList.add('twitter-tweet')
		this.$element.setAttribute('data-lang', this.$options.lang)

		// The tweet URL is inferred from this anchor element.
		this.$element.innerHTML = `<a href="${ this.$options.url }"></a>`

		if (!Tweet.injected) {
			Tweet.injected = true

			appendScript({
				src: 'https://platform.twitter.com/widgets.js'
			})
		}
	}
}

export default Tweet
