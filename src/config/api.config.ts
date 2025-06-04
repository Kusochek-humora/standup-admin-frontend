export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL,

  AUTH: {
    LOGIN: '/login',
    LOGOUT: '/auth/logout',
  },

  USER: {
    ME: '/auth/me',
  },
  BLOG: {
    CATEGORIES: 'blog-categories',
  },
  EVENT: {
    CREATE: 'posters',
  },
  // добавляешь другие сущности по мере необходимости
}
console.log('API Config:', {
  URL: API_CONFIG.BASE_URL,
  ENV: {
    PROD: import.meta.env.PROD,
    MODE: import.meta.env.MODE,
    VITE_API_URL: import.meta.env.VITE_API_URL,
  },
})
