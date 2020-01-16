import { Emitter } from './emitter'
import { ticker } from './ticker'

export class Poller extends Emitter {
  target: object
  _props: string[]
  _initial: boolean
  _memo = {}

  constructor (target: object, props: string[], initial = false) {
    super()
    this.target = target
    this._props = props
    this._initial = initial

    ticker.on('measure', this._update, this)
  }

  _update () {
    let changes = {}
    let isChanged = false

    for (let prop of this._props) {
      let memo = this._memo[prop]
      let val = this.target[prop]

      if (val !== memo) {
        if (memo !== undefined || this._initial) {
          changes[prop] = val
          isChanged = true
        }

        this._memo[prop] = val
      }
    }

    if (isChanged) {
      this.emit('change', changes)
    }
  }

  destroy () {
    ticker.purge(this)
  }
}
