import { useState } from 'react'
import { CopyButton } from '../components/CopyButton'
import { ToolLayout } from '../components/ToolLayout'
import type { ToolDefinition } from '../data'
import { transformUrl, type UrlMode } from '../lib/url'

export function UrlEncodePage({ tool, onBack }: { tool: ToolDefinition; onBack: () => void }) {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<UrlMode>('component')
  const [error, setError] = useState('')
  const run = (action: 'encode' | 'decode') => {
    try { setOutput(transformUrl(input, mode, action)); setError('') }
    catch { setOutput(''); setError('无法解码：请检查输入中是否有不完整的百分号编码') }
  }
  const swap = () => { setInput(output); setOutput(input) }
  return <ToolLayout tool={tool} onBack={onBack}>
    <div className="mode-switch"><span>处理模式</span><button className={mode === 'component' ? 'active' : ''} onClick={() => setMode('component')}>URL 组件 <small>encodeURIComponent</small></button><button className={mode === 'uri' ? 'active' : ''} onClick={() => setMode('uri')}>完整 URL <small>encodeURI</small></button></div>
    <div className="work-grid split-layout"><section className="panel"><div className="panel-label"><span>输入内容</span><span className="char-count">{input.length} 字符</span></div><textarea className="text-input" value={input} onChange={(event) => setInput(event.target.value)} placeholder="输入需要编码或解码的内容" spellCheck={false} /><div className="panel-actions"><button className="button button-secondary" onClick={() => setInput('')}>清空</button><button className="button button-primary" onClick={() => run('encode')}>编码</button><button className="button button-primary" onClick={() => run('decode')}>解码</button></div></section><section className="panel output-panel"><div className="panel-label"><span>处理结果</span><span className="char-count">{output.length} 字符</span></div><textarea className="text-input" value={output} readOnly placeholder="结果会显示在这里" spellCheck={false} />{error && <p className="error-text">{error}</p>}<div className="panel-actions"><button className="button button-secondary" onClick={swap} disabled={!output}>⇄ 交换</button><CopyButton value={output} /></div></section></div>
    <p className="tip-line">组件编码适合查询参数和文本片段；完整 URL 模式会保留 URL 结构中的保留字符。</p>
  </ToolLayout>
}
