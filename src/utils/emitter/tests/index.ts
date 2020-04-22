import { Emitter } from '..'

describe('emitter', () => {
  it('emits', () => {
    let e = new Emitter()
    let fn = sinon.spy()

    e.on('test', fn)
    e.emit('test', 'foo')
    e.emit('test', 'foo', 'bar')
    
    expect(fn).calledWith('foo')
    expect(fn).calledWith('foo', 'bar')
    expect(fn).callCount(2)
  })

  it('emits few', () => {
    let e = new Emitter()
    let fn = sinon.spy()
    let fn2 = sinon.spy()

    e.once('test', fn)
    e.few(2, 'test', fn2)
    e.emit('test')
    e.emit('test')
    e.emit('test')

    expect(fn).callCount(1)
    expect(fn2).callCount(2)
    expect(e.listeners.test.length).equal(0)
  })

  it('turns off', () => {
    let e = new Emitter()
    let fn = sinon.spy()
    let fn2 = sinon.spy()

    e.on('test', fn)
    e.on('test', fn2)
    e.emit('test', 1)
    e.off('test', fn)
    e.emit('test', 2)
    e.off('test')
    e.emit('test', 3)

    expect(fn).calledOnceWith(1)
    expect(fn2).calledWith(2)
    expect(fn2).not.calledWith(3)
  })

  it('calls on context', () => {
    let e = new Emitter()
    let fn = sinon.spy()

    e.on('one', fn, 'a')
    e.on('one', fn, 'b')
    e.on('two', fn, 'b')
    e.emit('one')
    e.emit('two')
    e.purge('b')
    e.emit('one')
    e.emit('two')

    expect(fn).calledOn('a')
    expect(fn).calledOn('b')
    expect(fn).callCount(4)
  })

  it('does not call nested listeners immediately', () => {
    let e = new Emitter()
    let fn = sinon.spy()
    let fn2 = sinon.spy()

    e.on('test', () => {
      fn()

      e.on('test', fn2)
    })

    e.emit('test')
    expect(fn).callCount(1)
    expect(fn2).callCount(0)

    e.emit('test')
    expect(fn).callCount(2)
    expect(fn2).callCount(1)
  })
})
