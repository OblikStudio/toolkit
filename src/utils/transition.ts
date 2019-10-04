function nextFrame (callback) {
  /**
   * Double RAF needed due to IE11 and Firefox. A single one doesn't catch the
   * transition changes. Also used in Vue @see
   * https://github.com/vuejs/vue/blob/master/src/platforms/web/runtime/transition-util.js#L67
   */
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(callback)
  })
}

export function transition(element: HTMLElement, name: string) {
  let classStart = `${ name }-start`
  let classActive = `${ name }-active`
  let classEnd = `${ name }-end`  

  return new Promise((resolve, reject) => {
    let pending = []

    let finish = (error?: Error) => {
      element.removeEventListener('transitionstart', startHandler)
      element.removeEventListener('transitioncancel', endHandler)
      element.removeEventListener('transitionend', endHandler)

      element.classList.remove(classActive)
      element.classList.remove(classEnd)

      if (!error) {
        resolve()
      } else {
        reject(error)
      }
    }

    let startHandler = event => {
      if (
        event.target === element &&
        pending.indexOf(event.propertyName) < 0
      ) {
        pending.push(event.propertyName)
      }
    }

    let endHandler = event => {
      if (event.target === element) {
        let index = pending.indexOf(event.propertyName)
        if (index >= 0) {
          pending.splice(index, 1)
        }

        if (pending.length === 0) {
          finish()
        }
      }
    }

    // Remove the end class in case this transition is being reapplied and
    // transitioncancel didn't fire to remove the class.
    element.classList.remove(classEnd)

    // Cache any current transition style value and set it to `none` so there is
    // no transition applied and the start value can be set immediately.
    let transitionStyleCache = element.style.transition
    element.style.transition = 'none'

    element.addEventListener('transitionstart', startHandler)
    element.classList.add(classStart)

    // Wait for the start value to be applied.
    nextFrame(() => {
      element.addEventListener('transitioncancel', endHandler)
      element.addEventListener('transitionend', endHandler)

      element.style.transition = transitionStyleCache
      element.classList.remove(classStart)
      element.classList.add(classActive)
      element.classList.add(classEnd)

      // Wait for the transition to start.
      nextFrame(() => {
        if (pending.length === 0) {
          finish(new Error('No transitions started'))
        }
      })
    })
  })
}
