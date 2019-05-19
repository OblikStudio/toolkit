import Module from '../../Module'
import drag from '../../../utils/drag'

function checkAnchor (element) {
  var value = false

  do {
    value = element.nodeName === 'A'
  } while (!value && (element = element.parentNode))

  return value
}

export default class extends Module {
  constructor (element, options, parent) {
    super('slider', parent)

    this.element = element
    this.slides = []

    this.currentSlideIndex = null
    this.currentSlide = null

    this.dragOrigin = null
    this.deltas = null
    this.totalDelta = null

    this.clickThreshold = 40
    this.isDraggingLink = null
    this.isDrag = null

    this.on('slide:add', function (module) {
      this.slides.push(module.element)
    })

    drag(this.element, {
      start: this.pointerDown.bind(this),
      move: this.pointerMove.bind(this),
      end: this.pointerUp.bind(this),
      retouch: (event) => {
        this.pointerDown(event)
        this.deltas.unshift({
          x: 0,
          y: 0
        })
      }
    })

    this.element.addEventListener('click', (event) => {
      if (this.isDraggingLink && this.isDrag) {
        // The user tried to drag, prevent redirection.
        event.preventDefault()
      }
    })

    // should happen on module init() event
    setTimeout(() => {
      this.setSlide(0)
    }, 0)
  }

  setSlide (index) {
    var slide = this.slides[index]
    if (slide) {
      this.currentSlideIndex = index
      this.currentSlide = slide
      this.origin = {
        x: -this.currentSlide.offsetLeft,
        y: -this.currentSlide.offsetTop
      }

      this.renderItems()
      return true
    }

    return false
  }

  move (direction) {
    return this.setSlide(this.currentSlideIndex + direction)
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

    // Don't prevent default for touchstart because if the slide is a link,
    // you can't follow it. The browser should automatically detect a drag and
    // prevent redirection.
    if (event.type !== 'touchstart') {
      event.preventDefault()
    }

    // Stop propagating so when nesting sliders, parent sliders don't move.
    event.stopPropagation()
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

  pointerMove (event) {
    this.updateDelta({
      x: event.pageX - this.dragOrigin.x,
      y: event.pageY - this.dragOrigin.y
    })

    if (!this.isDrag && Math.abs(this.totalDelta.x) > this.clickThreshold) {
      this.isDrag = true
    }

    this.renderItems()
  }

  pointerUp (event) {
    var direction
    var absoluteDelta
    var changeSlide

    if (this.totalDelta) {
      direction = Math.sign(this.totalDelta.x)
      absoluteDelta = Math.abs(this.totalDelta.x)
      changeSlide = absoluteDelta > (this.currentSlide.offsetWidth * 0.25)
    } else {
      // The element was just clicked, I.E. there was no move event.
    }

    this.dragOrigin = null
    this.updateDelta(null)

    this.element.classList.add('has-transition')

    if (changeSlide && this.move(direction * -1)) {
      return
    } else {
      this.renderItems()
    }
  }

  renderItems () {
    var itemsX = this.origin.x

    if (this.totalDelta) {
      itemsX += this.totalDelta.x
    }

    this.slides.forEach(slide => {
      slide.style.transform = `translateX(${ itemsX }px)`
    })
  }
}
