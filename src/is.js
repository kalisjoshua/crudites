const isType = (type, q) => `[object ${type}]` === ({}).toString.call(q);

module.exports = {
  isArray: q => isType('Array', q),
  isFunction: q => isType('Function', q),
  isString: q => isType('String', q),
};
