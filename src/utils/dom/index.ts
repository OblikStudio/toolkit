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
 * Returns the first element in the parent tree that has an `<a>` tag, or the
 * input element itself.
 */
export function findAnchor (element: Element): HTMLAnchorElement {
	if (element.tagName === 'A') {
		return element as HTMLAnchorElement
	} else {
		return findAncestor(element, e => e.tagName === 'A') as HTMLAnchorElement
	}
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

/**
 * Uses the Selection API to put a string in the user's clipboard.
 */
export function copyToClipboard (input: string) {
	let selection = window.getSelection()
	let node = document.createTextNode(input)
	let range = document.createRange()

	selection.removeAllRanges()
	document.body.appendChild(node)
	range.selectNodeContents(node)
	selection.addRange(range)

	document.execCommand('copy')
	document.body.removeChild(node)
}

/**
 * Injects a `<script>` tag in the `<head>` and returns a Promise.
 */
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
