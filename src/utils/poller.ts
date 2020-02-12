import { Emitter } from './emitter'
import { ticker } from '../core'

type Change = {
  initial?: boolean,
  oldValue?: any,
  newValue: any
}

export class Poller<T = object> extends Emitter {
  _polls: number
  _props: string[]
  _memo = {}

  target: T

  constructor (target: T, props: string[]) {
    super()
    this.target = target
    this._props = props
    this._polls = 0

    ticker.on('measure', this._update, this)
  }

  _update () {
    let changes = {}
    let isChanged = false
    let isInitial = this._polls === 0

    for (let prop of this._props) {
      if (prop in this.target) {
        let memo = this._memo[prop]
        let value = this.target[prop]
        let change: Change

        if (prop in this._memo) {
          if (value !== memo) {
            change = {
              oldValue: memo,
              newValue: value
            }
          }
        } else {
          change = {
            initial: true,
            newValue: value
          }
        }

        if (change) {
          this._memo[prop] = change.newValue
          changes[prop] = change
          isChanged = true
        }
      }
    }

    if (isInitial) {
      this.emit('init', this._memo)
    }

    if (isChanged) {
      this.emit('change', changes, isInitial)
    }

    this._polls++
  }

  get (prop: string) {
    return this._memo[prop]
  }

  destroy () {
    ticker.purge(this)
  }
}
