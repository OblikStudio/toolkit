export function getScrollingElement () {
	// https://drafts.csswg.org/cssom-view/#dom-document-scrollingelement
	// For non-conforming user agents that always use the quirks mode behavior
	// for scrollTop and scrollLeft, the scrollingElement attribute is expected
	// to also always return the HTML body element (or null if it does not
	// exist). This API exists so that Web developers can use it to get the
	// right element to use for scrolling APIs, without making assumptions about
	// a particular user agent’s behavior or having to invoke a scroll to see
	// which element scrolls the viewport.
	if (document.scrollingElement) {
		return document.scrollingElement
	}

	if (typeof document.compatMode === 'string') {
		// https://developer.mozilla.org/en-US/docs/Web/API/Document/compatMode
		// "BackCompat" if the document is in quirks mode.
		if (document.compatMode === 'BackCompat') {
			// https://developer.mozilla.org/en-US/docs/Mozilla/Mozilla_quirks_mode_behavior
			// The scrollLeft, scrollTop, scrollWidth, and scrollHeight properties are
			// relative to BODY in quirks mode (instead of HTML).
			return document.body
		} else {
			return document.documentElement
		}
	}

	// If execution reaches here, the browser is exremely old and we assume it
	// uses the non-spec value.
	return document.body
}

if (!('scrollingElement' in document as any)) {
	Object.defineProperty(document, 'scrollingElement', {
		value: getScrollingElement(),
		writable: false
	})
}
