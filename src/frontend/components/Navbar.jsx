import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, Search, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useUsuario } from "../context/UserContext";

export default function Navbar() {
  const { usuario, logoutUsuario, cargando } = useUsuario();
  useEffect(() => {
  }, [usuario]);

  const { carrito } = useCart();

  const [menuAbierto, setMenuAbierto] = useState(false);
  const [busquedaAbierta, setBusquedaAbierta] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [recientes, setRecientes] = useState([]);
  const menuRef = useRef(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  if (cargando) return null;

  const totalCantidad = carrito.reduce((acc, p) => acc + p.cantidad, 0);

  useEffect(() => {
    const clickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuAbierto(false);
      if (searchRef.current && !searchRef.current.contains(e.target)) setBusquedaAbierta(false);
    };
    document.addEventListener("mousedown", clickOutside);
    return () => document.removeEventListener("mousedown", clickOutside);
  }, []);

  const guardarBusqueda = (termino) => {
    if (!termino.trim()) return;
    const prev = JSON.parse(localStorage.getItem("busquedas")) || [];
    const nuevas = [termino, ...prev.filter(b => b !== termino)].slice(0, 5);
    localStorage.setItem("busquedas", JSON.stringify(nuevas));
    setRecientes(nuevas);
  };

  const eliminarBusqueda = (termino) => {
    const nuevas = recientes.filter(b => b !== termino);
    localStorage.setItem("busquedas", JSON.stringify(nuevas));
    setRecientes(nuevas);
  };

  const handleBuscar = (e) => {
    e.preventDefault();
    if (!busqueda.trim()) return;
    guardarBusqueda(busqueda);
    navigate(`/productos?buscar=${encodeURIComponent(busqueda)}`);
    setBusqueda("");
    setBusquedaAbierta(false);
  };

  const handleLogout = async () => {
    try {
      await fetch("http://localhost/suplemax-project/php/logout.php", {
        method: "POST",
        credentials: "include",
      });
      logoutUsuario();
      navigate("/");
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
    }
  };

  return (
    <header className="w-full bg-white text-black shadow-sm z-50 relative">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold uppercase tracking-wide">
          Suplemax
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link to="/productos/proteinas" className="hover:text-gray-600">Proteínas</Link>
          <Link to="/productos/creatina" className="hover:text-gray-600">Creatina</Link>
          <Link to="/productos/vitaminas" className="hover:text-gray-600">Vitaminas</Link>
          <Link to="/productos/preentrenos" className="hover:text-gray-600">Preentrenos</Link>
          {/* <Link to="/contacto" className="hover:text-gray-600">Contacto</Link> */}

          {/* Buscador */}
          <div ref={searchRef} className="relative">
            <button onClick={() => setBusquedaAbierta(!busquedaAbierta)}>
              <Search className="w-5 h-5 hover:text-gray-700 transition" />
            </button>
            {busquedaAbierta && (
              <div className="absolute right-0 mt-2 bg-white shadow-xl rounded-lg p-4 w-80 z-50 animate-fade-in">
                <form onSubmit={handleBuscar} className="flex items-center gap-2 mb-3">
                  <input
                    type="text"
                    value={busqueda}
                    onChange={e => setBusqueda(e.target.value)}
                    placeholder="Buscar proteínas, alimentos..."
                    className="flex-grow px-3 py-2 border border-gray-300 rounded text-sm"
                  />
                  <button type="submit" className="bg-black text-white px-4 py-2 rounded">Ir</button>
                </form>

                {recientes.length > 0 && (
                  <div className="text-sm">
                    <p className="text-gray-500 mb-2 font-medium">Búsquedas recientes</p>
                    <ul className="space-y-2">
                      {recientes.map((term, idx) => (
                        <li key={idx} className="flex justify-between items-center hover:bg-gray-50 px-2 py-1 rounded cursor-pointer">
                          <span onClick={() => {
                            setBusqueda(term);
                            handleBuscar({ preventDefault: () => { } });
                          }}>{term}</span>
                          <button onClick={() => eliminarBusqueda(term)} className="text-gray-400 hover:text-red-500">
                            <X size={16} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Carrito */}
          <Link to="/carrito" className="relative">
            <ShoppingCart className="w-5 h-5" />
            {totalCantidad > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalCantidad}
              </span>
            )}
          </Link>

          {/* Usuario */}
          {usuario ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuAbierto(!menuAbierto)}
                className="flex items-center gap-1 text-sm font-medium focus:outline-none"
              >
                <User className="w-5 h-5" />
                <span>{usuario.nombre || usuario.email}</span>
              </button>
              {menuAbierto && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded p-4 z-50">
                  <div className="px-4 py-2 border-b text-sm text-gray-700">{usuario.email}</div>
                  <Link to="/perfil" className="block py-1 hover:underline">Perfil</Link>
                  <Link to="/configuracion" className="block py-1 hover:underline">Configuración</Link>
                  <button type="button" onClick={handleLogout} className="text-red-600 mt-2">Cerrar sesión</button>
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
