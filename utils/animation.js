import Tween from './tween'

export default class extends Tween {
  constructor (options) {
    super(options.update, options.duration, options.easing)
    this.isRunning = false
    this.isTicking = false
  }

  run () {
    if (this.isTicking) {
      // Avoid running multiple times and creating excess RAFs.
      return
    }

    if (!this.isRunning) {
      this.isRunning = true
      this.stamp = Date.now()
    }

    requestAnimationFrame(() => {
      this.isTicking = false

      if (this.isRunning && this.step()) {
        this.run()
      }
    })

    this.isTicking = true
  }

  stop () {
    this.isRunning = false
  }
}
