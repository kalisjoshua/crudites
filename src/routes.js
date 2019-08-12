const endpoint = require('./endpoint')
const {isFunction, isString} = require('./is')
const methods = require('./methods')

class ClientError extends Error {
  constructor (statusCode, message) {
    super()

    this.message = message
    this.statusCode = statusCode
  }
}

function routesFactory () {
  const patterns = []
  const routes = {}

  function addRoute (template, method, fn) {
    if (!isString(template)) {
      throw new Error(`Template must be a String; ${typeof template} provided (${template}).`)
    }

    if (!method || !isString(method) || !methods.includes(method.toUpperCase())) {
      throw new Error(`Invalid HTTP method: ${method}.`)
    }

    if (!isFunction(fn)) {
      throw new Error(`Route handlers must be a Function; ${typeof fn} provided (${fn}).`)
    }

    routes[template] = routes[template] || {}
    routes[template][method.toUpperCase()] = fn

    if (/\{/.test(template)) {
      patterns.push({
        matcher: endpoint(template).match,
        route: routes[template]
      })
    }
  }

  function getRouteHandler (request, originalEvent) {
    const {method, uri: {path}} = request

    let found = routes[path]

    if (!found) {
      found = patterns
        .reduce((acc, {matcher, route}) => {
          if (acc) return acc

          const match = matcher(path)

          request.uri.parameters = match || {}

          return match && route
        }, false)
    }

    if (!found) {
      throw new ClientError(404, 'Not found.')
    } else if (!found[method]) {
      throw new ClientError(405, 'Method not allowed.')
    } else {
      return found[method](request, originalEvent)
    }
  }

  return {
    addRoute,
    getRouteHandler
  }
}

module.exports = routesFactory
