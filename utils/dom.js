export function getTag (element, tagName) {
  var value = null

  do {
    value = element.nodeName === tagName
  } while (!value && (element = element.parentNode))

  if (value) {
    return element
  } else {
    return false
  }
}

export function offsetGlobal (element, referenceElement = null) {
  var offset = { top: 0, left: 0 }

  do {
    offset.top += element.offsetTop
    offset.left += element.offsetLeft
    element = element.offsetParent
  } while (element !== referenceElement)

  return offset
}

export function awaitAnimation (element) {
  return new Promise ((resolve, reject) => {
    var pendingEvents = []
    var hadTransitions = false
    var transitionrun = false
    var startHandler = function (event) {
      if (event.type === 'transitionrun') {
        transitionrun = true
      }

      if (transitionrun && event.type === 'transitionstart') {
        // Avoid incrementing the counter if transitionrun is supported.
        return
      }

      pendingEvents.push({
        animationName: event.animationName,
        propertyName: event.propertyName,
        target: event.target
      })

      hadTransitions = true
    }
    var endHandler = function (event) {
      var index = undefined

      for (var i = 0; i < pendingEvents.length; i++) {
        let obj = pendingEvents[i]
        let same = undefined

        for (var k in obj) {
          if (obj[k] === event[k]) {
            same = true
          } else {
            same = false
            break
          }
        }

        if (same === true) {
          index = i
          break
        }
      }

      if (index >= 0) {
        pendingEvents.splice(index, 1)
      }

      if (hadTransitions && pendingEvents.length === 0) {
        unbind()
        resolve(event)
      }
    }

    element.addEventListener('transitionrun', startHandler)
    element.addEventListener('transitionstart', startHandler)
    element.addEventListener('animationstart', startHandler)

    element.addEventListener('transitionend', endHandler)
    element.addEventListener('transitioncancel', endHandler)
    element.addEventListener('animationend', endHandler)
    element.addEventListener('animationcancel', endHandler)

    var unbind = function () {
      element.removeEventListener('transitionrun', startHandler)
      element.removeEventListener('transitionstart', startHandler)
      element.removeEventListener('animationstart', endHandler)

      element.removeEventListener('transitionend', endHandler)
      element.removeEventListener('transitioncancel', endHandler)
      element.removeEventListener('animationend', endHandler)
      element.removeEventListener('animationcancel', endHandler)
    }

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        if (pendingEvents.length === 0) {
          unbind()
          resolve(false)
        }
      })
    })
  })
}
