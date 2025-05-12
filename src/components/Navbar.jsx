function Navbar() {
  return (
    <header className="fixed top-0 w-full bg-white shadow z-50 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold text-black uppercase tracking-wide">Suplemax</h1>
        <nav className="space-x-6 text-sm font-medium text-gray-800">
          <a href="#" className="hover:text-black">Inicio</a>
          <a href="#" className="hover:text-black">Productos</a>
          <a href="#" className="hover:text-black">Nosotros</a>
          <a href="#" className="hover:text-black">Contacto</a>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
