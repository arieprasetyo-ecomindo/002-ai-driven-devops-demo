<script setup>
import { useSlideShow } from './composables/useSlideShow'

// All slide-show logic lives in the composable
const { pictureUrl, quote, author, loading, countdown, progressPercent } = useSlideShow()
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

      <!-- Countdown timer indicating next slide change -->
      <div class="timer">
        <div class="timer-bar">
          <div class="timer-bar-fill" :style="{ width: progressPercent + '%' }"></div>
        </div>
        <p class="timer-label">Next slide in {{ countdown }}s</p>
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

.timer {
  margin-top: 24px;
}

.timer-bar {
  width: 100%;
  height: 6px;
  background: #e0e0e0;
  border-radius: 3px;
  overflow: hidden;
}

.timer-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 3px;
  transition: width 0.9s linear;
}

.timer-label {
  text-align: center;
  font-size: 0.8rem;
  color: #999;
  margin: 6px 0 0 0;
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
