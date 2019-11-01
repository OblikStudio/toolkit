import { clamp } from './math'

export class FuzzyBoolean {
  _state: boolean
  _ratio: number

  constructor (value: boolean) {
    this.set(value)
  }

  set (value: boolean) {
    this._state = value

    if (this._state === true) {
      this._ratio = 1
    } else if (this._state === false) {
      this._ratio = 0
    }
  }

  change (amount: number) {
    this._ratio = clamp(this._ratio + amount, 0, 1)

    if (this._ratio === 1) {
      this._state = true
    } else if (this._ratio === 0) {
      this._state = false
    }
  }

  true (amount: number) {
    this.change(amount)
  }

  false (amount: number) {
    this.change(-amount)
  }

  value () {
    return this._state
  }
}
