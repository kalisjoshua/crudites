const {isFunction, isRegExp, isString} = require('./is')

const methods = require('./methods')

function routesFactory () {
  const matchers = []
  const routes = {}

  function addRoute (path, method, fn) {
    // TODO: enable URL parameters - e.g. /books/1234
    if (!(isRegExp(path) || isString(path))) {
      throw new Error(`Path must be a String, or RegExp; ${typeof path} provided (${path}).`)
    }

    if (!method || !method.toUpperCase || !methods.includes(method.toUpperCase())) {
      throw new Error(`Invalid HTTP method: ${method}.`)
    }

    if (!isFunction(fn)) {
      throw new Error(`Route handlers must be a Function; ${typeof fn} provided (${fn}).`)
    }

    if (isString(path)) {
      routes[path] = routes[path] || {}
      routes[path][method.toUpperCase()] = fn
    } else {
      matchers.push([
        // matching function
        (_path, _method) => path.test(_path) && method === _method,

        // handler function
        fn
      ])
    }
  }

  function getRouteHandler (path, method) {
    let result

    try {
      result = routes[path][method]
    } catch (pathDoesNotMatchAnyRegisteredStringPathsError) {
      try {
        const foundHandler = matchers
          .filter(([m]) => m(path, method))[0][1]

        result = foundHandler
      } catch (noRegisteredMatchersMatchThePathError) {
        result = false
      }
    }

    return result
  }

  return {
    addRoute,
    getRouteHandler
  }
}

module.exports = routesFactory
