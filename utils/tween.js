import { linear } from './easings'

export default class {
  constructor (callback, duration, easing) {
    this.callback = callback
    this.duration = duration
    this.easing = easing || linear

    this.elapsed = 0
    this.progress = 0
    this.value = 0

    this.stamp = Date.now()
    this.delta = 0

    this.isComplete = false
  }

  step () {
    var newStamp = Date.now()
    this.delta = newStamp - this.stamp
    this.elapsed += this.delta

    if (this.elapsed > this.duration) {
      this.elapsed = this.duration
    }

    this.progress = this.elapsed / this.duration
    this.value = this.easing(this.progress)
    this.callback(this.value)

    this.isComplete = this.elapsed < this.duration
    this.stamp = newStamp

    return this.isComplete
  }
}
