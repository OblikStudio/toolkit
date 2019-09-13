import Module from '../module'
import Drag from '../../utils/drag'
import { getTag } from '../../utils/dom'

export default class extends Module {
  constructor () {
    super(...arguments)

    this.$slide = []

    this.activeSlide = null
    this.currentSlide = null
    this.centerSlide = null

    this.dragOrigin = null
    this.deltas = null
    this.totalDelta = null

    this.rect = null
    this.clickThreshold = 40
    this.isDraggingLink = null
    this.isDrag = null

    this.drag = new Drag(this.$element)
    this.drag.on('start', this.pointerDown.bind(this))
    this.drag.on('move', this.pointerMove.bind(this))
    this.drag.on('end', this.pointerUp.bind(this))
    this.drag.on('retouch', this.newDelta.bind(this))

    this.$element.addEventListener('click', (event) => {
      if (this.isDraggingLink && this.isDrag) {
        // The user tried to drag, prevent redirection.
        event.preventDefault()
      }
    })
  }

  $init () {
    this.setSlide(0)
  }

  setSlide (slide) {
    var targetSlide = (typeof slide === 'number')
      ? this.$slide[slide]
      : slide

    if (targetSlide && targetSlide !== this.activeSlide) {
      this.setSlideState('activeSlide', targetSlide, 'is-active')
      this.origin = {
        x: -(this.activeSlide.$element.offsetLeft - this.$slide[0].$element.offsetLeft),
        y: -(this.activeSlide.$element.offsetTop - this.$slide[0].$element.offsetTop)
      }

      this.$emitter.emit('slideChange', this.activeSlide)

      this.renderItems()
      return true
    }

    return false
  }

  move (direction) {
    var index = this.$slide.indexOf(this.activeSlide)
    if (index >= 0) {
      return this.setSlide(index + direction)
    }

    return false
  }

  next () {
    return this.move(1)
  }

  previous () {
    return this.move(-1)
  }

  pointerDown (event) {
    this.dragOrigin = {
      x: event.pageX,
      y: event.pageY
    }

    this.isDrag = false
    this.isDraggingLink = !!getTag(event.target, 'A')
    this.$element.classList.add('is-dragged')
    this.setCurrentSlide(this.activeSlide)
    this.setCenterSlide(this.activeSlide)

    // Don't prevent default for touchstart because if the slide is a link,
    // you can't follow it. The browser should automatically detect a drag and
    // prevent redirection.
    if (event.type !== 'touchstart') {
      event.preventDefault()
    }

    // Stop propagating so when nesting sliders, parent sliders don't move.
    event.stopPropagation()
  }

  newDelta (event) {
    this.dragOrigin = {
      x: event.pageX,
      y: event.pageY
    }

    this.deltas = this.deltas || []
    this.deltas.unshift({
      x: 0,
      y: 0
    })
  }

  updateDelta (data) {
    if (!data) {
      this.deltas = data
      this.totalDelta = data
      return
    }

    if (!this.deltas) {
      this.deltas = []
    }

    this.deltas[0] = data
    this.totalDelta = this.deltas.reduce((acc, val) => {
      return {
        x: acc.x + val.x,
        y: acc.y + val.y
      }
    }, {
      x: 0,
      y: 0
    })
  }

  setSlideState (key, slide, className) {
    if (this[key]) {
      this[key].$element.classList.remove(className)
    }

    if (slide) {
      slide.$element.classList.add(className)
    }

    this[key] = slide
  }

  setCurrentSlide (slide) {
    this.setSlideState('currentSlide', slide, 'is-current')
  }

  setCenterSlide (slide) {
    this.setSlideState('centerSlide', slide, 'is-center')
  }

  updateCenterSlide () {
    var index = this.$slide.indexOf(this.centerSlide)
    var prevSlide = this.$slide[index - 1]
    var nextSlide = this.$slide[index + 1]

    if (nextSlide && nextSlide.rect.centerDiff < this.centerSlide.rect.centerDiff) {
      this.setCenterSlide(nextSlide)
    } else if (prevSlide && prevSlide.rect.centerDiff < this.centerSlide.rect.centerDiff) {
      this.setCenterSlide(prevSlide)
    }
  }

  updateCurrentSlide () {
    var direction = Math.sign(-this.totalDelta.x)
    var index = this.$slide.indexOf(this.currentSlide)
    var prevSlide = this.$slide[index - 1]
    var nextSlide = this.$slide[index + 1]

    if (direction === 1) {
      if (nextSlide && this.rect.centerX > this.currentSlide.rect.thresholdRight) {
        this.setCurrentSlide(nextSlide)
      }

      if (prevSlide && this.rect.centerX < prevSlide.rect.thresholdRight) {
        this.setCurrentSlide(prevSlide)
      }
    } else if (direction === -1) {
      if (prevSlide && this.rect.centerX < this.currentSlide.rect.thresholdLeft) {
        this.setCurrentSlide(prevSlide)
      }

      if (nextSlide && this.rect.centerX > nextSlide.rect.thresholdLeft) {
        this.setCurrentSlide(nextSlide)
      }
    }
  }

  pointerMove (event, direction) {
    var sine = Math.sin(direction)

    if (Math.abs(sine) < 0.8) {
      event.stopPropagation()

      if (event.cancelable) {
        event.preventDefault() // prevent scroll on mobile
      }
    } else {
      this.newDelta(event)
      return
    }

    this.updateDelta({
      x: event.pageX - this.dragOrigin.x,
      y: event.pageY - this.dragOrigin.y
    })

    if (!this.isDrag && Math.abs(this.totalDelta.x) >= this.clickThreshold) {
      this.isDrag = true
    }

    this.rect = this.$element.getBoundingClientRect()
    this.rect.centerX = this.rect.left + (this.rect.width / 2)

    this.$slide.forEach(slide => slide.update())
    this.updateCenterSlide()
    this.updateCurrentSlide()

    this.renderItems()
  }

  pointerUp (event) {
    this.dragOrigin = null
    this.updateDelta(null)

    this.$element.classList.remove('is-dragged')

    if (this.currentSlide !== this.activeSlide) {
      this.setSlide(this.currentSlide)
    } else {
      this.renderItems()
    }

    this.setCurrentSlide(null)
    this.setCenterSlide(null)
  }

  renderItems () {
    var itemsX = this.origin.x

    if (this.totalDelta) {
      itemsX += this.totalDelta.x
    }

    var leftOffset = this.$slide[0].$element.offsetLeft
    var rightOffset = this.$slide[this.$slide.length - 1].$element.offsetLeft
    var leftDiff = leftOffset - itemsX
    var rightDiff = rightOffset + itemsX

    var overdragSpan = this.$element.offsetWidth
    var overdragWidth = overdragSpan / 3
    var overdrag = null

    if (leftDiff < 0) {
      overdrag = leftDiff
    } else if (rightDiff < 0) {
      overdrag = rightDiff
    }

    if (overdrag) {
      let coef = Math.pow(Math.max(1 + overdrag / overdragSpan, 0), 3)
      let offset = (overdragWidth * (1 - coef))

      if (overdrag === leftDiff) {
        itemsX = leftOffset + offset
      } else {
        itemsX = -(rightOffset + offset)
      }
    }

    this.$slide.forEach(slide => {
      slide.$element.style.transform = `translateX(${ itemsX }px)`
    })
  }
}
