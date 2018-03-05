const lib = require('./index')

describe('GTTP-Lambda', () => {
  it('should be a builder function', () => {
    expect(lib.name).toBe('builder')
  })
})
