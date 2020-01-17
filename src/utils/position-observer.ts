import { Emitter } from './emitter'
import { Poller } from './poller'
import { Point } from './math'

export class PositionObserver extends Emitter {
  _parent: PositionObserver
  _dependents: PositionObserver[] = []

  element: HTMLElement
  poller: Poller
  position: Point

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
    this.poller = new Poller(this.element, ['offsetTop', 'offsetLeft', 'offsetParent'])
    this.poller.on('change', this.change, this)
    this.position = null
  }

  change (changes) {
		if (changes.offsetParent) {
      PositionObserver._attach(this, changes.offsetParent.newValue)
    }

    if (changes.offsetTop || changes.offsetLeft) {
      this.updatePosition()
    }
	}

  updatePosition () {
    let x = this.poller.get('offsetLeft')
    let y = this.poller.get('offsetTop')

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

    this.position = new Point(x, y)
    this.emit('change', this.position)
  }
  
	destroy () {
    if (this._parent) {
      PositionObserver._detach(this)
    }

    this.poller.destroy()
		super.destroy()
	}
}
