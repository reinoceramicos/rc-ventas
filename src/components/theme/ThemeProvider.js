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

  // Al montar, obtiene el tema guardado o usa la preferencia del sistema
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      setIsDark(savedTheme === "dark")
    } else if (typeof window !== "undefined" && window.matchMedia) {
      setIsDark(window.matchMedia("(prefers-color-scheme: dark)").matches)
    }
  }, [])

  // Actualiza el atributo data-theme y localStorage cuando isDark cambie
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light")
    localStorage.setItem("theme", isDark ? "dark" : "light")
  }, [isDark])

  // Define función para alternar el tema
  const toggleTheme = () => setIsDark(prev => !prev)

  // Provee isDark y toggleTheme a los componentes hijos
  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
