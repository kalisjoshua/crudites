module.exports = {
  route: '/books',
  GET () {
    return Promise.resolve({statusCode: 204})
  }
}
