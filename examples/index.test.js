const lib = require('./index')

describe('Implementation', () => {
  it('should export a handler function', () => {
    expect(typeof lib.handler).toBe('function')
  })
})
