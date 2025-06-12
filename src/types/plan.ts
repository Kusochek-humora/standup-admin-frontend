// Тип, который приходит из JSON
export interface RawSvgElement {
  tag: string
  attributes: Record<string, unknown>
  role: string
  fill?: string
  price?: number
  reserved?: boolean
  text?: string
  children?: RawSvgElement[] // 👈 поддержка tspan
}

// Тип, который используется после парсинга
export interface SvgElementBase {
  tag: string
  attributes: Record<string, string>
  role: 'seat' | 'decoration'
  text?: string
}

export interface SvgSeat extends SvgElementBase {
  role: 'seat'
  fill: string
  price?: number
  reserved?: boolean
  // ❌ убираем children, потому что сидения их не содержат
}

export interface SvgDecoration extends SvgElementBase {
  role: 'decoration'
  fill?: undefined
  price?: undefined
  reserved?: undefined
  children?: SvgElement[] // ✅ только у decoration
}

export type SvgElement = SvgSeat | SvgDecoration
