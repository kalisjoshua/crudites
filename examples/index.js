const builder = require('../src')

module.exports = builder([
  './books'
].map(m => require(m)))
