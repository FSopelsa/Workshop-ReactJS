import { Menu, Search, ShoppingBag, User } from 'lucide-react'
import IconButton from './IconButton'
import Logo from './Logo'

const navLinks = ['New Arrival', 'Men', 'Women', 'Sale']

interface HeaderProps {
  search: string
  onSearchChange: (value: string) => void
}

export default function Header({ search, onSearchChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-blue-700/30 bg-blue-600 shadow-lg shadow-blue-900/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Logo variant="light" />

          <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-blue-100">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="relative transition-colors duration-200 hover:text-white after:content-[''] after:absolute after:left-0 after:-bottom-1.5 after:w-full after:h-[2px] after:scale-x-0 after:origin-center after:bg-white after:transition-transform after:duration-300 hover:after:scale-x-100 after:rounded-full"
              >
                {link}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="mr-4 hidden items-center gap-2 rounded-full bg-blue-500/30 px-3 py-1 lg:flex border border-blue-400/20">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-200 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-100"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-50">Live</span>
            </div>

            <div className="relative hidden sm:block">
              <input
                type="search"
                value={search}
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder="Search products..."
                aria-label="Search products"
                className="h-10 w-48 rounded-[0.75rem] bg-blue-500/30 pl-10 pr-4 text-xs font-medium text-blue-50 placeholder:text-blue-200/50 border border-blue-400/20 focus:bg-blue-500/50 focus:w-64 transition-all duration-300 outline-none"
              />
              <Search size={16} strokeWidth={2.5} className="absolute left-3.5 top-3 text-blue-200" />
            </div>

            <IconButton label="Cart">
              <ShoppingBag size={20} />
            </IconButton>
            <IconButton label="Account">
              <User size={20} />
            </IconButton>
            <IconButton label="Menu" className="md:hidden">
              <Menu size={24} strokeWidth={2.5} />
            </IconButton>
          </div>
        </div>
      </div>
    </header>
  )
}
