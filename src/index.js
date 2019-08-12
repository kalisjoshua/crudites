const path = require('path')

const getFiles = require('./getFiles')
const {addRoute, handler} = require('./handler')

let rParts

const routesReduce = (resource) => {
  const [, routeRoot, type] = resource.route.match(rParts) || []

  if (/collection|item/.test(type)) {
    const methods = parse(resource.content)
    const route = type === 'item'
      ? `${routeRoot}{id}`
      : routeRoot

    Object.keys(methods)
      .forEach((method) => addRoute(route, method, methods[method]))
  }
}

function crudites (relPath, root = process.cwd()) {
  const resourcesRoot = path.join(root, relPath)

  rParts = new RegExp(`^${resourcesRoot}/(.*)(collection|item)\\.js$`)

  getFiles(resourcesRoot)
    .forEach(routesReduce, {})

  return handler
}

function parse (src) {
  // eslint-disable-next-line no-new-func
  return new Function(`
    const module = {}

    ${src}

    return module.exports
  `)()
}

module.exports = crudites
