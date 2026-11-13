import { useRef, useState, type ChangeEvent, type DragEvent } from 'react'
import { ArchiveIcon, DownloadIcon, FileIcon } from '../components/Icons'
import { ToolLayout } from '../components/ToolLayout'
import type { ToolDefinition } from '../data'

export function RarPage({ tool, onBack }: { tool: ToolDefinition; onBack: () => void }) {
  const [filePath, setFilePath] = useState('')
  const [outputPath, setOutputPath] = useState('')
  const [state, setState] = useState<'idle' | 'working' | 'done' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const available = Boolean(window.toolbox)
  const setSelectedFile = (path: string) => { setFilePath(path); setOutputPath(''); setState('idle'); setMessage('') }
  const choose = async () => {
    if (window.toolbox) {
      const path = await window.toolbox.selectArchive()
      if (path) setSelectedFile(path)
    } else {
      inputRef.current?.click()
    }
  }
  const onBrowserFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    if (!file.name.toLowerCase().endsWith('.rar')) { setState('error'); setMessage('请选择 .rar 文件，其他格式暂不支持。'); return }
    setSelectedFile(file.name)
    setMessage('浏览器预览已选择文件；请使用桌面应用执行本地转换。')
  }
  const onDragOver = (event: DragEvent<HTMLButtonElement>) => { event.preventDefault(); event.dataTransfer.dropEffect = 'copy'; setDragging(true) }
  const onDragLeave = (event: DragEvent<HTMLButtonElement>) => { event.preventDefault(); setDragging(false) }
  const onDrop = (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setDragging(false)
    const file = event.dataTransfer.files[0]
    if (!file) return
    if (!file.name.toLowerCase().endsWith('.rar')) { setState('error'); setMessage('请选择 .rar 文件，其他格式暂不支持。'); return }
    const path = window.toolbox?.getFilePath(file)
    if (path) setSelectedFile(path)
    else {
      setSelectedFile(file.name)
      setMessage('浏览器预览已选择文件；请使用桌面应用执行本地转换。')
    }
  }
  const convert = async () => {
    if (!filePath) return
    if (!window.toolbox) {
      setState('error')
      setMessage('当前是浏览器开发模式，不能直接读写本地文件。请在桌面应用中运行后转换。')
      return
    }
    const save = await window.toolbox.saveFile(filePath.replace(/\.rar$/i, '') + '.zip')
    if (!save) return
    setOutputPath(save); setState('working'); setMessage('正在转换，请稍候…')
    const result = await window.toolbox.convertRarToZip(filePath, save)
    if (result?.ok) { setState('done'); setMessage('转换完成，ZIP 文件已保存到你选择的位置。') } else { setState('error'); setMessage(result?.error ?? '转换失败，请检查压缩包后重试。') }
  }
  return <ToolLayout tool={tool} onBack={onBack}>
    <section className="rar-panel panel"><div className="rar-intro"><div className="tool-icon orange"><ArchiveIcon width={26} height={26} /></div><div><h2>本地转换</h2><p>文件不会上传网络，原始 RAR 也不会被修改。</p></div></div><input ref={inputRef} className="file-input" type="file" accept=".rar,application/vnd.rar" onChange={onBrowserFile} /><button className={`drop-zone ${dragging ? 'dragging' : ''}`} onClick={choose} onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}><FileIcon width={30} height={30} /><strong>{filePath ? filePath.split(/[\\/]/).pop() : '拖入 RAR 文件，或点击选择'}</strong><span>{filePath ? '已选择文件，可开始转换' : '支持单文件 .rar · 暂不支持密码和分卷压缩包'}</span></button>{state === 'working' && <div className="progress-line"><span /><p>正在处理 RAR 文件…</p></div>}{message && <p className={`status-message ${state}`}>{message}</p>}<div className="panel-actions rar-actions"><button className="button button-secondary" onClick={() => { setFilePath(''); setOutputPath(''); setState('idle'); setMessage('') }} disabled={!filePath}>清空</button><button className="button button-primary" onClick={convert} disabled={!filePath || state === 'working'}><DownloadIcon width={16} height={16} /> {state === 'done' ? '再次转换' : '开始转换'}</button></div></section>
    <div className="notice-card"><span className="notice-icon">i</span><div><strong>首版支持范围</strong><p>支持普通 RAR4 / RAR5、中文文件名和嵌套目录。加密、分卷或损坏的 RAR 暂不支持。当前开发环境如果没有配置本地 7zz 组件，会提示如何补充依赖。</p></div></div>
    {!available && <div className="dev-note">当前是浏览器预览模式。打包为桌面应用后将启用本地文件选择与转换。</div>}
  </ToolLayout>
}
