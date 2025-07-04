import React, { Suspense, useEffect, useState } from 'react'
import './Layout.css'
import { isMobile } from 'react-device-detect';
import { getUserData } from '../../utils/actions/actions';
import Navbar from '../navbar/MegaNavbar';

export default function Layout({ children, fullDark }) {

    const [userData, setUserData] = useState(null)
  
    useEffect(() => {
      const fetchUserData = async () => {
        const user = await getUserData();
        setUserData(user); // Actualiza el estado con los datos del usuario
      };
  
      fetchUserData();
    }, []);
  

  let environment = isMobile ? 'layoutMobile' : 'layoutDesktop'
  const Children = children;

  return (
    <Suspense fallback={ 'Cargando...' } >
      <main className={environment}>
        <Navbar userData={userData} fullDark={fullDark} />
        <Children userData={userData}/>
      </main>
    </Suspense>
  )
}