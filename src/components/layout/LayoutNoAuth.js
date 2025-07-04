import React, { Suspense } from 'react'
// import './Layout.css'
import { isMobile } from 'react-device-detect';
// import NavbarNoAuth from '../componentes/Navbar/NavbarNoAuth';

export default function LayoutNoAuth({ children, fullDark }) {

  let environment = isMobile ? 'layoutMobile' : 'layoutDesktop'

  const Children = children;

  return (
      <Suspense fallback={ 'Cargando...' } >
        {/* <NavbarNoAuth fullDark={fullDark} /> */}
        <main className={environment + ' LayoutNoAuth'}>  
          <Children/>
        </main>
      </Suspense>
  )
}