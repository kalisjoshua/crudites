const {isFunction, isString} = require("./is");

const methods = require("./methods");

function routesFactory() {
  const routes = {};

  function addRoute(path, method, fn) {
    // TODO: enable regex paths
    // TODO: enable URL parameters - e.g. /books/1234
    if (!isString(path)) {
      throw new Error(`Path must be a String; ${typeof path} provided (${path}).`);
    }

    if (!method || !method.toUpperCase || !methods.includes(method.toUpperCase())) {
      throw new Error(`Invalid HTTP method: ${method}.`);
    }

    if (!isFunction(fn)) {
      throw new Error(`Route handlers must be a Function; ${typeof fn} provided (${fn}).`);
    }

    routes[path] = routes[path] || {};
    routes[path][method.toUpperCase()] = fn;
  }

  return {
    addRoute,
    getRoutes: () => routes
  };
}

module.exports = routesFactory;
