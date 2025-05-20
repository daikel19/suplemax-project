// src/context/UserContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const UsuarioContext = createContext();

export function UserProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("usuario");
    if (stored) {
      const parsed = JSON.parse(stored);
      setUsuario(parsed);
      setCargando(false);
    } else {
      fetch("http://localhost/suplemax-project/php/get_session.php", {
        credentials: "include",
      })
        .then(res => res.json())
        .then(data => {
          if (data?.session?.usuario_id) {
            const sessionData = {
              id: data.session.usuario_id,
              nombre: data.session.usuario_nombre,
              email: data.session.usuario_email,
            };
            setUsuario(sessionData);
            localStorage.setItem("usuario", JSON.stringify(sessionData));
          }
        })
        .catch(err => console.error("❌ Error cargando sesión:", err))
        .finally(() => setCargando(false));
    }
  }, []);

  const loginUsuario = (data) => {
    setUsuario(data);
    localStorage.setItem("usuario", JSON.stringify(data));
  };

  const logoutUsuario = () => {
    setUsuario(null);
    localStorage.removeItem("usuario");
  };

  return (
    <UsuarioContext.Provider value={{ usuario, loginUsuario, logoutUsuario, cargando }}>
      {children}
    </UsuarioContext.Provider>
  );
}

export const useUsuario = () => useContext(UsuarioContext);
