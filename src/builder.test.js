const builder = require("./builder")

describe("builder", () => {
  it("should be a function", () => {
    expect(typeof builder).toBe("function")
  })

  it("should build an API", () => {
    const {api} = builder([
      {
        route: "/books",
        methods: [
          function GET() {

            return Promise.resolve({statusCode: 204})
          }
        ]
      }
    ])

    expect(api).toMatchObject({
      "/books": ["GET"]
    })
  })
})
