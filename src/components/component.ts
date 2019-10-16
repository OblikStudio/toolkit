import { TinyEmitter } from 'tiny-emitter'
import { isObject, defaultsDeep } from 'lodash-es'

type Input<O> = boolean | number | string | Partial<O> & { $preset?: string }
type Options<O> = Partial<O> & { $preset?: string, value?: any }

export interface ComponentConstructor<O = object> {
  new (element: HTMLElement, options?: Input<O>, parent?: Component): Component
  readonly $components?: {
    [key: string]: ComponentConstructor
  }
  $defaults?: Partial<O>
  $presets?: {
    [key: string]: Partial<O>
  }
  $options (input: Input<O>): Options<O>
}

export interface Component {
  constructor: ComponentConstructor
  _name?: string
  _init?: () => void
  _addChild?: (component: Component) => void
  _removeChild?: (component: Component) => void
  _destroy?: () => void
}

function name (child: ComponentConstructor, parent: ComponentConstructor) {
  let subcomponents = parent.$components
  if (subcomponents) {
    let names = Object.entries(subcomponents)
      .filter(entry => entry[1] === child)
      .map(tuple => tuple[0])

    if (names.length === 1) {
      return names[0]
    } else if (names.length < 1) {
      throw new Error(`${ parent.name } has no child: ${ child.name }`)
    } else if (names.length > 1) {
      throw new Error(`Child has multiple names: ${ names }`)
    }
  } else {
    throw new Error(`Parent has no children: ${ parent.name }`)
  }
}

export class OblikComponent<O = object> implements Component {
  ['constructor']: ComponentConstructor<O>
  
  _isInit = true
  _isDestroyed = false
  _name: string = null
  _children: Component[] = []
  
  $element: HTMLElement
  $options: Options<O>
  $parent: Component
  $emitter: TinyEmitter

  static $options (input: Input<object>): Options<object> {
    let self = this as ComponentConstructor
    let presets = self.$presets
    let defaults = self.$defaults

    let options = {} as Options<object>
    let preset = null
    let presetName: string = null

    if (typeof input === 'string') {
      presetName = input
    } else if (isObject(input)) {
      options = input
      presetName = input.$preset
    }

    if (presets && presetName) {
      preset = presets[presetName]
    }

    if (preset) {
      options.$preset = presetName
    } else if (typeof input === 'string') {
      options.value = input
    }

    return defaultsDeep(options, preset, defaults)
  }

  constructor (element: HTMLElement, options?: Input<O>, parent?: Component) {
    this.$element = element
    this.$options = this.constructor.$options(options)
    this.$parent = parent
    this.$emitter = new TinyEmitter()

    this.$create()

    if (this.$parent) {
      this._name = name(this.constructor, this.$parent.constructor)
      this.$parent._addChild(this)
    }
  }

  _init () {
    if (this._isInit) {
      this._children.forEach(child => child._init())

      this.$init()
      this._isInit = false
    }
  }

  _ref (component: Component, remove = false) {
    let prop = '$' + component._name
    let value = this[prop]
  
    if (Array.isArray(value)) {
      let index = value.indexOf(component)
      let added = index >= 0
  
      if (remove) {
        if (added) {
          value.splice(index, 1)
        }
      } else if (!added) {
        value.push(component)
      }
    } else {
      if (remove) {
        if (value === component) {
          this[prop] = null
        }
      } else {
        this[prop] = component
      }
    }
  }

  _addChild (component: Component) {
    if (this._children.indexOf(component) < 0) {
      this._children.push(component)
      this._ref(component)
      this.$emitter.emit('add:' + component._name, component)
    }
  }

  _removeChild (component: Component) {
    let index = this._children.indexOf(component)
    if (index >= 0) {
      this._children.splice(index, 1)
      this._ref(component, true)
      this.$emitter.emit('remove:' + component._name, component)
    }
  }

  _destroy () {
    if (!this._isDestroyed) {
      this.$destroy()

      Array.from(this._children).forEach(child => {
        if (typeof child._destroy === 'function') {
          child._destroy()
        }
      })

      if (this.$parent) {
        this.$parent._removeChild(this)
      }

      this._isDestroyed = true
    }
  }

  $create () {}
  $init () {}
  $destroy () {}
}

export default OblikComponent
