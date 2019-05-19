import Module from '../../Module'

export default class extends Module {
  constructor (element, options, parent) {
    super('slide', parent)
    this.element = element
  }
}
