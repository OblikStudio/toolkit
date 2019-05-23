import EventEmitter from 'events'

export default class extends EventEmitter {
  constructor (element, value) {
    super()

    this.$element = element
    this.$value = value
  }
}
