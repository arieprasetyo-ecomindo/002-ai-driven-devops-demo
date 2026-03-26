<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const pictureUrl = ref('')
const quote = ref('')
const author = ref('')
const loading = ref(true)
let intervalId = null

const fetchPictureAndQuote = async () => {
  try {
    loading.value = true
    
    // Fetch picture from picsum.photos
    const picResponse = await fetch('https://picsum.photos/640/300')
    pictureUrl.value = picResponse.url
    
    // Fetch random quote from dummyjson.com
    const randomNumber = Math.floor(Math.random() * 1000) + 1
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
  
  // Set up interval to fetch every 5 seconds
  intervalId = setInterval(fetchPictureAndQuote, 15000)
})

onUnmounted(() => {
  // Clear interval when component unmounts
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

<template>
  <div class="container">
    <h1>Random Picture & Quote</h1>
    
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
