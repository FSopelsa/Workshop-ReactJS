import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  pages: number[]
  lastPage: number
}

const buttonBase =
  'inline-flex h-9 w-9 items-center justify-center rounded-lg border font-medium transition-all duration-200'
const buttonIdle =
  'border-slate-200 bg-white text-slate-500 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50'
const buttonActive = 'border-blue-600 bg-blue-600 text-white'

export default function Pagination({ currentPage, pages, lastPage }: PaginationProps) {
  return (
    <nav className="mt-8 flex items-center justify-center gap-2" aria-label="Pagination">
      <button
        type="button"
        className={`${buttonBase} ${buttonIdle}`}
        aria-label="Previous page"
        title="Previous"
      >
        <ChevronLeft size={18} />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          aria-current={page === currentPage ? 'page' : undefined}
          className={`${buttonBase} ${page === currentPage ? buttonActive : buttonIdle}`}
        >
          {page}
        </button>
      ))}

      <span className="px-2 text-sm text-slate-400">…</span>
      <button type="button" className={`${buttonBase} ${buttonIdle}`}>
        {lastPage}
      </button>

      <button type="button" className={`${buttonBase} ${buttonIdle}`} aria-label="Next page" title="Next">
        <ChevronRight size={18} />
      </button>
    </nav>
  )
}
