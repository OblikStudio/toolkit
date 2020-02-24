import { Component } from '../../../core'

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
		this.$element.innerHTML = `
			<blockquote class="twitter-tweet" data-lang="${ this.$options.lang }">
				<a href="${ this.$options.url }"></a>
			</blockquote>`

		if (!Tweet.injected) {
			Tweet.injected = true

			appendScript({
				src: 'https://platform.twitter.com/widgets.js'
			})
		}
	}
}
