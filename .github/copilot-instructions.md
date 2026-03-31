# Copilot Instructions

**IMPORTANT**: Never read the `.env` files

## Demo Purpose
This is a demonstration application for showing GitHub Copilot, GitHub Actions, CodeQL, and security features in an AI-driven DevOps workflow.

## Environment Rule
Before running Node.js or npm commands in this repository, run:

```bash
nvm use node
```

This ensures the latest Node version managed by `nvm` is active.

## Demo Application
The application displays:
- Random pictures from https://picsum.photos/640/300
- Random quotes from https://dummyjson.com/quotes/<NUMBER>
- Updates every 5 seconds

---

## General best practices
- always add comments to explain functions and classes
- always add unit tests for new code
- use descriptive variable and function names
- udpate README.md with latest changes

---

## Vue 3 Best Practices

### Code Style & Structure

**✅ DO:**
- Use `<script setup>` syntax for cleaner, more concise components
- Use single-file components (`.vue` files) for each feature/component
- Keep components small and focused (single responsibility principle)
- Name components descriptively (e.g., `PictureQuoteCard.vue` instead of `Card.vue`)
- Use PascalCase for component names in templates

**❌ DON'T:**
- Mix Options API and Composition API in the same codebase
- Create components larger than 300 lines
- Use `any` type in TypeScript (strive for type safety)
- Mutate props directly; use events to communicate with parents

### Example Component Structure
```vue
<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

// Define props with types
const props = defineProps({
  interval: {
    type: Number,
    default: 5000
  }
})

// Define emitted events
const emit = defineEmits(['error', 'loaded'])

// Reactive state
const data = ref(null)
const loading = ref(false)
const error = ref(null)

// Computed properties
const hasData = computed(() => !!data.value)

// Methods
const fetchData = async () => {
  try {
    loading.value = true
    const response = await fetch('/api/data')
    data.value = await response.json()
    emit('loaded', data.value)
  } catch (err) {
    error.value = err.message
    emit('error', err)
  } finally {
    loading.value = false
  }
}

// Lifecycle hooks
onMounted(() => {
  fetchData()
})

onUnmounted(() => {
  // Cleanup if needed
})
</script>

<template>
  <div class="component">
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="hasData" class="content">{{ data }}</div>
  </div>
</template>

<style scoped>
.component {
  /* Scoped styles only */
}
</style>
```

---

## State Management & Reactivity

**✅ DO:**
- Use `ref()` for primitive values
- Use `reactive()` for objects (use sparingly)
- Use `computed()` for derived state
- Use `watch()` for side effects based on state changes
- Keep state as close to components as possible

**❌ DON'T:**
- Mutate state directly; use setters instead
- Use too many watchers (prefer computed properties)
- Share global state without a store (use Pinia for complex apps)

### Example:
```vue
<script setup>
import { ref, computed } from 'vue'

const count = ref(0)
const multiplier = ref(2)

// Good: derived state with computed
const doubled = computed(() => count.value * multiplier.value)

// Event handler
const increment = () => {
  count.value++ // okay: direct mutation of ref
}
</script>
```

---

## Error Handling

**✅ DO:**
- Always wrap async calls in try-catch blocks
- Display user-friendly error messages
- Log errors to console in development
- Emit error events to parent components
- Set error state for UI handling

**❌ DON'T:**
- Silently fail without logging
- Show raw error messages to users
- Ignore failed API responses

### Example:
```vue
<script setup>
const error = ref(null)

const fetchData = async () => {
  try {
    error.value = null
    const response = await fetch(url)
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    return await response.json()
  } catch (err) {
    error.value = err.message || 'Failed to fetch data'
    console.error('Data fetch error:', err)
    throw err
  }
}
</script>
```

---

## Performance Optimization

**✅ DO:**
- Use `v-show` for frequently toggled elements
- Use `v-if` for conditionally rendered elements
- Implement proper key binding in `v-for` loops
- Use `computed()` instead of methods in templates when possible
- Lazy load components with dynamic imports
- Clean up intervals and event listeners in `onUnmounted()`

**❌ DON'T:**
- Call methods in templates (use computed instead)
- Forget to cleanup in `onUnmounted()`
- Use object/array literals as keys in `v-for`
- Load all data at once; use pagination/lazy loading

### Example:
```vue
<script setup>
import { onMounted, onUnmounted } from 'vue'

let intervalId = null

onMounted(() => {
  intervalId = setInterval(() => {
    fetchData()
  }, 5000)
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId) // cleanup!
})
</script>
```

---

## Form Handling & Validation

**✅ DO:**
- Use `v-model` for two-way binding
- Validate form data before submission
- Show validation errors to users
- Disable submit button while validating
- Use `@submit.prevent` for form submission

**❌ DON'T:**
- Bypass validation
- Submit incomplete forms
- Use `v-model` with complex nested objects directly

### Example:
```vue
<script setup>
import { ref } from 'vue'

const form = ref({ name: '', email: '' })
const errors = ref({})
const isSubmitting = ref(false)

const validate = () => {
  errors.value = {}
  if (!form.value.name) errors.value.name = 'Name is required'
  if (!form.value.email) errors.value.email = 'Email is required'
  return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
  if (!validate()) return
  isSubmitting.value = true
  // submit...
  isSubmitting.value = false
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="form.name" type="text" />
    <span v-if="errors.name" class="error">{{ errors.name }}</span>
    <button :disabled="isSubmitting">Submit</button>
  </form>
</template>
```

---

## Async Data Fetching

