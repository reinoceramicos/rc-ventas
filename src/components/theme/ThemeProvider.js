import React, { createContext, useContext, useState, useEffect, useRef } from "react"

// Crea el contexto para el tema
const ThemeContext = createContext()

// Exporta un hook para consumir el contexto de tema
export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error("useTheme debe usarse dentro de ThemeProvider")
  return context
}

// Define el ThemeProvider que envuelve la app
export function ThemeProvider({ children }) {
  // Declara el estado isDark para el tema oscuro
  const [isDark, setIsDark] = useState(false)
  const [isSystemTheme, setIsSystemTheme] = useState(true)
  const [isInitialized, setIsInitialized] = useState(false)
  const isSystemThemeRef = useRef(true)

  useEffect(() => {
    isSystemThemeRef.current = isSystemTheme
  }, [isSystemTheme])

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    const savedSystemTheme = localStorage.getItem("isSystemTheme")
    
    if (savedSystemTheme !== null) {
      setIsSystemTheme(savedSystemTheme === "true")
    }

    if (savedTheme && savedSystemTheme === "false") {
      setIsDark(savedTheme === "dark")
    } else if (typeof window !== "undefined" && window.matchMedia) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
      setIsDark(mediaQuery.matches)
    }

    setIsInitialized(true)
  }, [])

  useEffect(() => {
    if (!isInitialized) return

    if (typeof window !== "undefined" && window.matchMedia) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
      
      const handleSystemThemeChange = (e) => {
        if (isSystemThemeRef.current) {
          setIsDark(e.matches)
        }
      }

      mediaQuery.addEventListener("change", handleSystemThemeChange)
      
      return () => {
        mediaQuery.removeEventListener("change", handleSystemThemeChange)
      }
    }
  }, [isInitialized])

  useEffect(() => {
    if (!isInitialized) return
    
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light")
    if (!isSystemTheme) {
      localStorage.setItem("theme", isDark ? "dark" : "light")
    }
    localStorage.setItem("isSystemTheme", isSystemTheme.toString())
  }, [isDark, isSystemTheme, isInitialized])

  // Define función para alternar el tema
  const toggleTheme = () => {
    setIsSystemTheme(false)
    setIsDark(prev => !prev)
  }

  const useSystemTheme = () => {
    setIsSystemTheme(true)
    if (typeof window !== "undefined" && window.matchMedia) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
      setIsDark(mediaQuery.matches)
    }
  }

  // Provee isDark, toggleTheme, useSystemTheme y isSystemTheme a los componentes hijos
  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, useSystemTheme, isSystemTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
