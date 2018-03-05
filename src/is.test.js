const {isArray, isFunction, isRegExp, isString} = require('./is')

describe('Library: is', () => {
  describe('isArray', () => {
    it('should be a function', () => {
      expect(isArray([1, 2, 3])).toBe(true)
    })

    it('should return false', () => {
      expect(isArray()).toBe(false)
    })
  })

  describe('isFunction', () => {
    it('should be a function', () => {
      expect(isFunction(function () {})).toBe(true)
    })

    it('should return false', () => {
      expect(isFunction()).toBe(false)
    })
  })

  describe('isRegExp', () => {
    it('should be a function', () => {
      expect(isRegExp(/abc/)).toBe(true)
    })

    it('should return false', () => {
      expect(isRegExp()).toBe(false)
    })
  })

  describe('isString', () => {
    it('should be a function', () => {
      expect(isString('Hello world.')).toBe(true)
    })

    it('should return false', () => {
      expect(isString()).toBe(false)
    })
  })
})
