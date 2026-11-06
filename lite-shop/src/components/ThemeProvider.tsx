import { useEffect, useState, type ReactNode } from 'react'
import { ThemeContext, type Theme } from '../theme'

interface ThemeProviderProps {
  children: ReactNode
}

const STORAGE_KEY = 'lite-shop-theme'

// Storage can throw in private windows or when site data is blocked, so treat failures as "nothing saved"
function readSavedTheme(): Theme | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved === 'light' || saved === 'dark' ? saved : null
  } catch {
    return null
  }
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  // Use the saved choice, otherwise the operating system's preference
  const [theme, setTheme] = useState<Theme>(
    () => readSavedTheme() ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
  )

  // Tailwind's dark: classes react to the .dark class on <html>
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Not saved; the theme still applies for this visit
    }
  }

  return <ThemeContext value={{ theme, toggleTheme }}>{children}</ThemeContext>
}
