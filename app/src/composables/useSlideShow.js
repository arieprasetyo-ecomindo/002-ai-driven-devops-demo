import { ref, computed, onMounted, onUnmounted } from 'vue'
import { getRandomQuoteId } from '../utils/random'

// Slide interval duration in seconds
export const SLIDE_INTERVAL = 15

/**
 * Fetches a random picture URL from picsum.photos.
 * The redirected response URL is used as the final image src.
 *
 * @param {typeof globalThis.fetch} fetchFn - Injectable fetch implementation (default: globalThis.fetch)
 * @returns {Promise<string>} The resolved image URL after redirect
 */
export async function fetchPicture(fetchFn = globalThis.fetch) {
  const response = await fetchFn('https://picsum.photos/640/300')
  return response.url
}

/**
 * Fetches a specific quote by ID from dummyjson.com.
 *
 * @param {number} id - The quote ID to fetch
 * @param {typeof globalThis.fetch} fetchFn - Injectable fetch implementation (default: globalThis.fetch)
 * @returns {Promise<{ quote: string, author: string }>} The quote text and author
 */
export async function fetchQuote(id, fetchFn = globalThis.fetch) {
  const response = await fetchFn(`https://dummyjson.com/quotes/${id}`)
  const data = await response.json()
  return { quote: data.quote, author: data.author }
}

/**
 * Composable that manages auto-rotating picture & quote slides.
 * Exposes reactive state for the current picture, quote, loading status,
 * countdown timer, and a progress percentage for the progress bar.
 *
 * @returns {{ pictureUrl, quote, author, loading, countdown, progressPercent }}
 */
export function useSlideShow() {
  const pictureUrl = ref('')
  const quote = ref('')
  const author = ref('')
  const loading = ref(true)
  const countdown = ref(SLIDE_INTERVAL)
  let intervalId = null
  let countdownId = null

  // Progress bar width as a percentage (0% = just refreshed, 100% = about to refresh)
  const progressPercent = computed(
    () => ((SLIDE_INTERVAL - countdown.value) / SLIDE_INTERVAL) * 100
  )

  /**
   * Fetches a random picture and quote, then updates reactive state.
   * Resets the countdown timer on each call.
   */
  const fetchPictureAndQuote = async () => {
    try {
      loading.value = true
      // Reset countdown on each slide change
      countdown.value = SLIDE_INTERVAL

      // Use extracted pure functions for each data source
      const [url, quoteResult] = await Promise.all([
        fetchPicture(),
        fetchQuote(getRandomQuoteId(1000)),
      ])

      pictureUrl.value = url
      quote.value = quoteResult.quote
      author.value = quoteResult.author

      loading.value = false
    } catch (error) {
      console.error('Error fetching data:', error)
      loading.value = false
    }
  }

  onMounted(() => {
    // Fetch immediately on mount
    fetchPictureAndQuote()

    // Set up interval to rotate slides every SLIDE_INTERVAL seconds
    intervalId = setInterval(fetchPictureAndQuote, SLIDE_INTERVAL * 1000)

    // Decrement countdown every second for the timer display
    countdownId = setInterval(() => {
      if (countdown.value > 0) countdown.value--
    }, 1000)
  })

  onUnmounted(() => {
    // Clear intervals when the component using this composable unmounts
    if (intervalId) clearInterval(intervalId)
    if (countdownId) clearInterval(countdownId)
  })

  return { pictureUrl, quote, author, loading, countdown, progressPercent }
}
