const {isArray, isFunction, isString} = require('./is');

describe("Library: is", () => {
  describe("isArray", () => {
    it("should be a function", () => {
      expect(isArray([1, 2, 3])).toBeTruthy()
    })

    it("should return false", () => {
      expect(isArray()).toBe(false)
    })
  })

  describe("isFunction", () => {
    it("should be a function", () => {
      expect(isFunction(function () {})).toBeTruthy()
    })

    it("should return false", () => {
      expect(isArray()).toBe(false)
    })
  })

  describe("isString", () => {
    it("should be a function", () => {
      expect(isString("Hello world.")).toBeTruthy()
    })

    it("should return false", () => {
      expect(isArray()).toBe(false)
    })
  })
})
