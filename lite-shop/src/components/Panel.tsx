import type { ReactNode } from 'react'

interface PanelProps {
  children: ReactNode
}

export default function Panel({ children }: PanelProps) {
  return (
    <div className="border border-slate-200 rounded-[1.25rem] bg-slate-50/50 backdrop-blur-xs shadow-xs transition-all duration-300 hover:shadow-xl hover:border-blue-400 p-5">
      {children}
    </div>
  )
}
