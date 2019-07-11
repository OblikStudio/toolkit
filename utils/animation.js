import Tween from './tween'

export default class extends Tween {
  constructor (options) {
    super(options.update, options.duration, options.easing)
    this.isRunning = false
    this.isTicking = false

    this.values = options.values
    this.update()
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

    if (this.elapsed < this.duration) {
      requestAnimationFrame(() => {
        this.isTicking = false
        this.step()
        
        if (this.isRunning && !this.isComplete) {
          this.run()
        }
      })

      this.isTicking = true
    } else {
      this.step()
    }
  }

  update () {
    for (let name in this.values) {
      let value = this.values[name]
      let diff = value.end - value.start

      this[name] = value.start + (diff * this.value)
    }

    super.update()
  }

  stop () {
    this.isRunning = false
  }
}
