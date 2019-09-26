import Module from '../module'
import { getTag } from '../../utils/dom'

export default class extends Module {
  constructor () {
    super(...arguments)
    
    this.$options = Object.assign({
      delay: 0,
      wait: 1000
    }, this.$options)

    this.activeLink = null
    this.animating = false
    this.redirecting = false

    window.addEventListener('click', (event) => {
      if (typeof event.button === 'number' && event.button !== 0) {
        // Only handle left button clicks. event.button on mobile is also `0`.
        return
      }

      if (event.defaultPrevented) {
        // Some other script tried to prevent redirection. The loader should
        // honor that.
        return
      }

      var link = getTag(event.target, 'A')
      if (link && !this.redirecting) {
        event.stopImmediatePropagation()
        event.preventDefault()

        this.activeLink = link
        this.animateOut()
      }
    })

    this.$element.classList.add('is-animate-in')
  }

  $init () {
    window.requestAnimationFrame(() => {
      if (this.$options.delay > 0) {
        setTimeout(() => {
          this.animateIn()
        }, this.$options.delay)
      } else {
        this.animateIn()
      }
    })
  }

  animateIn () {
    this.$element.classList.remove('is-animate-in')
  }

  animateOut () {
    if (this.animating) {
      return
    }

    this.$element.classList.add('is-animate-out')
    this.animating = true

    // Uses a timeout instead of tracking the end of all transitions due to:
    // https://stackoverflow.com/questions/56321027
    setTimeout(() => {
      this.redirect()
    }, this.$options.wait)
  }

  redirect () {
    this.redirecting = true
    this.activeLink.click()
  }
}
