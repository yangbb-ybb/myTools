export type UrlMode = 'component' | 'uri'

export function transformUrl(value: string, mode: UrlMode, action: 'encode' | 'decode'): string {
  const transformer = action === 'encode'
    ? mode === 'component' ? encodeURIComponent : encodeURI
    : mode === 'component' ? decodeURIComponent : decodeURI
  return transformer(value)
}

export function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}
