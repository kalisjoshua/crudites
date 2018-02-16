const books = require("./books")

describe("/books", () => {
  it("should define a route", () => {
    expect(books.route).toBe("/books")
  })

  it("should define GET", () => {
    expect(books.GET).toBeTruthy()
  })

  it("should response with a promise for GET /books", (done) => {
    books.GET()
      .then(response => {
        expect(response.statusCode).toBe(204)
        done()
      })
  })
})
