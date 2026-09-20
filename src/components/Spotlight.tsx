import { useRef, type KeyboardEvent, type MouseEvent, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  padding?: string
  onClick?: () => void
  label?: string
}

// Card whose hover glow follows the cursor.
export default function Spotlight({
  children,
  className = '',
  padding = 'p-6',
  onClick,
  label,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--x', `${e.clientX - r.left}px`)
    el.style.setProperty('--y', `${e.clientY - r.top}px`)
  }

  const onKey = (e: KeyboardEvent) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      onClick()
    }
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onClick={onClick}
      onKeyDown={onKey}
      {...(onClick ? { role: 'button', tabIndex: 0, 'aria-label': label } : {})}
      className={`surface spotlight relative overflow-hidden ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      <div className="spotlight-glow pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300" />
      <div className={`relative h-full ${padding}`}>{children}</div>
    </div>
  )
}
