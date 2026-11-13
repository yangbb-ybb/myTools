import { describe, expect, it } from 'vitest'
import { isHttpUrl, transformUrl } from './url'

describe('url helpers', () => {
  it('distinguishes HTTP URLs from other values', () => {
    expect(isHttpUrl('https://example.com/a')).toBe(true)
    expect(isHttpUrl('ftp://example.com/a')).toBe(false)
    expect(isHttpUrl('example.com')).toBe(false)
  })

  it('encodes components and decodes them back', () => {
    const input = '中文 & space'
    const encoded = transformUrl(input, 'component', 'encode')
    expect(encoded).toBe('%E4%B8%AD%E6%96%87%20%26%20space')
    expect(transformUrl(encoded, 'component', 'decode')).toBe(input)
  })

  it('preserves URL structure in URI mode', () => {
    expect(transformUrl('https://example.com/a b?q=中文', 'uri', 'encode')).toBe('https://example.com/a%20b?q=%E4%B8%AD%E6%96%87')
  })
})
