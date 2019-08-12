const pipe = require('./pipe')

const addWord = (word) => (s) => `${s} ${word}`

describe('pipe', () => {
  it('should pipe arguments to a series of functions resulting in a single value', () => {
    const result = pipe(
      [1, 2, 3, 4, 5, 6],
      (args) => args.reduce((a, b) => a + b),
      (result) => result * 2,
      addWord('is the answer to the ultimate question of'),
      addWord('Life'),
      addWord(', The Universe'),
      addWord('and Everything.'),
    )

    expect(result).toBe('42 is the answer to the ultimate question of Life , The Universe and Everything.')
  })
})
