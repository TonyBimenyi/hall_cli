// composables/useApi.js
import axios from 'axios'
import { computed } from 'vue'

export const useAuth = () => {
  const user = computed(() => {
    try {
      return JSON.parse(localStorage.getItem('user') || '{}')
    } catch {
      return {}
    }
  })

  const token = computed(() => localStorage.getItem('access_token'))

  return { user, token }
}

// Axios instance
export const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
