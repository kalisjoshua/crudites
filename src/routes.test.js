const routesFactory = require('./routes')

const requestObject = (method, path) => ({method, uri: {path}})

describe('routesFactory', () => {
  describe('addRoute', () => {
    const {addRoute} = routesFactory()

    it('should be a function', () => {
      expect(typeof addRoute).toBe('function')
    })

    it('should throw an error for a path value of `undefined`', () => {
      expect(function () {
        addRoute()
      }).toThrow('Template must be a String; undefined provided (undefined).')
    })

    it('should throw an error for a path value of `1234`', () => {
      expect(function () {
        addRoute(1234)
      }).toThrow('Template must be a String; number provided (1234).')
    })

    it('should throw an error for non HTTP methods', () => {
      expect(function () {
        addRoute('/books')
      }).toThrow('Invalid HTTP method: undefined.')

      expect(function () {
        addRoute('/books', 'teapot')
      }).toThrow('Invalid HTTP method: teapot.')
    })

    it('should throw an error for a non-function handlers', () => {
      expect(function () {
        addRoute('/books', 'GET')
      }).toThrow('Route handlers must be a Function; undefined provided (undefined).')

      expect(function () {
        addRoute('/books', 'GET', 1234)
      }).toThrow('Route handlers must be a Function; number provided (1234).')
    })
  })

  describe('getRouteHandler', () => {
    const {addRoute, getRouteHandler} = routesFactory()

    it('should be a function', () => {
      expect(typeof getRouteHandler).toBe('function')
    })

    it('should return 404', () => {
      expect(() => {
        getRouteHandler(requestObject('GET', '/not-found'))
      }).toThrow('Not found.')
    })

    it('should return 405', () => {
      addRoute('/books', 'GET', () => 3427982374)

      expect(() => {
        getRouteHandler(requestObject('PATCH', '/books'))
      }).toThrow('Method not allowed.')
    })

    it('should return added route handler functions', () => {
      addRoute('/books', 'GET', () => 3427982374)

      expect(getRouteHandler(requestObject('GET', '/books'))).toBe(3427982374)
    })

    it('should execute route handlers with parameters', () => {
      const id = '4o3i5ho2i3mru09dqwuen39d0wmd'

      addRoute('/books/{id}', 'GET', ({uri}) => uri.parameters.id)

      expect(getRouteHandler(requestObject('GET', `/books/${id}`))).toBe(id)
    })

    it('should search through many routes', () => {
      const id = '4o3i5ho2i3mru09dqwuen39d0wmd'

      addRoute('/', 'GET', () => {})
      addRoute('/dogs', 'GET', () => {})
      addRoute('/dogs', 'POST', () => {})
      addRoute('/dogs/{id}', 'GET', ({uri}) => uri.parameters.id)
      addRoute('/dogs/{id}', 'DELETE', () => {})
      addRoute('/dogs/{id}', 'PATCH', () => {})
      addRoute('/dogs/{id}', 'PUT', () => {})

      expect(getRouteHandler(requestObject('GET', `/dogs/${id}`))).toBe(id)
    })

    it('should not return parameters for non-matching routes', () => {
      addRoute('/books/{id}', 'GET', () => {})
      addRoute('/dogs/{id}', 'GET', () => {})
      addRoute('/cats', 'GET', () => {})
      // addRoute('/cats/{id}', 'GET', ({uri}) => uri.parameters.id)

      expect(() => {
        getRouteHandler(requestObject('GET', `/cats/1234`))
      }).toThrow('Not found')
    })
  })
})
