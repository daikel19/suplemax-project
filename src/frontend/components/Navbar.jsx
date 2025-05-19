import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Search } from 'lucide-react';

export default function Navbar() {
  const [usuario, setUsuario] = useState(null);
  const [menuAbierto, setMenuAbierto] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    if (storedUser) {
      try {
        setUsuario(JSON.parse(storedUser));
      } catch (e) {
        console.error("Error al parsear el usuario:", e);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    setUsuario(null);
    window.location.href = "/";
  };

  return (
    <header className="w-full bg-white text-black shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold uppercase tracking-wide">
          Suplemax
        </Link>

        <nav className="flex items-center gap-6">
          <Link to="/productos" className="hover:text-gray-600">Productos</Link>
          <Link to="/categorias" className="hover:text-gray-600">Categorías</Link>
          <Link to="/contacto" className="hover:text-gray-600">Contacto</Link>
          <Link to="/busqueda" className="hover:text-gray-600">
            <Search className="w-5 h-5" />
          </Link>

          <Link to="/carrito" className="hover:text-gray-600">
            <ShoppingCart className="w-5 h-5" />
          </Link>

          {usuario ? (
            <div className="relative group">
              <button
                onClick={() => setMenuAbierto(!menuAbierto)}
                className="flex items-center gap-1 text-sm font-medium focus:outline-none"
              >
                <User className="w-5 h-5" />
                <span>{usuario.nombre || usuario.email}</span>
              </button>

              {menuAbierto && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
                  <div className="px-4 py-2 border-b text-sm text-gray-700">{usuario.email}</div>
                  <Link to="/perfil" className="block px-4 py-2 hover:bg-gray-100 text-sm">Perfil</Link>
                  <Link to="/configuracion" className="block px-4 py-2 hover:bg-gray-100 text-sm">Configuración</Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/auth/login" className="hover:text-gray-600">
              <User className="w-5 h-5" />
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
