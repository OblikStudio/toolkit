import Animation from '../../utils/animation'
import { elastic as easeOutExpo } from '../../utils/easings'
import { browser } from '../../utils/detect-browser'
import { getViewportOverflow, getViewportScroller } from '../../utils/overflow'

// 1. get scroller element (<html> for chrome, <body> for edge)
// 2. determine viewport overflow (check viewport propagation)
// 3. get target scrolling element based on event.target

// - the <body> scrollHeight in Edge is incorrect - it includes the horizontal scrollbar
// - there's weird 1px difference between <html> scrollHeight and <body> scrollHeight

// https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#Determine_if_an_element_has_been_totally_scrolled
// The following equivalence returns true if an element is at the end of its scroll, false if it isn't.
// element.scrollHeight - element.scrollTop === element.clientHeight
// for Edge, this is the case:
// body.scrollHeight - body.scrollTop === html.clientHeight

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
      // add checks for overflow property
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

      return element
    }

    if (isRoot) {
      // If the <body> is reached, skip iteration for <html>
      break
    }
  } while (element = element.parentElement)

  return null
}

var anim
window.addEventListener('wheel', (event) => {
  var delta = Math.sign(event.deltaY) * 100
  var scroller = findScroller(event.target, delta)

  if (!scroller) return
  // console.log(scroller.tagName)

  var value = scroller.scrollTop
  var newValue = scroller.scrollTop + delta

  if (anim && anim.isRunning) {
    anim.stop()

    var remaining = anim.values.scroll.end - anim.scroll
    var durationRemaining = anim.duration - anim.elapsed

    var samedir = Math.sign(delta) === Math.sign(anim.values.scroll.end - value)
    if (samedir) {
      newValue += remaining
    }
  }

  var maxNewValue = newValue
  if (newValue < 0) {
    maxNewValue = 0
  } if (newValue + scroller.clientHeight > scroller.scrollHeight) {
    maxNewValue = scroller.scrollHeight - scroller.clientHeight
  }

  anim = new Animation({
    duration: 450,
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

  anim.run()
  event.preventDefault()
}, {
  passive: false
})
