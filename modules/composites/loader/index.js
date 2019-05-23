import Composite from '../../composite'
import { getAnchor } from '../../../utils/dom'

function transitionEnd (element) {
  return new Promise((resolve, reject) => {
    var pending = 0
    var end = (event) => {
      pending--

      if (pending <= 0) {
        resolve()
      }
    }

    element.addEventListener('transitionstart', (event) => {
      pending++
    })

    element.addEventListener('transitionend', end)
  })
}

export default class extends Composite {
  constructor () {
    super('loader', ...arguments)

    this.activeLink = null
    this.redirecting = false
    this.$animation = []

    window.addEventListener('click', (event) => {
      if (event.defaultPrevented) {
        // Some other script tried to prevent redirection. The loader should
        // honor that.
        return
      }

      var link = getAnchor(event.target)
      if (link && !this.redirecting) {
        event.stopImmediatePropagation()
        event.preventDefault()

        this.activeLink = link
        this.animateOut()
      }
    })
  }

  $init () {
    this.animateIn()
  }

  waitForAnimations () {
    if (this.$animation.length) {
      return Promise.all(this.$animation.map(module => {
        return transitionEnd(module.$element)
      }))
    } else {
      return Promise.resolve()
    }
  }

  animateIn () {
    window.requestAnimationFrame(() => {
      this.$element.classList.remove('is-animate-in')
    })
  }

  animateOut () {
    this.$element.classList.add('is-animate-out')
    this.waitForAnimations().then(() => {
      this.redirect()
    })
  }

  redirect () {
    this.redirecting = true
    this.activeLink.click()
  }
}
