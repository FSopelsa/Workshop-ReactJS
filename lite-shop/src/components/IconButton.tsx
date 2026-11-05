import type { ReactNode } from 'react'

interface IconButtonProps {
  label: string
  children: ReactNode
  className?: string
  onClick?: () => void
}

export default function IconButton({ label, children, className = '', onClick }: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-[0.75rem] bg-blue-500/30 text-blue-50 transition-all duration-200 hover:text-white hover:bg-blue-500/50 border border-blue-400/20 ${className}`}
    >
      {children}
    </button>
  )
}
