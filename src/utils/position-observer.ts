import { Emitter } from './emitter'
import { Poller } from './poller'

export class PositionObserver extends Emitter {
  _parent: PositionObserver
  _dependents: PositionObserver[] = []

  element: HTMLElement
  poller: Poller
  rect: ClientRect

  static instances = new Map<Element, PositionObserver>()

  static _attach (instance: PositionObserver, element: Element) {
    if (instance._parent) {
      this._detach(instance)
    }
    
    if (element) {
      let parent = this.instances.get(element)
      
      if (!parent) {
        parent = new PositionObserver(element)
        this.instances.set(element, parent)
      }

      instance._parent = parent
      parent.on('change', instance.updatePosition, instance)
      parent._dependents.push(instance)
    }
  }

  static _detach (instance: PositionObserver) {
    let parent = instance._parent
    let deps = parent._dependents
    let index = deps.indexOf(instance)

    if (index >= 0) {
      deps.splice(index, 1)
    }

    parent.purge(instance)
    instance._parent = null

    if (deps.length === 0) {
      this.instances.delete(parent.element)
      parent.destroy()
    }
  }

	constructor (element) {
    super()

    this.element = element
    this.poller = new Poller(this.element, [
      'offsetParent',
      'offsetTop',
      'offsetLeft',
      'offsetWidth',
      'offsetHeight'
    ])
    this.poller.on('change', this.change, this)
    this.rect = null
  }

  change (changes) {
		if (changes.offsetParent) {
      PositionObserver._attach(this, changes.offsetParent.newValue)
    }

    this.updatePosition()
	}

  updatePosition () {
    let x = this.poller.get('offsetLeft')
    let y = this.poller.get('offsetTop')
    let width = this.poller.get('offsetWidth')
    let height = this.poller.get('offsetHeight')

    if (this._parent) {
      let parentX = this._parent.poller.get('offsetLeft')
      let parentY = this._parent.poller.get('offsetTop')

      if (typeof parentX === 'number') {
        x += parentX
      }

      if (typeof parentY === 'number') {
        y += parentY
      }
    }

    this.rect = {
      width,
      height,
      top: y,
      right: x + width,
      bottom: y + height,
      left: x
    }

    this.emit('change', this.rect)
  }
  
	destroy () {
    if (this._parent) {
      PositionObserver._detach(this)
    }

    this.poller.destroy()
		super.destroy()
	}
}
