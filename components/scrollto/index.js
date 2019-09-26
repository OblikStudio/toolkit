// todo:
// - when clicking on a link, the document fragment is not added to the address bar (due to preventDefault)
// - the cliecked element should be focused as per default behavior

import Component from '../component'
import Animation from '../../utils/animation'
import { offsetGlobal, getTag } from '../../utils/dom'
import { browser } from '../../utils/detect-browser'

const useBody = browser().match(/safari|edge/)

export function scroll (options) {
  if (!options.target) {
    throw new Error('No scroll target')
  }

  var scroller = useBody
    ? document.body
    : document.documentElement

  options = Object.assign({
    interruptible: true,
    duration: 650,
    values: {
      scroll: {
        start: scroller.scrollTop,
        end: offsetGlobal(options.target).top
      }
    },
    update: function () {
      scroller.scrollTop = this.scroll
    }
  }, options)

  var scrollAnimation = new Animation(options)

  if (options.interruptible) {
    var interruptHandler = function (event) {
      scrollAnimation.stop()
      window.removeEventListener('wheel', interruptHandler)
      window.removeEventListener('touchstart', interruptHandler)
    }

    window.addEventListener('wheel', interruptHandler)
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