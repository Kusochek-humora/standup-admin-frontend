import axios from 'axios'
import { API_CONFIG } from '@/config/api.config'
const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// Перехватчик для токена
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Перехватчик ошибок
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // например, редирект на логин
      window.location.href = '/'
    }
    return Promise.reject(error)
  },
)

export default api
