/**
 * Returns the first parent element that matches the predicate.
 */
export function findAncestor (element: Element, predicate: (element: Element) => boolean): Element {
	while (element = element.parentElement) {
		if (predicate(element) === true) {
			return element
		}
	}

	return null
}

/**
 * Returns the page offset of an element according to the sum of its ancestors'
 * offsets.
 */
export function offsetGlobal (element: HTMLElement, reference = null) {
	let offset = { top: 0, left: 0 }

	do {
		offset.top += element.offsetTop
		offset.left += element.offsetLeft
		element = element.offsetParent as HTMLElement
	} while (element !== reference)

	return offset
}

/**
 * Calls getBoundingClientRect when the input is an Element and returns it. If
 * the input is Window, an object with a ClientRect shape is returned instead.
 */
export function getClientRect (input: Window | Element): ClientRect {
	if (input instanceof Element) {
		return input.getBoundingClientRect()
	} else if (input === window) {
		return {
			width: window.innerWidth,
			height: window.innerHeight,
			top: 0,
			right: window.innerWidth,
			bottom: window.innerHeight,
			left: 0
		}
	}
}

export function copy (text: string) {
	let selection = window.getSelection()
	let node = document.createTextNode(text)
	let range = document.createRange()

	selection.removeAllRanges()
	document.body.appendChild(node)
	range.selectNodeContents(node)
	selection.addRange(range)

	document.execCommand('copy')
	document.body.removeChild(node)

	return true
}

export function injectScript (src: string, async = true) {
	return new Promise<Event>((resolve, reject) => {
		let script = document.createElement('script')
		script.addEventListener('load', resolve)
		script.addEventListener('error', reject)
		script.type = 'text/javascript'
		script.async = async
		script.src = src

		document.head.appendChild(script)
	})
}
