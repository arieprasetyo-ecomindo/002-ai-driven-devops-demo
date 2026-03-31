<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { getRandomQuoteId } from './utils/random'

const SLIDE_INTERVAL_MS = 15000

const pictureUrl = ref('')
const quote = ref('')
const author = ref('')
const loading = ref(true)
const countdownSeconds = ref(Math.floor(SLIDE_INTERVAL_MS / 1000))
let slideIntervalId = null
let countdownIntervalId = null
let nextSlideChangeAt = 0

const updateCountdown = () => {
  const msRemaining = Math.max(0, nextSlideChangeAt - Date.now())
  countdownSeconds.value = Math.ceil(msRemaining / 1000)
}

const resetCountdown = () => {
  nextSlideChangeAt = Date.now() + SLIDE_INTERVAL_MS
  updateCountdown()
}

const fetchPictureAndQuote = async () => {
  try {
    loading.value = true
    
    // Fetch picture from picsum.photos
    const picResponse = await fetch('https://picsum.photos/640/300')
    pictureUrl.value = picResponse.url
    
    // Fetch random quote from dummyjson.com
    const randomNumber = getRandomQuoteId(1000)
    const quoteResponse = await fetch(`https://dummyjson.com/quotes/${randomNumber}`)
    const quoteData = await quoteResponse.json()
    quote.value = quoteData.quote
    author.value = quoteData.author
    
    loading.value = false
  } catch (error) {
    console.error('Error fetching data:', error)
    loading.value = false
  }
}

onMounted(() => {
  // Fetch immediately on mount
  fetchPictureAndQuote()

  // Keep countdown in sync with the next scheduled slide change.
  resetCountdown()

  // Set up interval to fetch on each slide change.
  slideIntervalId = setInterval(() => {
    fetchPictureAndQuote()
    resetCountdown()
  }, SLIDE_INTERVAL_MS)

  // Update countdown text regularly for smoother UX.
  countdownIntervalId = setInterval(updateCountdown, 250)
})

onUnmounted(() => {
  // Clear intervals when component unmounts
  if (slideIntervalId) {
    clearInterval(slideIntervalId)
  }

  if (countdownIntervalId) {
    clearInterval(countdownIntervalId)
  }
})
</script>

<template>
  <div class="container">
    <h1>Random Picture & Quote</h1>

    <p class="countdown">Next slide in {{ countdownSeconds }}s</p>
    
    <div class="content" v-if="!loading">
      <div class="picture-wrapper">
        <img :src="pictureUrl" :alt="quote" />
      </div>
      
      <div class="quote-section">
        <p class="quote-text">"{{ quote }}"</p>
        <p class="quote-author">— {{ author }}</p>
      </div>
    </div>
    
    <div v-else class="loading">
      Loading...
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h1 {
  color: white;
  margin-bottom: 40px;
  font-size: 2.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.countdown {
  margin: 0 0 20px 0;
  padding: 8px 16px;
  border-radius: 999px;
  color: white;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.35);
  font-weight: 600;
  letter-spacing: 0.02em;
}

.content {
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  padding: 30px;
  max-width: 700px;
  width: 100%;
  animation: fadeIn 0.5s ease-in;
}

.picture-wrapper {
  width: 100%;
  margin-bottom: 30px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.picture-wrapper img {
  width: 100%;
  height: auto;
  display: block;
}

.quote-section {
  text-align: center;
}

.quote-text {
  font-size: 1.3rem;
  font-style: italic;
  color: #333;
  margin: 0 0 15px 0;
  line-height: 1.6;
}

.quote-author {
  font-size: 1rem;
  color: #666;
  margin: 0;
  font-weight: 500;
}

.loading {
  color: white;
  font-size: 1.5rem;
  text-align: center;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 600px) {
  h1 {
    font-size: 2rem;
  }
  
  .content {
    padding: 20px;
  }
  
  .quote-text {
    font-size: 1.1rem;
  }
}
</style>
