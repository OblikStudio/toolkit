import Component from '../../component'

interface Conditions {
  [key: string]: (options: object) => boolean
}

interface SourceOptions {
  default: string
}

const conditions: Conditions = {}

class Source extends Component {
  $options: SourceOptions

  create () {
    var hasSet = false
    var defaultSource = this.$options && this.$options.default

    for (var k in this.$options) {
      if (k === 'default') {
        continue
      }

      if (conditions[k]) {
        if (typeof conditions[k] === 'function') {
          let result = conditions[k].call(this, this.$options[k])
          if (result === true) {
            this.setSource(this.$options[k])
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

  destroy () {
    // So ongoing conditions can detach whatever they need.
    this.$emitter.emit('destroy')
  }
}

export function register (values) {
  Object.assign(conditions, values)
}

export default Source
