function findOriginNode (element) {
	while (true) {
		if (
			element.parentElement &&
			element.parentElement !== document.body
		) {
			element = element.parentElement
		} else {
			return element
		}
	}
}

export default function (element) {
	var update = function () {
		element.style.height = element.firstElementChild.offsetHeight + 'px'
	}

	var observer = new MutationObserver(update)
	observer.observe(findOriginNode(element) || element, {
		attributes: true,
		childList: true,
		subtree: true
	})

	window.addEventListener('resize', update)
	window.addEventListener('load', update)
	update()
}
