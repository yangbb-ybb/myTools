export type JsonResult = { ok: true; value: string } | { ok: false; error: string }

export function formatJson(input: string, indent: number | string): JsonResult {
  try {
    return { ok: true, value: JSON.stringify(JSON.parse(input), null, indent) }
  } catch (error) {
    return { ok: false, error: formatJsonError(error) }
  }
}

export function minifyJson(input: string): JsonResult {
  try {
    return { ok: true, value: JSON.stringify(JSON.parse(input)) }
  } catch (error) {
    return { ok: false, error: formatJsonError(error) }
  }
}

function formatJsonError(error: unknown): string {
  const message = error instanceof Error ? error.message : 'JSON 格式无效'
  const position = message.match(/position (\d+)/i)?.[1]
  return position ? `JSON 格式错误，出错位置约在第 ${Number(position) + 1} 个字符附近` : message
}
