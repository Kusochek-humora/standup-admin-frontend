// import { defineStore } from 'pinia'
// import type { AxiosError } from 'axios'
// import type { EventCreatePayload, EventResource } from '@/types/event-create'
// import { EventService } from '@/services/event.service'

// export const useEventStore = defineStore('event', {
//   state: () => ({
//     events: [] as EventResource[],
//     loading: false,
//     error: null as string | null,
//   }),
//   actions: {
//     async createEvent(payload: EventCreatePayload) {
//       this.loading = true
//       this.error = null

//       try {
//         const event = await EventService.createEvent(payload)
//         this.events.push(event)
//         return event
//       } catch (err) {
//         const error = err as AxiosError<{ message: string }>
//         this.error = error.response?.data?.message || 'Ошибка при создании события'
//         throw error
//       } finally {
//         this.loading = false
//       }
//     },

//     async fetchEvents() {
//       this.loading = true
//       this.error = null

//       try {
//         this.events = await EventService.getAllEvents()
//       } catch (err) {
//         const error = err as AxiosError<{ message: string }>
//         this.error = error.response?.data?.message || 'Ошибка загрузки событий'
//       } finally {
//         this.loading = false
//       }
//     },
//   },
// })
