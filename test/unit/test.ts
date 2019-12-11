import { easeInCubic } from '../../src/utils/easings'

describe('foo', () => {
  it('bar', () => {
    expect(easeInCubic(0.5)).to.equal(0.125)
  })
})
