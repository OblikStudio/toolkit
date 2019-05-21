import Composite from '../../Composite'
import Drag from '../../../utils/drag'

function checkAnchor (element) {
  var value = false

  do {
    value = element.nodeName === 'A'
  } while (!value && (element = element.parentNode))

  return value
}

export default class extends Composite {
  constructor (element, options, parent) {
    super('slider', ...arguments)

    this.$slide = []

    this.activeSlideIndex = null
    this.activeSlide = null
    this.currentSlide = null
    this.centerSlide = null

    this.dragOrigin = null
    this.deltas = null
    this.totalDelta = null

    this.clickThreshold = 40
    this.isDraggingLink = null
    this.isDrag = null

    this.drag = new Drag(this.element)
    this.drag.on('start', this.pointerDown.bind(this))
    this.drag.on('move', this.pointerMove.bind(this))
    this.drag.on('end', this.pointerUp.bind(this))
    this.drag.on('retouch', this.newDelta.bind(this))

    this.element.addEventListener('click', (event) => {
      if (this.isDraggingLink && this.isDrag) {
        // The user tried to drag, prevent redirection.
        event.preventDefault()
      }
    })
  }

  init () {
    this.setSlide(0)
  }

  setSlide (index) {
    var slide = this.$slide[index]
    if (slide) {
      this.activeSlideIndex = index
      this.setSlideState('activeSlide', slide, 'is-active')
      this.origin = {
        x: -this.activeSlide.element.offsetLeft,
        y: -this.activeSlide.element.offsetTop
      }

      this.renderItems()
      return true
    }

    return false
  }

  move (direction) {
    return this.setSlide(this.activeSlideIndex + direction)
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
    this.isDraggingLink = checkAnchor(event.target)
    this.element.classList.remove('has-transition')
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
      this[key].element.classList.remove(className)
    }

    if (slide) {
      slide.element.classList.add(className)
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

  updateCurrentSlide (center) {
    var direction = Math.sign(-this.totalDelta.x)
    var index = this.$slide.indexOf(this.currentSlide)
    var prevSlide = this.$slide[index - 1]
    var nextSlide = this.$slide[index + 1]

    if (direction === 1) {
      if (nextSlide && center > this.currentSlide.rect.thresholdRight) {
        this.setCurrentSlide(nextSlide)
      }

      if (prevSlide && center < prevSlide.rect.thresholdRight) {
        this.setCurrentSlide(prevSlide)
      }
    } else if (direction === -1) {
      if (prevSlide && center < this.currentSlide.rect.thresholdLeft) {
        this.setCurrentSlide(prevSlide)
      }

      if (nextSlide && center > nextSlide.rect.thresholdLeft) {
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

    if (!this.isDrag && Math.abs(this.totalDelta.x) > this.clickThreshold) {
      this.element.classList.add('is-dragged')
      this.isDrag = true
    }

    var elementRect = this.element.getBoundingClientRect()
    var elementCenter = elementRect.left + (elementRect.width / 2)

    this.$slide.forEach(slide => slide.update(elementCenter))

    this.updateCenterSlide(elementCenter)
    this.updateCurrentSlide(elementCenter)


    this.renderItems()
  }

  pointerUp (event) {
    this.dragOrigin = null
    this.updateDelta(null)

    this.element.classList.add('has-transition')
    this.element.classList.remove('is-dragged')

    if (this.currentSlide !== this.activeSlide) {
      this.setSlide(this.$slide.indexOf(this.currentSlide))
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

    this.$slide.forEach(slide => {
      slide.element.style.transform = `translateX(${ itemsX }px)`
    })
  }
}
