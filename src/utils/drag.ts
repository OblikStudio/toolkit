import { TinyEmitter } from 'tiny-emitter'
import { Point, Vector } from './math'
import { ticker } from './ticker'

function isTouchEvent (event: Event): event is TouchEvent {
  return (event.type && event.type.indexOf('touch') === 0)
}

export class Drag extends TinyEmitter {
  element: HTMLElement
  activeTouch: Touch
  position: Point
  positionTick: Point
  movement: Vector
  startHandler: Drag['start']
  moveHandler: Drag['move']
  endHandler: Drag['end']
  tickHandler: Drag['tick']
  
  constructor (element) {
    super()
    this.element = element
    this.activeTouch = null
    this.position = null
    this.positionTick = null

    this.startHandler = this.start.bind(this)
    this.moveHandler = this.move.bind(this)
    this.endHandler = this.end.bind(this)
    this.tickHandler = this.tick.bind(this)

    this.element.addEventListener('mousedown', this.startHandler)
    this.element.addEventListener('touchstart', this.startHandler)
  }

  assignTouch (event) {
    var assigned = false

    if (this.activeTouch && event.changedTouches) {
      for (var touch of event.changedTouches) {
        if (touch.identifier === this.activeTouch.identifier) {
          for (var k in touch) {
            if (typeof event[k] === 'undefined') {
              event[k] = touch[k]
            }
          }

          assigned = true
        }
      }
    }

    return assigned
  }

  start (event: MouseEvent | TouchEvent) {
    if (isTouchEvent(event)) {
      var previousTouch = this.activeTouch

      this.activeTouch = event.changedTouches[0]
      this.assignTouch(event)

      if (previousTouch) {
        this.emit('retouch', event)
        return
      }
    }

    /**
     * Touch properties are assigned to the TouchEvent so clientX and clientY
     * are available, like a MouseEvent.
     * @todo let's not do that.
     */
    event = event as MouseEvent

    this.position = new Point(event.clientX, event.clientY)

    this.element.addEventListener('mousemove', this.moveHandler)
    this.element.addEventListener('touchmove', this.moveHandler)

    this.element.addEventListener('mouseup', this.endHandler)
    this.element.addEventListener('mouseleave', this.endHandler)
    this.element.addEventListener('touchend', this.endHandler)
    this.element.addEventListener('touchcancel', this.endHandler)
    ticker.on('tick', this.tickHandler)

    this.emit('start', event)
  }

  move (event) {
    if (event.type.indexOf('touch') === 0) {
      if (!this.assignTouch(event)) {
        return
      }
    }

    let clientPosition = new Point(event.clientX, event.clientY)
    let delta = new Vector(this.position, clientPosition)
    this.position = clientPosition

    this.emit('move', event, delta)
  }

  tick (delta) {
    if (this.positionTick) {
      this.movement = new Vector(this.positionTick, this.position)
      this.movement.magnitude *= 1000 / delta

      if (this.positionTick !== this.position) {
        this.emit('change', this.movement)
      }
    }

    this.positionTick = this.position
  }

  end (event) {
    if (event.type.indexOf('touch') === 0) {
      if (this.assignTouch(event)) {
        this.activeTouch = null
      } else {
        return
      }
    }
    
    this.element.removeEventListener('mouseup', this.endHandler)
    this.element.removeEventListener('mouseleave', this.endHandler)
    this.element.removeEventListener('touchend', this.endHandler)
    this.element.removeEventListener('touchcancel', this.endHandler)
    
    this.element.removeEventListener('mousemove', this.moveHandler)
    this.element.removeEventListener('touchmove', this.moveHandler)
    ticker.off('tick', this.tickHandler)
    
    this.emit('end', event)
  }
}
