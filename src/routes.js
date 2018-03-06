const {isFunction, isString} = require('./is')

const methods = require('./methods')

function routesFactory () {
  const routes = {}

  function addRoute (path, method, fn) {
    // TODO: enable URL parameters - e.g. /books/1234
    if (!isString(path)) {
      throw new Error(`Path must be a String; ${typeof path} provided (${path}).`)
    }

    if (!method || !isString(method) || !methods.includes(method.toUpperCase())) {
      throw new Error(`Invalid HTTP method: ${method}.`)
    }

    if (!isFunction(fn)) {
      throw new Error(`Route handlers must be a Function; ${typeof fn} provided (${fn}).`)
    }

    routes[path] = routes[path] || {}
    routes[path][method.toUpperCase()] = fn
  }

  function getRouteHandler (path, method) {
    let result

    try {
      result = routes[path][method]
    } catch (pathDoesNotMatchAnyRegisteredStringPathsError) {
      result = false
    }

    return result
  }

  return {
    addRoute,
    getRouteHandler
  }
}

module.exports = routesFactory