**✅ DO:**
- Show loading states to users
- Handle errors gracefully
- Cache data when appropriate
- Implement proper timeouts
- Use AbortController for cancellable requests

**❌ DON'T:**
- Leave users guessing if data is loading
- Ignore network errors
- Make unnecessary requests
- Keep stale data displayed as fresh

### Example:
```vue
<script setup>
import { ref, onMounted } from 'vue'

const data = ref(null)
const loading = ref(false)
const error = ref(null)
const controller = ref(null)

const fetchData = async () => {
  try {
    loading.value = true
    error.value = null
    
    controller.value = new AbortController()
    const response = await fetch(url, {
      signal: controller.value.signal
    })
    
    if (!response.ok) throw new Error('Failed to fetch')
    data.value = await response.json()
  } catch (err) {
    if (err.name !== 'AbortError') {
      error.value = err.message
    }
  } finally {
    loading.value = false
  }
}

onMounted(() => fetchData())
</script>
```

---

## Security Best Practices for Vue Apps

**✅ DO:**
- Use environment variables for sensitive data (`.env.local` files)
- Sanitize user input to prevent XSS
- Use `v-text` or `{{ }}` instead of `v-html` unless absolutely necessary
- Validate and sanitize data from APIs
- Use CSRF tokens for state-changing operations
- Store tokens securely (httpOnly cookies > localStorage)
- Use HTTPS in production

**❌ DON'T:**
- Hard-code API keys, tokens, or secrets
- Use `v-html` with user-supplied content
- Trust data from the client
- Store sensitive data in localStorage
- Log sensitive information to console in production

### Example:
```vue
<script setup>
// ✅ Good: Use environment variable
const API_URL = import.meta.env.VITE_API_URL

// ❌ Bad: Hard-coded secret
// const API_KEY = 'sk_live_12345'

// ✅ Good: Sanitize HTML content
import { DOMPurify } from 'dompurify'
const sanitized = DOMPurify.sanitize(userContent)
</script>

<template>
  <!-- ✅ Good: Safe interpolation -->
  <p>{{ userMessage }}</p>
  
  <!-- ❌ Bad: Can allow XSS -->
  <!-- <p v-html="userMessage"></p> -->
</template>
```

---

## Intentional Issues for Demo
Use the manual snippet in `docs/appendix/vulnerability-demo-snippet.md` to demonstrate intentionally exposed security vulnerabilities:

### 1. Hard-coded Secrets
- File (manual for demo): `app/src/config.js`
- Contains: AWS keys, database passwords, GitHub tokens
- Purpose: Demonstrate GitHub secret scanning and detection

### 2. SQL Injection Vulnerability
- File (manual for demo): `app/src/config.js` - `queryDatabase()` function
- Issue: String concatenation without parameterized queries
- Purpose: Demonstrate CodeQL analysis for security vulnerabilities

### 3. Security Best Practices
- Use environment variables (`.env` files) instead of hard-coding secrets
- Use parameterized queries to prevent SQL injection
- Keep secrets in GitHub Secrets, not in code

---

## Project Structure

```
app/
├── public/                 # Static assets (images, icons)
├── src/
│   ├── components/         # Reusable Vue components
│   ├── views/              # Page-level components
│   ├── assets/             # Images, fonts, styles
│   ├── App.vue             # Root component
│   ├── main.js             # Entry point
│   └── style.css           # Global styles
├── .copilot-instructions.md # This file
├── .env.example            # Example environment variables
├── .env.local              # Local environment variables (git ignored)
├── package.json
├── vite.config.js
└── index.html
```

---

## Testing

**✅ DO:**
- Write unit tests for composables and utility functions
- Write component tests for complex UI logic
- Write integration tests for user flows
- Aim for >80% code coverage
- Test error scenarios, not just happy paths

**❌ DON'T:**
- Skip testing just because it's quick to write code first
- Test implementation details instead of behavior
- Mock everything (keep tests realistic)

### Example Test:
```javascript
import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@vue/test-utils'
import App from './App.vue'

describe('App.vue', () => {
  it('displays a picture', () => {
    render(App)
    expect(screen.getByAltText(/quote/i)).toBeInTheDocument()
  })
})
```

---

## Naming Conventions

**✅ Recommended:**
- Components: PascalCase (`PictureCard.vue`)
- Files: kebab-case (`picture-card.vue`)
- Variables/functions: camelCase (`fetchPicture`)
- Constants: UPPER_SNAKE_CASE (`API_TIMEOUT`)
- Boolean properties: starts with `is` or `has` (`isLoading`, `hasError`)
- Event handlers: camelCase (`handleClick`)
- Events emitted: kebab-case (`@picture-loaded`)

---

## Development Workflow

1. **Start dev server**: `npm run dev`
2. **Code**: Make changes in `src/` directory
3. **Test**: Run tests with `npm run test` (when available)
4. **Lint**: Check code style with `npm run lint` (when configured)
5. **Build**: Create production build with `npm run build`
6. **Preview**: Preview production build with `npm run preview`

---

## Useful Resources

- [Vue 3 Official Docs](https://vuejs.org/)
- [Composition API Guide](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Vite Documentation](https://vitejs.dev/)
- [Vue DevTools](https://devtools.vuejs.org/)

---

## Demo Workflow Steps
See docs/DEMO_GUIDE.md for detailed presenter instructions on how to demonstrate all features.

## Key Technologies
- Vue 3 with `<script setup>` syntax
- Vite for fast development and building
- Fetch API for data retrieval
- CSS Grid and Flexbox for responsive design
