const books = require("./books")

describe("/books", () => {
  it("should define a route", () => {
    expect(books.route).toBe("/books")
  })

  it("should define GET", () => {
    const found = books.methods.map(i => i.name).includes("GET")

    expect(found).toBe(true)
  })

  it("should response with a promise for GET /books", (done) => {
    books.methods[0]()
      .then(response => {
        expect(response.statusCode).toBe(204)
        done()
      })
  })
})
