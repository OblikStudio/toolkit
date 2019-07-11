// todo:
// - on Edge, and mobile Safari, scroll starts from the top of the page
// - when clicking on a link, the document fragment is not added to the address bar (due to preventDefault)

import Module from '../module'
import Animation from '../../utils/animation'
import { offsetGlobal, getTag } from '../../utils/dom'

export function scroll (options) {
  if (!options.target) {
    throw new Error('No scroll target')
  }

  options = Object.assign({
    interruptible: true,
    duration: 650,
    values: {
      scroll: {
        start: document.documentElement.scrollTop,
        end: offsetGlobal(options.target).top
      }
    },
    update: function () {
      document.body.scrollTop = this.scroll // for Edge
      document.documentElement.scrollTop = this.scroll
    }
  }, options)

  var scrollAnimation = new Animation(options)

  if (options.interruptible) {
    var interruptHandler = function (event) {
      scrollAnimation.stop()
      window.removeEventListener('mousewheel', interruptHandler)
      window.removeEventListener('touchstart', interruptHandler)
    }

    window.addEventListener('mousewheel', interruptHandler)
    window.addEventListener('touchstart', interruptHandler)
  } 

  scrollAnimation.run()
}

export function monitorLinks (options) {
  options = Object.assign({
    duration: 650
  }, options)

  window.addEventListener('click', (event) => {
    var link = getTag(event.target, 'A')

    if (link) {
      var href = link.getAttribute('href')

      if (typeof href === 'string' && href[0] === '#') {
        var target = document.querySelector(href)

        if (target) {
          scroll({
            ...options,
            target
          })

          event.preventDefault()
        }
      }
    }
  })
}

const _easings = {}

export function easings (values) {
  Object.assign(_easings, values)
}

export default class {
  constructor (element, options) {
    this.element = element
    this.options = Object.assign({
      duration: 650,
      event: 'click'
    }, options)

    if (!this.options.target) {
      throw new Error('No scroll target specified')
    }

    this.target = document.querySelector(this.options.target)
    this.handler = (event) => {
      scroll({
        duration: this.options.duration,
        easing: _easings[this.options.easing],
        target: this.target
      })
    }

    this.element.addEventListener(this.options.event, this.handler)
  }

  $destroy () {
    this.element.removeEventListener(this.options.event, this.handler)
  }
}