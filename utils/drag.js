export default function (element, handlers) {
  var onStart = (typeof handlers.start === 'function' && handlers.start)
  var onMove = (typeof handlers.move === 'function' && handlers.move)
  var onEnd = (typeof handlers.end === 'function' && handlers.end)

  // on touchstart, save the touch id in a variable; call onEnd and onMove
  // only for that touch

  var touchMoveHandler = (event) => {
    onMove(event.changedTouches[0])
  }

  var upHandler = (event) => {
    document.removeEventListener('mouseup', upHandler)
    document.removeEventListener('touchend', upHandler)
    document.removeEventListener('touchcancel', upHandler)

    if (onEnd) {
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
        onStart(event.changedTouches[0])
      } else {
        onStart(event)
      }
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
