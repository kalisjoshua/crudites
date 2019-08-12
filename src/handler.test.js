const {addRoute, handler} = require('./handler')

describe('handler', () => {
  it('should be a function', () => {
    expect(typeof handler).toBe('function')
  })

  it('should have a `addRoute` property', () => {
    expect(typeof addRoute).toBe('function')
  })

  it('should return 404 for unknown routes', (done) => {
    const callback = (error, response) => {
      const {body, statusCode} = response

      expect(error).toBeNull()
      expect(statusCode).toBe(404)
      expect(body).toBe('Not found.')

      done()
    }

    handler({}, {}, callback)
  })

  it('should return 200 for configured routes', (done) => {
    const ev = {
      path: '/books',
      httpMethod: 'GET'
    }

    addRoute(ev.path, ev.httpMethod, () =>
      Promise.resolve({statusCode: 200, body: 'Books'}))

    handler(ev, {}, (_, response) => {
      const {statusCode} = response

      expect(statusCode).toBe(200)
      done()
    })
  })

  it('should return 204 and not include a response `body`', (done) => {
    const ev = {
      path: '/cats',
      httpMethod: 'PUT'
    }

    addRoute(ev.path, ev.httpMethod, () =>
      Promise.resolve({statusCode: 204}))

    handler(ev, {}, (_, response) => {
      const {body, statusCode} = response

      expect(statusCode).toBe(204)
      expect(body).toBeUndefined()
      done()
    })
  })

  it('should return allow for Promise rejections', (done) => {
    const ev = {
      path: '/cats',
      httpMethod: 'GET'
    }

    addRoute(ev.path, ev.httpMethod, () =>
      // eslint-disable-next-line prefer-promise-reject-errors
      Promise.reject({statusCode: 403}))

    handler(ev, {}, (_, response) => {
      const {body, statusCode} = response

      expect(statusCode).toBe(403)
      expect(body).toBeUndefined()
      done()
    })
  })

  it('should return 400 for unparse-able headers', (done) => {
    const ev = {
      httpMethod: 'GET',
      headers: null,
      path: '/bad-headers'
    }

    handler(ev, {}, (_, response) => {
      const {body, statusCode} = response

      expect(statusCode).toBe(400)
      expect(body).not.toBeFalsy()
      done()
    })
  })
})
