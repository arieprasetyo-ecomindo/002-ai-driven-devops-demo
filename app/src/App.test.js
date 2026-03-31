import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import App from './App.vue'

vi.mock('./utils/random', () => ({
  getRandomQuoteId: () => 1,
}))

const flushPromises = async () => {
  await Promise.resolve()
  await Promise.resolve()
}

describe('App countdown timer', () => {
  beforeEach(() => {
    vi.useFakeTimers()

    global.fetch = vi.fn(async (url) => {
      if (url.includes('picsum.photos')) {
        return {
          url: 'https://picsum.photos/id/1/640/300',
        }
      }

      return {
        json: async () => ({
          quote: 'Test quote',
          author: 'Test author',
        }),
      }
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.useRealTimers()
  })

  it('shows 15 seconds after mounting', async () => {
    const wrapper = mount(App)
    await flushPromises()

    expect(wrapper.text()).toContain('Next slide in 15s')

    wrapper.unmount()
  })

  it('counts down every second', async () => {
    const wrapper = mount(App)
    await flushPromises()

    await vi.advanceTimersByTimeAsync(1000)

    expect(wrapper.text()).toContain('Next slide in 14s')

    wrapper.unmount()
  })

  it('resets countdown after the slide changes', async () => {
    const wrapper = mount(App)
    await flushPromises()

    await vi.advanceTimersByTimeAsync(15000)
    await flushPromises()

    expect(wrapper.text()).toContain('Next slide in 15s')

    wrapper.unmount()
  })
})
