import { Animation } from '../../utils/animation'
import { easeOutExpo } from '../../utils/easings'
import { getViewportOverflow, getViewportScroller } from '../../utils/overflow'

// https://www.w3.org/TR/uievents/#events-wheelevents
// - handle deltaMode (firefox uses different one)
// - check the spec for when scroll should affect the parent container

// wheel event not fired when you've scrolled iframe all the way, default
// scrolling takes place, and if an animation on the root is not yet
// finished, both it and the default behavior try to scroll and UX is
// glitchy

function findScroller (element, delta) {
	do {
		var isRoot = element === document.body || element === document.documentElement
		if (isRoot) {
			element = getViewportScroller()
		}

		var scrollTop = element.scrollTop
		var scrollHeight = element.scrollHeight
		var clientHeight = element.clientHeight

		if (isRoot) {
			// Edge uses <body> to scroll and it has an incorrect clientHeight. The
			// <html> clientHeight should be accurate both in and out of quirks mode
			// in all browsers.
			clientHeight = document.documentElement.clientHeight
		}

		var hasScroll = (scrollHeight !== clientHeight)
		if (hasScroll) {
			if (typeof delta === 'number') {
				if (
					(delta > 0 && scrollTop + clientHeight >= scrollHeight) ||
					(delta < 0 && scrollTop <= 0)
				) {
					if (isRoot) {
						break
					} else {
						continue
					}
				}
			}

			if (isRoot) {
				let overflow = getViewportOverflow()
				if (overflow.y !== 'auto') {
					continue
				}
			} else {
				let overflow = window.getComputedStyle(element).overflowY
				if (overflow && !overflow.match(/auto|scroll/)) {
					continue
				}
			}

			return element
		}

		if (isRoot) {
			// If the <body> is reached, skip iteration for <html>
			break
		}
	} while (element = element.parentElement)

	return null
}

window.addEventListener('wheel', (event) => {
	if (event.defaultPrevented) {
		// Another handler prevented scroll, we should honor that.
		return
	}

	var clamp = false
	var delta = event.deltaY
	var scroller = findScroller(event.target, delta)
	if (!scroller) {
		return
	}

	var animation = scroller.mbScrollAnim
	var isAnimationRunning = animation && animation.isRunning

	var value = scroller.scrollTop
	var newValue = scroller.scrollTop + delta

	if (isAnimationRunning) {
		var remaining = animation.values.scroll.end - animation.scroll
		var durationRemaining = animation.duration - animation.elapsed

		var samedir = Math.sign(delta) === Math.sign(animation.values.scroll.end - value)
		if (samedir) {
			newValue += remaining
		}
	}

	if (clamp) {
		if (newValue < 0) {
			newValue = 0
		} if (newValue + scroller.clientHeight > scroller.scrollHeight) {
			// in Edge, scroller is <body>, comparisons should be made to <html>
			newValue = scroller.scrollHeight - scroller.clientHeight
		}
	}

	if (!isAnimationRunning || (newValue !== animation.values.scroll.end)) {
		if (isAnimationRunning) {
			animation.stop()
		}

		animation = new Animation({
			duration: 600,
			easing: easeOutExpo,
			values: {
				scroll: {
					start: value,
					end: newValue
				}
			},
			update: function () {
				scroller.scrollTop = this.scroll
			}
		})

		animation.run()

		scroller.mbScrollAnim = animation
	}

	event.preventDefault()
}, {
	passive: false
})
