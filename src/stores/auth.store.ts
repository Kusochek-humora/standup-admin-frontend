import { defineStore } from 'pinia'
import { login as loginRequest } from '@/api/auth.api'
import type { User } from '@/types/user'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: localStorage.getItem('access_token') as string | null,
    user: null as User | null,
  }),
  actions: {
    async login(credentials: { email: string; password: string }) {
      const response = await loginRequest(credentials.email, credentials.password)
      this.accessToken = response.data.token
      this.user = response.data.user

      localStorage.setItem('access_token', this.accessToken || '')
      localStorage.setItem('auth_user', JSON.stringify(this.user))
    },
    logout() {
      this.accessToken = null
      this.user = null
      localStorage.removeItem('access_token')
      localStorage.removeItem('auth_user')
    },
  },
})
