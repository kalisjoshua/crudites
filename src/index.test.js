const getFilesMock = require('./getFiles')
const lib = require('./index')

jest.mock('./getFiles')

const PROJECT_ROOT = '/Users/username/dir/project/folder'

const collection = `
  module.exports = {
    GET () {
      return Promise.resolve({
        body: JSON.stringify([1, 2, 3]),
        statusCode: 200
      })
    }
  }
`

const item = `
  module

      // intentionally malformed code

      .exports = {
          GET (request, event) {
            return Promise.resolve({body: request})
          }
      }
`

const synch = `
  module.exports = {
    GET () {return {body: 'not async', statusCode: 200}}
  }
`

getFilesMock.mockImplementation(() => ([
  {route: `${PROJECT_ROOT}/resources/books/collection.js`, content: collection},
  {route: `${PROJECT_ROOT}/resources/books/collection.test.js`, content: '// some testing code'},
  {route: `${PROJECT_ROOT}/resources/books/item.js`, content: item},
  {route: `${PROJECT_ROOT}/resources/books/README.md`, content: '# About Resources'},
  {route: `${PROJECT_ROOT}/resources/synchronous/collection.js`, content: synch},
  {route: `${PROJECT_ROOT}/resources/garbage.txt`, content: 'Just some text.'},
]))

describe('cruditès', () => {
  const api = lib('./resources', PROJECT_ROOT)

  it('should be a function', () => {
    expect(typeof api).toBe('function')
  })

  it('should handle async collection request for books/', () => {
    const ev = {
      httpMethod: 'GET',
      path: 'books/'
    }

    return api(ev, {}, (error, {body, statusCode}) => {
      expect(error).toBeNull()

      expect(body).toBe(JSON.stringify([1, 2, 3]))
      expect(statusCode).toBe(200)
    })
  })

  it('should handle sync collection request for synchronous/', (done) => {
    const ev = {
      httpMethod: 'GET',
      path: 'synchronous/'
    }

    api(ev, {}, (error, {body, statusCode}) => {
      expect(error).toBeNull()

      expect(body).toBe('not async')
      expect(statusCode).toBe(200)

      done()
    })
  })

  it('should handle item request for books/{id}', () => {
    const id = '929384'
    const ev = {
      httpMethod: 'GET',
      path: `books/${id}?a=1`
    }

    return api(ev, {}, (error, {body}) => {
      const {uri} = body

      expect(error).toBeNull()
      expect(uri.parameters.id).toEqual(id)
    })
  })
})
