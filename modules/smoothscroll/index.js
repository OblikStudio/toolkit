import Animation from '../../utils/animation'
import { elastic as easeOutExpo } from '../../utils/easings'
import { browser } from '../../utils/detect-browser'

function canBeScrolled (element, delta) {
  if (typeof delta === 'number') {
    if (
      (delta > 0 && element.scrollTop + element.clientHeight >= element.scrollHeight) ||
      (delta < 0 && element.scrollTop <= 0)
    ) {
      return false
    }
  }

  var style = window.getComputedStyle(element).overflowY
  if (element.offsetParent === null) {
    // <html> and <body> have no offsetParent and they can't be scrolled only
    // if their overflow is `hidden`; they can be scrolled when `visible`
    return style !== 'hidden'
  } else {
    return style === 'auto' || style === 'scroll'
  }
}

function findScroller (element, delta) {
  do {
    var hasScroll = (element.clientHeight < element.scrollHeight)
    if (hasScroll && canBeScrolled(element, delta)) {
      return element
    }
  } while (element = element.parentElement)

  return null
}

var anim
window.addEventListener('wheel', (event) => {
  var delta = Math.sign(event.deltaY) * 100
  var scroller = findScroller(event.target, delta)
  console.log(scroller, event.target)
  if (!scroller) return

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

  console.log(newValue, maxNewValue, value)

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
