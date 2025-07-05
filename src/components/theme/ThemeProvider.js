import React, { createContext, useContext, useState, useEffect } from "react"

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

  // Al montar, obtiene el tema guardado o usa la preferencia del sistema
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
      
      const handleSystemThemeChange = (e) => {
        if (isSystemTheme) {
          setIsDark(e.matches)
        }
      }

      mediaQuery.addEventListener("change", handleSystemThemeChange)
      
      return () => {
        mediaQuery.removeEventListener("change", handleSystemThemeChange)
      }
    }
  }, [isSystemTheme])

  // Actualiza el atributo data-theme y localStorage cuando isDark cambie
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light")
    if (!isSystemTheme) {
      localStorage.setItem("theme", isDark ? "dark" : "light")
    }
    localStorage.setItem("isSystemTheme", isSystemTheme.toString())
  }, [isDark, isSystemTheme])

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
