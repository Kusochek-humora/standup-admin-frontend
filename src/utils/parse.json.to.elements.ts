import { cleanAttributes } from './svg'
import type { RawSvgElement, SvgElement, SvgSeat, SvgDecoration } from '@/types/plan'

function parseElement(item: RawSvgElement): SvgElement {
  const cleanedAttributes = cleanAttributes(item.attributes)
  const children = item.children?.map(parseElement) // 👈 рекурсивный вызов

  if (item.role === 'seat') {
    return {
      tag: item.tag,
      attributes: cleanedAttributes,
      role: 'seat',
      fill: item.fill!,
      price: item.price,
      reserved: item.reserved ?? false,
      text: item.text,
    } satisfies SvgSeat
  }

  return {
    tag: item.tag,
    attributes: cleanedAttributes,
    role: 'decoration',
    text: item.text,
    children,
  } satisfies SvgDecoration
}

export function parseJsonToElements(raw: RawSvgElement[]): SvgElement[] {
  return raw.map(parseElement)
}
