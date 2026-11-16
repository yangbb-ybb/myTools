import { useEffect, useRef, useState } from 'react'
import QRCode from 'qrcode'
import { CopyButton } from '../components/CopyButton'
import { DownloadIcon } from '../components/Icons'
import { ToolLayout } from '../components/ToolLayout'
import type { ToolDefinition } from '../data'
import { isHttpUrl } from '../lib/url'

export function QrCodePage({ tool, onBack }: { tool: ToolDefinition; onBack: () => void }) {
  const [value, setValue] = useState('')
  const [qr, setQr] = useState('')
  const [error, setError] = useState('')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!value) { setQr(''); setError(''); return }
    if (!isHttpUrl(value)) { setQr(''); setError('请输入以 http:// 或 https:// 开头的有效 URL'); return }
    setError('')
    QRCode.toDataURL(value, { width: 720, margin: 2, color: { dark: '#1d2433', light: '#ffffff' } })
      .then(setQr)
      .catch(() => { setQr(''); setError('URL 太长，无法生成二维码，请缩短后重试') })
  }, [value])

  const download = () => {
    if (!qr) return
    const link = document.createElement('a')
    link.href = qr
    link.download = 'toolbox-qrcode.png'
    link.click()
  }

  return <ToolLayout tool={tool} onBack={onBack}>
    <div className="work-grid qr-layout">
      <section className="panel input-panel"><div className="panel-label"><span>输入 URL</span><span className="char-count">{value.length} 字符</span></div>
        <textarea className="text-input qr-input" value={value} onChange={(event) => setValue(event.target.value)} placeholder="https://example.com" spellCheck={false} />
        {error && <p className="error-text">{error}</p>}
        <div className="panel-actions"><button className="button button-primary" onClick={() => setValue('')} disabled={!value}>清空</button><CopyButton value={value} label="复制 URL" /></div>
      </section>
      <section className="panel preview-panel"><div className="panel-label"><span>二维码预览</span><span className="live-tag">实时生成</span></div><div className="qr-frame">{qr ? <img src={qr} alt="URL 二维码" /> : <span className="placeholder">输入有效 URL 后<br />二维码会显示在这里</span>}</div><button className="button button-primary full-button" onClick={download} disabled={!qr}><DownloadIcon width={16} height={16} /> 下载 PNG</button></section>
    </div>
    <p className="tip-line">二维码只包含你输入的文本，Toolbox 不会访问或验证目标网站。</p>
  </ToolLayout>
}
