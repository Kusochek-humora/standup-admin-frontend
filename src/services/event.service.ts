import api from '@/api/instance'
import { API_CONFIG } from '@/config/api.config'
import type { EventCreatePayload, EventResource } from '@/types/event-create'

export class EventService {
  static async createEvent(data: EventCreatePayload): Promise<EventResource> {
    const response = await api.post<EventResource>(API_CONFIG.EVENT.CREATE, data)
    return response.data
  }
  static async getAllEvents(): Promise<EventResource[]> {
    const response = await api.get<EventResource[]>(API_CONFIG.EVENT.CREATE) // ← или другой путь, если API_CONFIG.EVENT.LIST
    return response.data
  }
}
