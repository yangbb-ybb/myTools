import type { SVGProps } from 'react'

type Props = SVGProps<SVGSVGElement>

const iconProps: Props = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }

export function ArrowLeft(props: Props) { return <svg {...iconProps} {...props}><path d="m15 18-6-6 6-6" /></svg> }
export function ArrowUpRight(props: Props) { return <svg {...iconProps} {...props}><path d="M7 17 17 7M7 7h10v10" /></svg> }
export function BracesIcon(props: Props) { return <svg {...iconProps} {...props}><path d="M8 3H6a2 2 0 0 0-2 2v4a3 3 0 0 1-2 3 3 3 0 0 1 2 3v4a2 2 0 0 0 2 2h2M16 3h2a2 2 0 0 1 2 2v4a3 3 0 0 0 2 3 3 3 0 0 0-2 3v4a2 2 0 0 1-2 2h-2M10 8h4M10 12h4M10 16h4" /></svg> }
export function LinkIcon(props: Props) { return <svg {...iconProps} {...props}><path d="M10 13a5 5 0 0 0 7.54.54l2-2a5 5 0 0 0-7.07-7.07l-1.14 1.14M14 11a5 5 0 0 0-7.54-.54l-2 2a5 5 0 0 0 7.07 7.07l1.14-1.14" /></svg> }
export function QrIcon(props: Props) { return <svg {...iconProps} {...props}><path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h2v2h-2zM18 14h2v6h-6v-2M14 18h2" /></svg> }
export function ArchiveIcon(props: Props) { return <svg {...iconProps} {...props}><path d="M4 7h16v13H4zM3 4h18v3H3zM10 11h4M10 14h4" /></svg> }
export function CopyIcon(props: Props) { return <svg {...iconProps} {...props}><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M15 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h3"/></svg> }
export function DownloadIcon(props: Props) { return <svg {...iconProps} {...props}><path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" /></svg> }
export function CheckIcon(props: Props) { return <svg {...iconProps} {...props}><path d="m5 12 4 4L19 6" /></svg> }
export function SparkleIcon(props: Props) { return <svg {...iconProps} {...props}><path d="m12 3-1.2 4.2a4 4 0 0 1-2.8 2.8L4 11l4 1a4 4 0 0 1 2.8 2.8L12 19l1.2-4.2a4 4 0 0 1 2.8-2.8l4-1-4-1a4 4 0 0 1-2.8-2.8L12 3ZM19 17l-.4 1.6L17 19l1.6.4L19 21l.4-1.6L21 19l-1.6-.4L19 17Z" /></svg> }
export function MoonIcon(props: Props) { return <svg {...iconProps} {...props}><path d="M20.5 14.4A8.5 8.5 0 0 1 9.6 3.5 8.5 8.5 0 1 0 20.5 14.4Z" /></svg> }
export function SunIcon(props: Props) { return <svg {...iconProps} {...props}><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></svg> }
export function MenuIcon(props: Props) { return <svg {...iconProps} {...props}><path d="M4 6h16M4 12h16M4 18h16" /></svg> }
export function XIcon(props: Props) { return <svg {...iconProps} {...props}><path d="m6 6 12 12M18 6 6 18" /></svg> }
export function FileIcon(props: Props) { return <svg {...iconProps} {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/></svg> }
