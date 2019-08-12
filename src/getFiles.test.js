const fs = require('fs')

const {isObject} = require('./is')

const getFiles = require('./getFiles')

jest.mock('fs')

const MOCK_FS = mockFS({
  'resources': {
    'books': {
      'collection.js': '// source code comment for collection.js',
      'collection.test.js': '// some tests for the module',
    },
    'README.md': '# Resources Readme',
  },
  'empty': {}
})

function mockFS (mock, path = '', acc = {}) {
  acc[path] = mock

  const pathJoin = (a, b) => `${a}/${b}`.replace(/^\/+/, '')
  const reducer = (a, key) => mockFS(mock[key], pathJoin(path, key), a)

  return isObject(mock)
    ? Object.keys(mock).reduce(reducer, acc)
    : {...acc, [path]: mock}
}

beforeAll(() => {
  const PROCESS_ROOT = process.cwd() + '/'
  const diveInto = (str) => str
    .replace(PROCESS_ROOT, '')
    .split('/')
    .reduce((acc, part) => acc[part], MOCK_FS)

  fs.readFileSync
    .mockImplementation((str) => diveInto(str.replace(PROCESS_ROOT, '')))

  fs.readdirSync
    .mockImplementation((str) => Object.keys(diveInto(str)))

  fs.statSync
    .mockImplementation((str) => ({
      isDirectory () {
        const needle = str
          .replace(PROCESS_ROOT, '')

        return isObject(MOCK_FS[needle])
      },
    }))
})

describe('getFiles', () => {
  it('should be a function', () => {
    expect(typeof getFiles).toBe('function')
  })

  it('should read from a mock filesystem', () => {
    expect(JSON.stringify(getFiles('resources'), null, 4)).toMatchSnapshot()
  })
})
