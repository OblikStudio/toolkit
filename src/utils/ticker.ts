import { TinyEmitter } from 'tiny-emitter'

export let ticker = new TinyEmitter()
let stamp = Date.now()

;(function handler () {
  let now = Date.now()
  let diff = now - stamp

  ticker.emit('tick', diff)
  stamp = now

  window.requestAnimationFrame(handler)
})()
