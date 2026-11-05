import { useId, type ReactNode } from 'react'

interface FilterSectionProps {
  title: string
  action?: ReactNode
  spacing?: 'space-y-3' | 'space-y-4'
  children: ReactNode
}

export default function FilterSection({ title, action, spacing = 'space-y-4', children }: FilterSectionProps) {
  const titleId = useId()

  return (
    <section aria-labelledby={titleId} className={spacing}>
      <div className="flex items-center justify-between">
        <h2 id={titleId} className="text-sm font-bold text-slate-900 dark:text-white">
          {title}
        </h2>
        {action}
      </div>
      {children}
    </section>
  )
}
