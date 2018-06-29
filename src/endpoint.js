const rParam = /^\{([^:}]+?)(?::(\w+?))?\}$/

const parsers = {
  number: val => !isNaN(parseFloat(val)) && isFinite(val),
  string: x => x
}

function endpointPatternFactory (pattern) {
  const parts = part(pattern)

  return {
    isMatch: (path) => matcher(parts, path),
    parts: () => parts,
    pattern
  }
}

function matcher (pattern, path) {
  const pathParts = path
    .split('/')
    .filter(x => x)

  return pattern
    .every((x, i) => x.isParam
      ? parsers[x.type](pathParts[i])
      : x === pathParts[i])
}

function parameter (str) {
  if (!rParam.test(str)) {
    throw new Error('URL parameters need to be formatted correctly.')
  }

  const [name, type = 'string'] = str
    .match(rParam)
    .slice(1)

  if (!(type in parsers)) {
    throw new Error(`Type "${type}" is not an available parameter type.`)
  }

  return new URLParameter(name, type)
}

function part (pattern) {
  return pattern
    .split('/')
    .filter(x => x)
    .map(sect => /^{/.test(sect) ? parameter(sect) : sect)
}

function URLParameter (name, type) {
  this.name = name.trim()
  this.type = type.trim()
}
URLParameter.prototype.isParam = true

module.exports = endpointPatternFactory
