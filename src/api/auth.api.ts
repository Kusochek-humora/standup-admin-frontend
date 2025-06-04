import api from './instance'
import { API_CONFIG } from '@/config/api.config'

export const login = (email: string, password: string) => {
  return api.post(API_CONFIG.AUTH.LOGIN, { email, password })
}

export const logout = () => {
  return api.post(API_CONFIG.AUTH.LOGOUT)
}

export const getMe = () => {
  return api.get(API_CONFIG.USER.ME)
}
