import { describe, expect, it } from 'vitest'
import { formatJson, minifyJson } from './json'

describe('json helpers', () => {
  it('formats valid JSON', () => {
    const result = formatJson('{"name":"Toolbox","ok":true}', 2)
    expect(result).toEqual({ ok: true, value: '{\n  "name": "Toolbox",\n  "ok": true\n}' })
  })

  it('minifies valid JSON', () => {
    expect(minifyJson('{ "items": [1, 2] }')).toEqual({ ok: true, value: '{"items":[1,2]}' })
  })

  it('returns an error without throwing for invalid JSON', () => {
    const result = formatJson('{"items":', 2)
    expect(result.ok).toBe(false)
  })
})
