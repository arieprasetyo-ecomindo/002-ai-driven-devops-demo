import { describe, it, expect, vi } from 'vitest'
import { fetchPicture, fetchQuote, SLIDE_INTERVAL } from './useSlideShow'

// ---------------------------------------------------------------------------
// fetchPicture
// ---------------------------------------------------------------------------
describe('fetchPicture', () => {
  it('calls the picsum endpoint and returns the redirected URL', async () => {
    // Arrange: mock fetch to simulate a redirect response
    const mockFetch = vi.fn().mockResolvedValue({
      url: 'https://fastly.picsum.photos/id/42/640/300.jpg',
    })

    // Act
    const url = await fetchPicture(mockFetch)

    // Assert
    expect(mockFetch).toHaveBeenCalledWith('https://picsum.photos/640/300')
    expect(url).toBe('https://fastly.picsum.photos/id/42/640/300.jpg')
  })

  it('propagates network errors', async () => {
    const mockFetch = vi.fn().mockRejectedValue(new Error('Network error'))

    await expect(fetchPicture(mockFetch)).rejects.toThrow('Network error')
  })
})

// ---------------------------------------------------------------------------
// fetchQuote
// ---------------------------------------------------------------------------
describe('fetchQuote', () => {
  it('fetches the correct endpoint for the given ID and returns quote and author', async () => {
    // Arrange
    const payload = { id: 7, quote: 'Be the change.', author: 'Gandhi' }
    const mockFetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue(payload),
    })

    // Act
    const result = await fetchQuote(7, mockFetch)

    // Assert
    expect(mockFetch).toHaveBeenCalledWith('https://dummyjson.com/quotes/7')
    expect(result).toEqual({ quote: 'Be the change.', author: 'Gandhi' })
  })

  it('returns only quote and author, ignoring extra API fields', async () => {
    const payload = { id: 1, quote: 'Hello.', author: 'World', extra: 'ignored' }
    const mockFetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue(payload),
    })

    const result = await fetchQuote(1, mockFetch)

    expect(result).toStrictEqual({ quote: 'Hello.', author: 'World' })
    expect(result).not.toHaveProperty('extra')
  })

  it('propagates errors when the API call fails', async () => {
    const mockFetch = vi.fn().mockRejectedValue(new Error('API unavailable'))

    await expect(fetchQuote(1, mockFetch)).rejects.toThrow('API unavailable')
  })
})

// ---------------------------------------------------------------------------
// SLIDE_INTERVAL constant
// ---------------------------------------------------------------------------
describe('SLIDE_INTERVAL', () => {
  it('is a positive number', () => {
    expect(typeof SLIDE_INTERVAL).toBe('number')
    expect(SLIDE_INTERVAL).toBeGreaterThan(0)
  })
})
