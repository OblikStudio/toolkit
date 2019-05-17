import BaseModule from '../BaseModule'

export default class extends BaseModule {
  constructor (element, options, parent) {
    super('slide', parent)
    this.element = element
  }
}
