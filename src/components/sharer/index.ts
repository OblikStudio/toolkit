import { Component } from '../..'

interface Options {
	media: string
	url: string,
	text?: string,
	image?: string
}

export class Sharer extends Component<Element, Options> {
	static copy (text: string) {
		let selection = window.getSelection()
		let node = document.createTextNode(text)
		let range = document.createRange()

		selection.removeAllRanges()
		document.body.appendChild(node)
		range.selectNodeContents(node)
		selection.addRange(range)

		document.execCommand('copy')
		document.body.removeChild(node)
	}

	static getSharerUrl (data: Options) {
		let url = null
		let media = data.media

		if (media === 'twitter') {
			// https://developer.twitter.com/en/docs/twitter-for-websites/web-intents/overview
			url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(data.url)}`

			if (data.text) {
				url += `&text=${encodeURIComponent(data.text)}`
			}
		} else if (media === 'facebook') {
			// @see https://developers.facebook.com/docs/plugins/share-button
			url = `https://facebook.com/sharer.php?display=popup&u=${encodeURIComponent(data.url)}`
		} else if (media === 'linkedin') {
			// @see https://stackoverflow.com/a/33746543/3130281
			url = `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(data.url)}`
		} else if (media === 'pinterest') {
			// @see https://stackoverflow.com/a/11212220/3130281
			url = `http://pinterest.com/pin/create/button/?url=${encodeURIComponent(data.url)}`

			if (data.image) {
				url += `&media=${encodeURIComponent(data.image)}`
			}

			if (data.text) {
				url += `&description=${encodeURIComponent(data.text)}`
			}
		} else if (media === 'reddit') {
			// @see https://stackoverflow.com/a/24851347/3130281
			url = `http://www.reddit.com/submit?url=${encodeURIComponent(data.url)}`

			if (data.text) {
				url += `&title=${data.text}`
			}
		}

		return url
	}

	private _handleClick: () => void

	create () {
		this._handleClick = () => {
			if (this.$options.media === 'url') {
				this.copy()
			} else {
				let url = Sharer.getSharerUrl(this.$options as Options)
				if (url) {
					window.open(url, '_blank', 'width=800,height=600')
				}
			}
		}

		this.$element.addEventListener('click', this._handleClick)
	}

	copy () {
		Sharer.copy(this.$options.url)
	}

	destroy () {
		this.$element.removeEventListener('click', this._handleClick)
	}
}

export default Sharer
