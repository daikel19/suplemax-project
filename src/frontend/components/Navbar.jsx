import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Search } from 'lucide-react';

const usuario = JSON.parse(localStorage.getItem("usuario"));

export default function Navbar() {
  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold tracking-widest">
          SUPLEMAX
        </Link>

        {/* Menu */}
        <nav className="hidden md:flex space-x-6 text-sm font-medium">
          <Link to="/proteinas" className="hover:text-gray-700 transition-colors">Proteínas</Link>
          <Link to="/vitaminas" className="hover:text-gray-700 transition-colors">Vitaminas</Link>
          <Link to="/rendimiento" className="hover:text-gray-700 transition-colors">Rendimiento</Link>
          <Link to="/alimentacion" className="hover:text-gray-700 transition-colors">Comida y Snacks</Link>
          <Link to="/ropa" className="hover:text-gray-700 transition-colors">Ropa y Accesorios</Link>
          <Link to="/quienes-somos" className="hover:text-gray-700 transition-colors">Nosotros</Link>
        </nav>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative hidden sm:block">
            <input
              type="text"
              placeholder="Buscar..."
              className="pl-10 pr-4 py-1 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-500" />
          </div>

          {/* Usuario logueado */}
          {usuario ? (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Hola, {usuario.nombre}</span>
              <button
                onClick={() => {
                  localStorage.removeItem("usuario");
                  window.location.reload(); // recarga la página tras logout
                }}
                className="text-xs underline text-gray-500 hover:text-black"
              >
                Cerrar sesión
              </button>
            </div>
          ) : (
            <Link to="/auth/login">
              <User className="w-5 h-5" />
            </Link>
          )}



          {/* Cart Icon */}
          <button className="relative p-2 hover:bg-gray-100 rounded-full">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              0
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}