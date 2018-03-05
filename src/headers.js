const parseHeaders = (str = '') => str
  .split(/\n/)
  .map(x => x.split(/\s*:\s*/))
  .reduce((a, [k, v]) => k && v
    ? {...a, [k.trim()]: v.trim()}
    : a, {})

module.exports = parseHeaders
