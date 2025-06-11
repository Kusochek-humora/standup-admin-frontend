import api from '@/api/instance'
import { API_CONFIG } from '@/config/api.config'
import type { EventResource } from '@/types/event-create'

export class EventService {
  static async createEvent(data: FormData): Promise<EventResource> {
    return await api.post(API_CONFIG.EVENT.CREATE, data)
  }
  static async getAllEvents(): Promise<EventResource[]> {
    const response = await api.get<EventResource[]>(API_CONFIG.EVENT.CREATE) // ← или другой путь, если API_CONFIG.EVENT.LIST
    return response.data
  }
}
