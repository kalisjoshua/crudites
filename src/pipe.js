// A pipeline will call a series of functions pipe-ing output to input.
function pipe () {
  return [].slice.call(arguments)
    .reduce(function (acc, fn) {
      return fn(acc)
    })
}

module.exports = pipe
