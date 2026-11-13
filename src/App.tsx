import { useEffect, useState } from 'react'
import { tools, type ToolId } from './data'
import { EmptyState } from './components/EmptyState'
import { MenuIcon, MoonIcon, SunIcon, XIcon } from './components/Icons'
import { ToolIcon } from './components/ToolIcon'
import { HomePage } from './pages/HomePage'
import { QrCodePage } from './pages/QrCodePage'
import { UrlEncodePage } from './pages/UrlEncodePage'
import { JsonPage } from './pages/JsonPage'
import { RarPage } from './pages/RarPage'

function getRoute(): ToolId {
  const route = window.location.hash.replace(/^#\/?/, '')
  return route.startsWith('tools/') ? (route.replace('tools/', '') as ToolId) : 'home'
}

export default function App() {
  const [route, setRoute] = useState<ToolId>(getRoute())
  const [dark, setDark] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => { const onHash = () => setRoute(getRoute()); window.addEventListener('hashchange', onHash); return () => window.removeEventListener('hashchange', onHash) }, [])
  useEffect(() => { document.documentElement.dataset.theme = dark ? 'dark' : 'light' }, [dark])
  const navigate = (id: ToolId) => { window.location.hash = id === 'home' ? '/' : `/tools/${id}`; setMenuOpen(false) }
  const current = tools.find((tool) => tool.id === route)
  return <div className="app-shell"><aside className={`sidebar ${menuOpen ? 'open' : ''}`}><div className="brand"><div className="brand-mark"><span /><span /><span /></div><span>Toolbox</span><small>v0.1</small><button className="mobile-close" onClick={() => setMenuOpen(false)}><XIcon width={18} height={18} /></button></div><nav><button className={`nav-item ${route === 'home' ? 'selected' : ''}`} onClick={() => navigate('home')}><span className="nav-home">⌂</span><span>工具首页</span></button><div className="nav-label">我的工具</div>{tools.map((tool) => <button key={tool.id} className={`nav-item ${route === tool.id ? 'selected' : ''}`} onClick={() => navigate(tool.id)}><span className={`nav-icon ${tool.accent}`}><ToolIcon icon={tool.icon} size={16} /></span><span>{tool.title}</span></button>)}</nav><div className="sidebar-footer"><div className="offline-pill"><span className="status-dot" /> 所有功能均可离线使用</div><button className="theme-toggle" onClick={() => setDark((value) => !value)}>{dark ? <SunIcon width={16} height={16} /> : <MoonIcon width={16} height={16} />} {dark ? '浅色模式' : '深色模式'}</button></div></aside><div className="main-wrap"><header className="topbar"><button className="mobile-menu" onClick={() => setMenuOpen(true)}><MenuIcon width={21} height={21} /></button><div className="breadcrumb"><span>Toolbox</span>{current && <><b>/</b><span>{current.title}</span></>}</div><span className="topbar-badge"><span className="status-dot" /> 本地运行</span></header>{route === 'home' ? <HomePage onSelect={(id) => navigate(id as ToolId)} /> : current ? route === 'qr' ? <QrCodePage tool={current} onBack={() => navigate('home')} /> : route === 'url' ? <UrlEncodePage tool={current} onBack={() => navigate('home')} /> : route === 'json' ? <JsonPage tool={current} onBack={() => navigate('home')} /> : <RarPage tool={current} onBack={() => navigate('home')} /> : <EmptyState />}</div></div>
}
