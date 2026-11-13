import type { CSSProperties } from 'react'
import { ArrowUpRight } from './Icons'
import { ToolIcon } from './ToolIcon'
import type { ToolDefinition } from '../data'

export function ToolCard({ tool, onClick, index }: { tool: ToolDefinition; onClick: () => void; index: number }) {
  return <button className="tool-card" onClick={onClick} style={{ '--delay': `${index * 70}ms` } as CSSProperties}>
    <div className={`tool-icon ${tool.accent}`}><ToolIcon icon={tool.icon} size={24} /></div>
    <div className="tool-card-copy"><h3>{tool.title}</h3><p>{tool.description}</p></div>
    <span className="card-arrow"><ArrowUpRight width={18} height={18} /></span>
  </button>
}
