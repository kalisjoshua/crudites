const parsers = {
  number: val => !isNaN(parseFloat(val)) && isFinite(val) && Number(val),
  string: x => x
}

const rTemplate = /^\/?((?:(?:[^/{}]+?|\{[^}]+?\})\/?)+)$/
const rParam = /\{([^}]+?)\}/g
const toRegExp = (template) =>
  new RegExp(`^${template.replace(rParam, '([^\\/]+)')}$`)

function endpointFactory (template) {
  if (!rTemplate.test(template)) {
    throw new Error('URL parameters need to be formatted correctly.')
  }

  const invalidTypes = (template.match(/(?<=:)[^}]+?(?=\})/g) || [])
    .filter((t) => !(t in parsers))

  if (invalidTypes.length) {
    throw new Error(`Unsupported parameter types: [${invalidTypes.join()}]`)
  }

  return {
    match (uri) {
      if (template === uri) {
        return true
      }

      const found = uri.match(toRegExp(template))

      if (!found) {
        return false
      }

      return parse(template, found.slice(1))
    },
    template
  }
}

function parse (template, matches) {
  return template
    .match(rParam)
    .reduce((acc, param, index) => {
      const [name, type = 'string'] = param
        .replace(rParam, '$1')
        .split(':')

      return {
        ...acc,
        [name]: parsers[type](matches[index])
      }
    }, {})
}

module.exports = endpointFactory
