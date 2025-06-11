export interface SeatPrice {
  seat_id: number
  price: number
  is_reserved?: boolean
}

export interface EventCreatePayload {
  title_ru: string
  title_kz: string
  hall_id: number
  has_seat_selection?: boolean 
  price_from?: number
  is_donation_event?: boolean 
  ticket_count?: number
  ticket_link?: string
  event_date: string // формат YYYY-MM-DD
  event_hour: number // 0–23
  event_minute: number // 0–59
  is_main_event?: boolean 
  is_active?: boolean 
  poster_image?: File | null
  seat_prices: SeatPrice[]
}
export interface SeatInfo {
  seat_id: number
  seat_type: string
  section: string
  seat_number: number
  price: number
}

export interface EventResource {
  id: number
  title_ru: string
  title_kz: string
  hall_id: number
  hall_title: string
  ticket_count?: number
  has_seat_selection: boolean
  price_from?: number
  is_donation_event: boolean
  ticket_link?: string
  event_date: string
  event_hour: number
  event_minute: number
  is_main_event: boolean
  is_active: boolean
  poster_image_url?: string
  seat_prices: SeatInfo[]
  available_seats: SeatInfo[]
}
