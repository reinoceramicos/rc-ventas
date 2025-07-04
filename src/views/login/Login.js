import { useState } from 'react';
import { handleGoogleLogin } from '../../utils/actions/actions';
import ReinoCeramico11 from '../../components/brand/ReinoCeramico11';
import { useTheme } from '../../components/theme/ThemeProvider';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false)
  const { isDark } = useTheme()

  function handleLogin(){
    setIsLoading(true)

    try {
      handleGoogleLogin()
    } catch (error) {
      console.log(':D ', error)
    }finally{
      setIsLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-background">
        <div className="bg-gradient"></div>
        <div className="bg-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>

      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="logo">
              <ReinoCeramico11 color={isDark ? '#FFFFFF' : '#191919'}/>
              <h1>Ventas</h1>
            </div>
            <p>Una plataforma de Reino Ceramicos</p>
          </div>

          <button 
            className='text-center rounded-[8px] p-2 w-full bg-[#0D1BD4] text-white'
            onClick={()=> handleLogin()}
          >
            Iniciar con Google</button>
        </div>
      </div>
    </div>
  );
}
