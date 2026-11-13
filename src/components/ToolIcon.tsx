import { ArchiveIcon, BracesIcon, LinkIcon, QrIcon } from './Icons'
import type { ToolDefinition } from '../data'

export function ToolIcon({ icon, size = 24 }: { icon: ToolDefinition['icon']; size?: number }) {
  const props = { width: size, height: size }
  if (icon === 'qr') return <QrIcon {...props} />
  if (icon === 'link') return <LinkIcon {...props} />
  if (icon === 'braces') return <BracesIcon {...props} />
  return <ArchiveIcon {...props} />
}
