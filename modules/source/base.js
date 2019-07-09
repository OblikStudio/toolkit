import Module from '../module'

const conditions = {}

class Source extends Module {
  constructor () {
    super(...arguments)

    var hasSet = false
    var defaultSource = this.$value && this.$value.default

    for (var k in this.$value) {
      if (k === 'default') {
        continue
      }

      if (conditions[k]) {
        if (typeof conditions[k] === 'function') {
          let result = conditions[k].call(this, this.$value[k])
          if (result === true) {
            this.setSource(this.$value[k])
            hasSet = true
          }
        } else {
          console.warn(`Condition ${ k } must be a function.`)
        }
      } else {
        console.warn(`Condition ${ k } not found.`)
      }
    }

    if (!hasSet && defaultSource) {
      this.setSource(defaultSource)
    }
  }

  setSource (url) {
    if (this.$element.tagName === 'IMG') {
      this.$element.setAttribute('src', url)
    } else {
      this.$element.style.backgroundImage = `url(${ url })`
    }
  }

  $destroy () {
    // So ongoing conditions can detach whatever they need.
    this.emit('destroy')
  }
}

export function register (values) {
  Object.assign(conditions, values)
}

export default Source
