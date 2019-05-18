function tryAssignTouch (event, touchId) {
  var assigned = false

  if (event.changedTouches) {
    for (var touch of event.changedTouches) {
      if (touch.identifier === touchId) {
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

export default function (element, handlers) {
  var onStart = (typeof handlers.start === 'function' && handlers.start)
  var onMove = (typeof handlers.move === 'function' && handlers.move)
  var onEnd = (typeof handlers.end === 'function' && handlers.end)
  var onRetouch = (typeof handlers.retouch === 'function' && handlers.retouch)
  var activeTouch = null

  // on touchstart, save the touch id in a variable; call onEnd and onMove
  // only for that touch

  var touchMoveHandler = (event) => {
    if (event.type.indexOf('touch') === 0) {
      if (!tryAssignTouch(event, activeTouch.identifier)) {
        return
      }
    }

    console.log('move', event.identifier)
    onMove(event)
  }

  var upHandler = (event) => {
    if (event.type.indexOf('touch') === 0) {
      if (tryAssignTouch(event, activeTouch.identifier)) {
        activeTouch = null
      } else {
        return
      }
    }

    document.removeEventListener('mouseup', upHandler)
    document.removeEventListener('touchend', upHandler)
    document.removeEventListener('touchcancel', upHandler)

    if (onEnd) {
      console.log('end', event.identifier)
      onEnd(event)
    }

    if (onMove) {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('touchmove', touchMoveHandler)
    }
  }

  var downHandler = (event) => {
    if (onStart) {
      if (event.type === 'touchstart') {
        var previousTouch = activeTouch
        activeTouch = event.changedTouches[0]
        tryAssignTouch(event, activeTouch.identifier)

        if (previousTouch) {
          if (onRetouch) {
            onRetouch(event)
          }

          return
        }
      }

      console.log('start', event.identifier)
      onStart(event)
    }

    if (onMove) {
      document.addEventListener('mousemove', onMove)
      document.addEventListener('touchmove', touchMoveHandler)
    }

    document.addEventListener('mouseup', upHandler)
    document.addEventListener('touchend', upHandler)
    document.addEventListener('touchcancel', upHandler)
  }

  element.addEventListener('mousedown', downHandler)
  element.addEventListener('touchstart', downHandler)
}
