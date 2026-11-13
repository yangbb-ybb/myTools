import { useState } from 'react'
import { CheckIcon, CopyIcon } from './Icons'

export function CopyButton({ value, label = '复制结果', className = '' }: { value: string; label?: string; className?: string }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    if (!value) return
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }
  return <button className={`button button-secondary ${className}`} onClick={copy} disabled={!value}>
    {copied ? <CheckIcon width={16} height={16} /> : <CopyIcon width={16} height={16} />}
    {copied ? '已复制' : label}
  </button>
}
