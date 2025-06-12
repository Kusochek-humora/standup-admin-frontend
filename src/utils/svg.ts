export function cleanAttributes(attrs: Record<string, unknown>): Record<string, string> {
  const result: Record<string, string> = {}
  for (const [key, val] of Object.entries(attrs)) {
    if (val !== undefined && val !== null) {
      result[key] = String(val)
    }
  }
  return result
}
