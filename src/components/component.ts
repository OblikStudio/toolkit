import { Emitter } from '../utils'

type Input<O> = boolean | number | string | Partial<O> & { $preset?: string }
type ConfigFunction<O> = (component: Component, options: Input<O>) => Options<O>
type Config<O> = Partial<O> | ConfigFunction<O>
type Options<O> = Partial<O> & { $preset?: string, value?: any }

export interface ComponentConstructor<O> {
  new (element: HTMLElement, options?: Input<O>, parent?: Component): Component
  readonly $name?: string
  readonly $components?: {
    [key: string]: ComponentConstructor<any>
  }
  $defaults?: Config<O>
  $presets?: {
    [key: string]: Config<O>
  }
}

export interface Component {
  _init?: () => void
  _destroy?: () => void
  $init?: () => void
  $addComponent?: (component: Component) => void
  $removeComponent?: (component: Component) => void
  $destroy?: () => void
  constructor: ComponentConstructor<any>
}

export class OblikComponent<O = object> implements Component {
  ['constructor']: ComponentConstructor<O>

  _isInit = true
  _isDestroyed = false
  _children: Component[] = []

  $element: HTMLElement
  $options: Options<O>
  $parent: Component
  $emitter: Emitter
  
  constructor (element: HTMLElement, options?: Input<O>, parent?: Component) {
    this.$element = element
    this.$parent = parent
    this.$emitter = new Emitter()
    this.$options = this._resolveOptions(options)

    if (!this.constructor.$name && this.$parent) {
      throw new Error(`Child component missing name: ${ this.constructor.name }`)
    }

    this.$create()

    if (this.$parent && typeof this.$parent.$addComponent === 'function') {
      this.$parent.$addComponent(this)
    }
  }

  _init () {
    if (this._isInit) {
      this.$init()
      this._isInit = false
    }
  }

  _resolveConfig (config: Config<O>, input: Input<O>): Options<O> {
    if (typeof config === 'object' && config !== null) {
      return config
    } else if (typeof config === 'function') {
      return config(this, input)
    } else {
      return {}
    }
  }

  _resolveOptions (input: Input<O>): Options<O> {
    let preset = null
    let presets = this.constructor.$presets
    let defaults = this.constructor.$defaults

    let options = {} as Options<O>
    let defaultOptions = this._resolveConfig(defaults, input)
    let presetOptions = {}

    if (input && typeof input === 'object') {
      options = input
    }
    
    if (presets) {
      if (typeof input === 'string') {
        preset = presets[input]

        if (preset) {
          options.$preset = input
        } else {
          options.value = input
        }
      } else if (input && typeof input === 'object') {
        preset = presets[input.$preset]
      }
    }
    
    if (preset) {
      presetOptions = this._resolveConfig(preset, input)
    }

    return { ...defaultOptions, ...presetOptions, ...options }
  }

  _ref (component: Component, remove = false) {
    let prop = '$' + component.constructor.$name
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

  _destroy () {
    if (!this._isDestroyed) {
      this.$destroy()

      Array.from(this._children).forEach(child => {
        if (typeof child._destroy === 'function') {
          child._destroy()
        }
      })

      if (this.$parent && typeof this.$parent.$removeComponent === 'function') {
        this.$parent.$removeComponent(this)
      }

      this._isDestroyed = true
    }
  }

  $create () {}

  $init () {}

  $addComponent (component: Component) {
    if (this._children.indexOf(component) < 0) {
      this._children.push(component)
      this._ref(component)
      this.$emitter.emit(component.constructor.$name + ':added', component)
    }
  }

  $removeComponent (component: Component) {
    var index = this._children.indexOf(component)
    if (index >= 0) {
      this._children.splice(index, 1)
      this._ref(component, true)
      this.$emitter.emit(component.constructor.$name + ':removed', component)
    }
  }

  $destroy () {}
}

export default OblikComponent
