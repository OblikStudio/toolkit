import { Emitter } from './emitter'
import { ticker } from './ticker'

export class Poller extends Emitter {
  target: object
  props: string[]
  memo = {}
  updateHandler: () => any

  constructor (target: object, props: string[]) {
    super()
    this.target = target
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
      let val = this.target[prop]

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
