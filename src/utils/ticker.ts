import { Emitter } from './emitter'

export class Ticker extends Emitter {
  _isTicking: boolean
  _stamp: number
  _tickHandler: Ticker['_tick']

  constructor () {
    super()

    this._isTicking = false
    this._stamp = null
    this._tickHandler = this._tick.bind(this)
  }

  _run () {
    window.requestAnimationFrame(this._tickHandler)
  }

  _tick () {
    if (!this._isTicking) {
      return
    }

    let now = Date.now()
    let diff = now - this._stamp
  
    this.emit('measure')
    this.emit('mutate')
    this.emit('tick', diff)

    this._stamp = now
    this._run()
  }

  start () {
    this._isTicking = true
    this._stamp = Date.now()
    this._run()
  }

  stop () {
    this._isTicking = false
  }
}

export let ticker = new Ticker()

export function measure (callback: () => any, context?: any) {
  ticker.once('measure', callback, context)
}

export function mutate (callback: () => any, context?: any) {
  ticker.once('mutate', callback, context)
}

ticker.start()
