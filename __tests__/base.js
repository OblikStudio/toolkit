import * as minibits from '../index'

global.MutationObserver = require('mutation-observer')

minibits.init()

test('html works', () => {
  document.body.innerHTML = `<div id="bar">foo</div>`
  expect(document.getElementById('bar')).not.toBe(null)
})
