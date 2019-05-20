function tryAssignTouch (event, identifier) {
  var assigned = false

  if (event.changedTouches) {
    for (var touch of event.changedTouches) {
      if (touch.identifier === identifier) {
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
  var onRetouch = (typeof handlers.retouch === 'function' && handlers.retouch)
  var onEnd = (typeof handlers.end === 'function' && handlers.end)
  var activeTouch = null

  var touchMoveHandler = (event) => {
    if (event.type.indexOf('touch') === 0) {
      if (!tryAssignTouch(event, activeTouch.identifier)) {
        return
      }
    }

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

    window.removeEventListener('mouseup', upHandler)
    window.removeEventListener('touchend', upHandler)
    window.removeEventListener('touchcancel', upHandler)

    if (onEnd) {
      onEnd(event)
    }

    if (onMove) {
      // If target is document instead of window, preventDefault() doesn't
      // stop vertical scroll on iOS Safari?
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', touchMoveHandler)
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

      onStart(event)
    }

    if (onMove) {
      window.addEventListener('mousemove', onMove)
      window.addEventListener('touchmove', touchMoveHandler, {
        passive: false
      })
    }

    window.addEventListener('mouseup', upHandler)
    window.addEventListener('touchend', upHandler)
    window.addEventListener('touchcancel', upHandler)
  }

  element.addEventListener('mousedown', downHandler)
  element.addEventListener('touchstart', downHandler, {
    passive: false
  })
}
