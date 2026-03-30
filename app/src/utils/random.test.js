import { describe, expect, it } from 'vitest'
import { getRandomQuoteId } from './random'

describe('getRandomQuoteId', () => {
  it('returns a value between 1 and max inclusive', () => {
    for (let i = 0; i < 500; i += 1) {
      const id = getRandomQuoteId(1000)
      expect(id).toBeGreaterThanOrEqual(1)
      expect(id).toBeLessThanOrEqual(1000)
    }
  })
})
