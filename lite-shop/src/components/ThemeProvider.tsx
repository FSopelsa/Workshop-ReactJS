import { useEffect, useState, type ReactNode } from 'react'
import { ThemeContext, type Theme } from '../theme'

interface ThemeProviderProps {
  children: ReactNode
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  // Start with the operating system's preference
  const [theme, setTheme] = useState<Theme>(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
  )

  // Tailwind's dark: classes react to the .dark class on <html>
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const toggleTheme = () => setTheme((current) => (current === 'light' ? 'dark' : 'light'))

  return <ThemeContext value={{ theme, toggleTheme }}>{children}</ThemeContext>
}
