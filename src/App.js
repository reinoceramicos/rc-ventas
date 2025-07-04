// src/App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import RoutesUrls, { PrivateRoutes } from "./router/Router";
import { Toaster } from "react-hot-toast";
import supabase from "./utils/sup-config/supabaseConfig";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import NoPermitido from "./views/noPermitido/NoPermitido";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./utils/auth/ProtectedRoute";

function SessionManager({ setSession }) {
  const navigate = useNavigate();

  // Guarda evento de autenticación en sessionStorage
  const saveEventToSessionStorage = (eventType) => {
    sessionStorage.setItem("authEvent", eventType);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      console.log(":D EVENTO: ", _event);
      saveEventToSessionStorage(_event);
      setSession(session);

      if (_event === "PASSWORD_RECOVERY") {
        navigate("/password-recovery");
      }
    });
  }, [navigate, setSession]);

  return null;
}

function App() {
  const [session, setSession] = useState(null);

  return (
    <ThemeProvider>
      <Toaster position="bottom-center" />
      <BrowserRouter>
        <SessionManager setSession={setSession} />

        {session ? (
          <Routes>
            {/* Ruta no protegida para mostrar mensaje de no autorizado */}
            <Route
              path="/no-permitido"
              element={
                <Layout children={NoPermitido} pageName={"NoPermitido"} hideTheFooter={true} />
              }
            />

            {/* Rutas protegidas solo para usuarios admin */}
            {PrivateRoutes.filter(route => route.path !== "/no-permitido").map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                element={
                  <ProtectedRoute>
                    <route.main />
                  </ProtectedRoute>
                }
              />
            ))}

            {/* Redirigir cualquier ruta desconocida al home */}
            <Route path="/*" element={<Navigate to="/" replace />} />
          </Routes>
        ) : (
          <Routes>
            {RoutesUrls.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                element={<route.main />}
              />
            ))}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        )}
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
