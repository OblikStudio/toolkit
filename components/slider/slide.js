import Component from '../component'

export default class extends Component {
  constructor () {
    super(...arguments)

    this.box = null
  }

  update () {
    var parentCenter = this.$parent.rect.centerX
    var threshold = this.$element.offsetWidth * 0.15

    this.rect = this.$element.getBoundingClientRect()
    this.rect.centerX = this.rect.left + (this.rect.width / 2)
    this.rect.centerDiff = Math.abs(parentCenter - this.rect.centerX)
    this.rect.thresholdLeft = this.rect.centerX - threshold
    this.rect.thresholdRight = this.rect.centerX + threshold
  }
}
