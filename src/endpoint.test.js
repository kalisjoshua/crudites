const endpointFactory = require('./endpoint')

describe('Endpoint', () => {
  it('should construct simple endpoints', () => {
    const endpoint = endpointFactory('/home')

    expect(endpoint.pattern).toEqual('/home')
  })

  it('should match paths that fit the simple pattern', () => {
    const endpoint = endpointFactory('/home')

    expect(endpoint.isMatch('/home')).toBe(true)
    expect(endpoint.isMatch('/away')).toBe(false)
  })

  it('should construct complex endpoints', () => {
    const pattern = '/article/{year:number}/{month:number}/{day:number}'
    const endpoint = endpointFactory(pattern)

    expect(endpoint.pattern).toBe(pattern)
  })

  it('should parse path parts', () => {
    const pattern = '/article/{year:number}/{month:number}/{day:number}'
    const endpoint = endpointFactory(pattern)

    expect(endpoint.parts()).toEqual([
      'article',
      {
        name: 'year',
        type: 'number'
      },
      {
        name: 'month',
        type: 'number'
      },
      {
        name: 'day',
        type: 'number'
      }
    ])
  })

  it('should match endpoints with named untyped parameter parts', () => {
    const pattern = '/article/{year}/{month}/{day}'
    const endpoint = endpointFactory(pattern)

    expect(endpoint.isMatch('/article/2018/01/01')).toBe(true)
  })

  it('should match endpoints with named "number" typed parameter parts', () => {
    const pattern = '/article/{year:number}/{month:number}/{day:number}'
    const endpoint = endpointFactory(pattern)

    expect(endpoint.isMatch('/article/2018/01/01')).toBe(true)
  })

  it('should match endpoints with named "string" typed parameter parts', () => {
    const pattern = '/article/{title:string}'
    const endpoint = endpointFactory(pattern)

    expect(endpoint.isMatch('/article/kinda-long-article-title')).toBe(true)
  })

  it('should throw for poorly formatted URLs', () => {
    const pattern = '/article/{'

    expect(() => endpointFactory(pattern))
      .toThrow('URL parameters need to be formatted correctly.')
  })

  it('should throw for invalid endpoint parameter type', () => {
    const pattern = '/article/{title:awesome}'

    expect(() => endpointFactory(pattern))
      .toThrow('Type "awesome" is not an available parameter type.')
  })
})
