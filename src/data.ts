export type ToolId = 'home' | 'qr' | 'url' | 'json' | 'rar'

export type ToolDefinition = {
  id: Exclude<ToolId, 'home'>
  title: string
  description: string
  detail: string
  accent: string
  icon: 'qr' | 'link' | 'braces' | 'archive'
}

export const tools: ToolDefinition[] = [
  {
    id: 'qr',
    title: 'URL 转二维码',
    description: '将链接快速生成高清二维码',
    detail: '粘贴 URL，即时生成可保存的二维码图片。',
    accent: 'violet',
    icon: 'qr',
  },
  {
    id: 'url',
    title: 'URL 编码',
    description: '编码、解码 URL 参数内容',
    detail: '支持完整 URL 与 URL 组件两种编码模式。',
    accent: 'blue',
    icon: 'link',
  },
  {
    id: 'json',
    title: 'JSON 格式化',
    description: '美化、压缩并校验 JSON',
    detail: '让复杂数据结构清晰易读，错误一目了然。',
    accent: 'green',
    icon: 'braces',
  },
  {
    id: 'rar',
    title: 'RAR 转 ZIP',
    description: '将 RAR 压缩包转换为 ZIP',
    detail: '本地完成转换，文件无需上传网络。',
    accent: 'orange',
    icon: 'archive',
  },
]

export const getTool = (id: Exclude<ToolId, 'home'>) => tools.find((tool) => tool.id === id)
