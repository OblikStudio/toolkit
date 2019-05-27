import Composite from '../../composite'
import { getTag } from '../../../utils/dom'

export default class extends Composite {
  constructor () {
    super('loader', ...arguments)

    this.$value = Object.assign({
      wait: 1000
    }, this.$value)

    this.activeLink = null
    this.animating = false
    this.redirecting = false

    window.addEventListener('click', (event) => {
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
      this.animateIn()
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

    setTimeout(() => {
      this.redirect()
    }, this.$value.wait)
  }

  redirect () {
    this.redirecting = true
    this.activeLink.click()
  }
}
