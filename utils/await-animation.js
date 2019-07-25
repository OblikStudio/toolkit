/**
 * @todo add reject on timeout of X seconds
 * @todo repro animationstart is fired twice in IE11 when animation delay is 0
 * for some reason
 * @param {DOMElement} elem test
 */

export default function (elem) {
  var pending = []

  return new Promise((resolve, reject) => {
    var detach = function (success) {
      elem.removeEventListener('animationstart', start)
      elem.removeEventListener('animationend', end)

      if (success) {
        resolve()
      } else {
        reject(new Error('Animation interrupted'))
      }
    }

    var find = function (event) {
      return pending.find(entry => {
        return (
          entry.name === event.animationName &&
          entry.target === event.target
        )
      })
    }

    var start = function (event) {
      pending.forEach(elem => {
        if (elem.target === event.target) {
          detach(false)
        }
      })

      // Check if the entry already exists because IE11 emits animationstart twice
      // when the delay is 0.
      if (!find(event)) {
        pending.push({
          name: event.animationName,
          target: event.target
        })
      }
    }

    var end = function (event) {
      var entry = find(event)
      var index = pending.indexOf(entry)

      if (index >= 0) {
        pending.splice(index, 1)

        if (pending.length === 0) {
          detach(true)
        }
      }
    }

    elem.addEventListener('animationstart', start)
    elem.addEventListener('animationend', end)
  })
}
