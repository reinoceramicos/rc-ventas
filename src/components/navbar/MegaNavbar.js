import { useState } from "react"
import { useTheme } from "../theme/ThemeProvider"
import { handleLogout } from "../../utils/actions/actions"
import { Bug } from "lucide-react"
import supabase from "../../utils/sup-config/supabaseConfig"
import axios from "axios"
import ReinoCeramico11 from "../brand/ReinoCeramico11"

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme()
  const [loading, setLoading] = useState(false)

  function onLogout(){
    setLoading(true)
    handleLogout()
  }

  async function getSessionData() {
    try {
      const {data} = await supabase.auth.getSession()
      console.log("esta es la sesión")
      console.log(data.session.access_token)

      const response = await axios.get(`${process.env.REACT_APP_REINO_API}/ventas`, {
        headers: { Authorization: `Bearer ${data.session.access_token}` }
      })
      console.log(response)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-brand">
          <div className="brand-logo">
            <ReinoCeramico11 color={isDark ? '#ffffff' : '#191919'}/>
          </div>
          <span className="brand-name">Ventas</span>
        </div>

        <div className="navbar-actions">
          <button onClick={toggleTheme} className="theme-toggle" aria-label="Cambiar tema">
            <div className="toggle-container">
              <div className="toggle-switch">
                <div className="toggle-thumb">
                  {isDark ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M21 12.79A9 9 0 1 1 11.21 3A7 7 0 0 0 21 12.79Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
                      <path
                        d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          </button>

          <button onClick={onLogout} className="logout-button" disabled={loading}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="currentColor" strokeWidth="2" />
              <polyline points="16,17 21,12 16,7" stroke="currentColor" strokeWidth="2" />
              <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="2" />
            </svg>
            <span>Cerrar Sesión</span>
          </button>

          {
            false && <button onClick={()=> getSessionData()}>
            <Bug/>
          </button>
          }
        </div>
      </div>
    </nav>
  )
}
