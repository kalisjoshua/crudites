const {GET} = require('./collection')

describe('/books', () => {
  it('should define GET', () => {
    expect(GET).toBeTruthy()
  })

  it('should response with a promise for GET /books', () => {
    return GET()
      .then(response => {
        expect(response.statusCode).toBe(204)
      })
  })
})
