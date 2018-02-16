const parseHeaders = require("./headers")

describe("parseHeaders", () => {
  it("should be a function", () => {
    expect(typeof parseHeaders).toBe("function")
  })

  it("should return and object", () => {
    expect(parseHeaders("\nclient_id: 1234")).toMatchObject({client_id: "1234"})
  })

  it("should return an empty object", () => {
    expect(parseHeaders("")).toMatchObject({})
  })

  it("should parse many headers", () => {
    const input = `
    client_id: 1234
    Authorization: user@password
    Content-type: application/json
    `

    const output = {
      Authorization: "user@password",
      client_id: "1234",
      "Content-type": "application/json"
    }

    expect(parseHeaders(input)).toMatchObject(output)
  })
})
