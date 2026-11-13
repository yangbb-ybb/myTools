import type { ReactNode } from 'react'
import { ArrowLeft } from './Icons'
import { ToolIcon } from './ToolIcon'
import type { ToolDefinition } from '../data'

export function ToolLayout({ tool, onBack, children }: { tool: ToolDefinition; onBack: () => void; children: ReactNode }) {
  return <main className="tool-page">
    <button className="back-link" onClick={onBack}><ArrowLeft width={17} height={17} /> 返回工具箱</button>
    <div className="tool-heading">
      <div className={`tool-icon large ${tool.accent}`}><ToolIcon icon={tool.icon} size={25} /></div>
      <div><p className="eyebrow">TOOLBOX / {tool.id.toUpperCase()}</p><h1>{tool.title}</h1><p className="muted">{tool.detail}</p></div>
    </div>
    {children}
  </main>
}
