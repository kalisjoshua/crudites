const endpointFactory = require('./endpoint')

describe('Endpoint', () => {
  describe('plain endpoints', () => {
    const endpoint = endpointFactory('/home')

    it('should match paths that fit the simple pattern', () => {
      expect(endpoint.match('/home')).toBe(true)
    })

    it('should not match paths that do not fit the simple pattern', () => {
      expect(endpoint.match('/away')).toBe(false)
    })
  })

  describe('endpoints with untyped URI parameters', () => {
    const template = '/article/{year}/{month}/{day}'
    const uri = '/article/2018/January/01'

    const match = {
      day: '01',
      month: 'January',
      year: '2018'
    }

    const endpoint = endpointFactory(template)

    it('should match endpoints with untyped parameters', () => {
      expect(endpoint.match(uri)).toEqual(match)
    })
  })

  describe('endpoints with typed URI parameters', () => {
    const template = '/article/{year:number}/{month:string}/{day:number}'
    const uri = '/article/2018/January/01'

    const match = {
      day: 1,
      month: 'January',
      year: 2018
    }

    const endpoint = endpointFactory(template)

    it('should match endpoints with typed parameters', () => {
      expect(endpoint.match(uri)).toEqual(match)
    })
  })

  it('should throw for poorly formatted URLs', () => {
    const template = '/article/{'

    expect(() => endpointFactory(template))
      .toThrow('URL parameters need to be formatted correctly.')
  })

  it('should throw for invalid endpoint parameter type', () => {
    const template = '/article/{title:awesome}'

    expect(() => endpointFactory(template))
      .toThrow('Unsupported parameter types: [awesome]')
  })
})
