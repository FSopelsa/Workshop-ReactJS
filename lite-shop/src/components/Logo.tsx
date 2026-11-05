import { Package } from 'lucide-react'

interface LogoProps {
  variant: 'light' | 'dark'
}

const variants = {
  light: { link: 'text-white', box: 'bg-white text-blue-600 shadow-md' },
  dark: { link: 'text-slate-900 dark:text-white', box: 'bg-blue-600 text-white shadow-lg' },
}

export default function Logo({ variant }: LogoProps) {
  const styles = variants[variant]

  return (
    <a href="#" className={`flex items-center gap-2 font-bold tracking-tight ${styles.link}`}>
      <span className={`inline-flex h-8 w-8 items-center justify-center rounded-lg ${styles.box}`}>
        <Package size={20} strokeWidth={2.5} />
      </span>
      <span className="text-xl tracking-tighter uppercase font-black">LITE.SHOP</span>
    </a>
  )
}
