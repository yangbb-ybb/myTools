import { useState } from 'react'
import { CopyButton } from '../components/CopyButton'
import { DownloadIcon } from '../components/Icons'
import { ToolLayout } from '../components/ToolLayout'
import type { ToolDefinition } from '../data'
import { formatJson, minifyJson } from '../lib/json'

const sample = '{\n  "name": "Toolbox",\n  "features": ["二维码", "JSON 格式化"],\n  "offline": true\n}'

export function JsonPage({ tool, onBack }: { tool: ToolDefinition; onBack: () => void }) {
  const [input, setInput] = useState(sample)
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [indent, setIndent] = useState<number | string>(2)
  const run = (type: 'format' | 'minify') => {
    const result = type === 'format' ? formatJson(input, indent) : minifyJson(input)
    if (result.ok) { setOutput(result.value); setError('') } else { setOutput(''); setError(result.error) }
  }
  const download = () => {
    if (!output) return
    const blob = new Blob([output], { type: 'application/json;charset=utf-8' })
    const link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.download = 'formatted.json'; link.click(); URL.revokeObjectURL(link.href)
  }
  return <ToolLayout tool={tool} onBack={onBack}>
    <div className="json-toolbar"><span>缩进</span><select value={indent} onChange={(event) => setIndent(event.target.value === 'tab' ? '\t' : Number(event.target.value))}><option value={2}>2 个空格</option><option value={4}>4 个空格</option><option value="tab">Tab</option></select><span className="json-hint">标准 JSON · 仅在本地解析</span></div>
    <div className="work-grid split-layout"><section className="panel"><div className="panel-label"><span>JSON 输入</span><span className="char-count">{input.length} 字符</span></div><textarea className="text-input code-input" value={input} onChange={(event) => setInput(event.target.value)} placeholder="粘贴 JSON 内容" spellCheck={false} /><div className="panel-actions"><button className="button button-secondary" onClick={() => { setInput(''); setOutput(''); setError('') }}>清空</button><button className="button button-primary" onClick={() => run('format')}>格式化</button><button className="button button-primary" onClick={() => run('minify')}>压缩</button></div></section><section className="panel output-panel"><div className="panel-label"><span>处理结果</span><span className={error ? 'invalid-tag' : 'valid-tag'}>{error ? '格式有误' : output ? '有效 JSON' : '等待处理'}</span></div><textarea className="text-input code-input" value={output} readOnly placeholder="处理结果会显示在这里" spellCheck={false} />{error && <p className="error-text">{error}</p>}<div className="panel-actions"><CopyButton value={output} /><button className="button button-secondary" onClick={download} disabled={!output}><DownloadIcon width={16} height={16} /> 保存 .json</button></div></section></div>
  </ToolLayout>
}
