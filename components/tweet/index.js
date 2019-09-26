var _injected = false

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

export default function (element, options) {
	options = Object.assign({
		lang: 'en'
	}, options)

	element.innerHTML = `
	<blockquote class="twitter-tweet" data-lang="${ options.lang }">
		<a href="${ options.url }"></a>
	</blockquote>`

	if (!_injected) {
		appendScript({
			src: 'https://platform.twitter.com/widgets.js'
		}).then(() => {
			_injected = true
		})
	}
}
