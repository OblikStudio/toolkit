import Composite from '../../Composite'

export default class extends Composite {
  constructor (element, options, parent) {
    super('slide', parent)
    this.element = element
  }
}
