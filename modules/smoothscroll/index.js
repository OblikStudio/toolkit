import Animation from '../../utils/animation'
import { easeOutExpo } from '../../utils/easings'

var anim
window.addEventListener('wheel', (event) => {
  var scroller = document.documentElement
  var value = scroller.scrollTop
  var newValue = scroller.scrollTop + event.deltaY
  event.preventDefault()

  if (anim && anim.isRunning) {
    anim.stop()

    var remaining = anim.values.scroll.end - anim.scroll
    var durationRemaining = anim.duration - anim.elapsed

    var samedir = Math.sign(event.deltaY) === Math.sign(anim.values.scroll.end - value)
    if (samedir) {
      newValue += remaining
    }
  }

  anim = new Animation({
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

  anim.run()
}, {
  passive: false
})
