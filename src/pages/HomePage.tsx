import { tools } from '../data'
import { ToolCard } from '../components/ToolCard'
import { SparkleIcon } from '../components/Icons'

export function HomePage({ onSelect }: { onSelect: (id: string) => void }) {
  return <main className="home-page">
    <div className="hero">
      <div className="hero-kicker"><span className="status-dot" /> 离线工具箱 · 本地优先</div>
      <h1>把琐碎的事，<br /><em>一次做好。</em></h1>
      <p>一组轻量、专注、无需上传的日常工具。<br />打开即用，所有处理都在你的设备上完成。</p>
      <div className="hero-spark"><SparkleIcon width={18} height={18} /></div>
    </div>
    <div className="section-heading"><div><p className="eyebrow">YOUR TOOLKIT</p><h2>工具列表</h2></div><span className="tool-count">{tools.length} 个工具</span></div>
    <div className="tool-grid">{tools.map((tool, index) => <ToolCard key={tool.id} tool={tool} index={index} onClick={() => onSelect(tool.id)} />)}</div>
    <div className="privacy-note"><span className="lock-mark">⌁</span><span><strong>你的数据留在本地</strong><br />Toolbox 不会上传你的 URL、JSON 或文件。</span></div>
  </main>
}
