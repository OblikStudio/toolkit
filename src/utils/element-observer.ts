import { TinyEmitter } from 'tiny-emitter'
import { ticker } from './ticker'

export class ElementObserver extends TinyEmitter {
  element: Element
  props: string[]
  memo = {}
  updateHandler: () => any

  constructor (element: Element, props: string[]) {
    super()
    this.element = element
    this.props = props

    this.updateHandler = this.update.bind(this)
    this.updateHandler()

    ticker.on('tick', this.updateHandler)
  }

  update () {
    let changes = {}
    let isChanged = false

    for (let prop of this.props) {
      let memo = this.memo[prop]
      let val = this.element[prop]

      if (val !== memo) {
        if (memo !== undefined) {
          changes[prop] = val
          isChanged = true
        }

        this.memo[prop] = val
      }
    }

    if (isChanged) {
      this.emit('change', changes)
    }
  }

  destroy () {
    ticker.off('tick', this.updateHandler)
  }
}
