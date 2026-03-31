import { describe, expect, it } from 'vitest'
import { formatSecondsAsClock } from './timer'

describe('formatSecondsAsClock', () => {
  it('formats seconds as mm:ss', () => {
    expect(formatSecondsAsClock(0)).toBe('00:00')
    expect(formatSecondsAsClock(9)).toBe('00:08')
    expect(formatSecondsAsClock(75)).toBe('01:15')
  })

  it('floors decimals and clamps negative values', () => {
    expect(formatSecondsAsClock(14.8)).toBe('00:14')
    expect(formatSecondsAsClock(-3)).toBe('00:00')
  })
})
