const isType = (type, q) => `[object ${type}]` === ({}).toString.call(q)

module.exports = {
  isArray: q => isType('Array', q),
  isFunction: q => isType('Function', q),
  isObject: q => isType('Object', q),
  isRegExp: q => isType('RegExp', q),
  isString: q => isType('String', q)
}
