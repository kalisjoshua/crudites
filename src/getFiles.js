const nodeJS = ['fs', 'path']
  .reduce((acc, lib) => { acc[lib] = require(lib); return acc }, {})

const isDir = (path) => nodeJS.fs.statSync(path).isDirectory()
const readDir = (path) => nodeJS.fs.readdirSync(path)

function getFilesRecursive (path) {
  function reducer (acc, p) {
    const route = nodeJS.path.resolve(nodeJS.path.join(path, p))

    if (isDir(route)) {
      acc.push(...getFilesRecursive(route))
    } else {
      acc.push({
        route,
        content: nodeJS.fs.readFileSync(route, 'utf-8')
      })
    }

    return acc
  }

  return readDir(path)
    .reduce(reducer, [])
}

module.exports = getFilesRecursive
