const routesFactory = require("./routes")

describe("routesFactory", () => {
  it("should be a function", () => {
    expect(routesFactory()).toBeTruthy()
  })

  it("should return a function to get all routes", () => {
    const {getRoutes} = routesFactory()

    expect(getRoutes()).toMatchObject({})
  })

  it("should return a function", () => {
    const {addRoute} = routesFactory()

    expect(typeof addRoute).toBe("function")
  })

  it("should allow adding routes", () => {
    const {addRoute, getRoutes} = routesFactory()

    const rand = Math.random().toString(36).slice(2)
    addRoute("/books", "GET", () => rand)

    const currentRoutes = getRoutes()

    expect(currentRoutes["/books"]["GET"]()).toBe(rand)
  })

  it("should throw an error for a path value of `undefined`", () => {
    const {addRoute} = routesFactory()

    expect(function () {
      addRoute()
    }).toThrow("Path must be a String; undefined provided (undefined).")
  })

  it("should throw an error for a path value of `1234`", () => {
    const {addRoute} = routesFactory()

    expect(function () {
      addRoute(1234)
    }).toThrow("Path must be a String; number provided (1234).")
  })

  it("should throw an error for a method value of `undefined`", () => {
    const {addRoute} = routesFactory()

    expect(function () {
      addRoute("/books")
    }).toThrow("Invalid HTTP method: undefined.")
  })

  it("should throw an error for a method value of `1234`", () => {
    const {addRoute} = routesFactory()

    expect(function () {
      addRoute("/books", 1234)
    }).toThrow("Invalid HTTP method: 1234.")
  })

  it("should throw an error for a method value of `teapot`", () => {
    const {addRoute} = routesFactory()

    expect(function () {
      addRoute("/books", "teapot")
    }).toThrow("Invalid HTTP method: teapot.")
  })

  it("should throw an error for a handler-function value of `undefined`", () => {
    const {addRoute} = routesFactory()

    expect(function () {
      addRoute("/books", "get")
    }).toThrow("Route handlers must be a Function; undefined provided (undefined).")
  })

  it("should throw an error for a handler-function value of `1234`", () => {
    const {addRoute} = routesFactory()

    expect(function () {
      addRoute("/books", "get", 1234)
    }).toThrow("Route handlers must be a Function; number provided (1234).")
  })
})
