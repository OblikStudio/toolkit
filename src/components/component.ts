import { Emitter } from '../utils'

type Input<O> = boolean | number | string | Partial<O> & { $preset?: string }
type ConfigFunction<O> = (component: Component<any>, options: Input<O>) => Options<O>
type Config<O> = Partial<O> | ConfigFunction<O>
type Options<O> = Partial<O> & { $preset?: string, value?: any }

export class Component<O> {
  ['constructor']: typeof Component

  static readonly $name: string
  static readonly $components: {
    [key: string]: typeof Component
  }

  static $defaults: Config<object>
  static $presets: {
    [key: string]: Config<object>
  }

  _isInit: boolean = true
  _isDestroyed: boolean = false
  _children: Component<any>[] = []

  $element: HTMLElement
  $options: Options<O>
  $parent: Component<any>
  $emitter: Emitter
  
  constructor (element: HTMLElement, options?: Input<O>, parent?: Component<any>) {
    this.$element = element
    this.$parent = parent
    this.$emitter = new Emitter()
    this.$options = this._options(options)

    if (!this.constructor.$name && this.$parent) {
      throw new Error(`Child component missing name: ${ this.constructor.name }`)
    }

    this.$create()

    if (this.$parent) {
      this.$parent.$addComponent(this)
    }
  }

  _init () {
    if (this._isInit) {
      this.$init()
      this._isInit = false
      console.log('init', this.constructor.$name)
    }
  }

  _destroy () {
    if (!this._isDestroyed) {
      Array.from(this._children).forEach(child => {
        child._destroy()
      })

      this.$destroy()

      if (this.$parent) {
        this.$parent.$removeComponent(this)
      }

      this._isDestroyed = true
      console.log('destroy', this.constructor.$name)
    }
  }

  _config (config: Config<O>, input: Input<O>): Options<O> {
    if (typeof config === 'object' && config !== null) {
      return config
    } else if (typeof config === 'function') {
      return config(this, input)
    } else {
      return {}
    }
  }

  _options (input: Input<O>): Options<O> {
    let preset = null
    let presets = this.constructor.$presets
    let defaults = this.constructor.$defaults

    let options = {} as Options<O>
    let defaultOptions = this._config(defaults, input)
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
      presetOptions = this._config(preset, input)
    }

    return { ...defaultOptions, ...presetOptions, ...options }
  }

  _update (parentComponent, childComponent, remove = false) {
    var key = '$' + childComponent.constructor.$name
    var value = parentComponent[key]
  
    if (Array.isArray(value)) {
      var index = value.indexOf(childComponent)
      var added = index >= 0
  
      if (remove) {
        if (added) {
          value.splice(index, 1)
        }
      } else if (!added) {
        value.push(childComponent)
      }
    } else {
      if (remove) {
        if (value === childComponent) {
          parentComponent[key] = null
        }
      } else {
        parentComponent[key] = childComponent
      }
    }
  }

  $create () {}

  $init () {}

  $addComponent (component: Component<any>) {
    if (this._children.indexOf(component) < 0) {
      this._children.push(component)
      this._update(this, component)
      this.$emitter.emit(this.constructor.$name + ':added', component)
    }
  }

  $removeComponent (component: Component<any>) {
    var index = this._children.indexOf(component)
    if (index >= 0) {
      this._children.splice(index, 1)
      this._update(this, component, true)
      this.$emitter.emit(this.constructor.$name + ':removed', component)
    }
  }

  $destroy () {}
}

export default Component
