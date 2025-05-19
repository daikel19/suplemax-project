import React, { useEffect, useState } from "react";

export default function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/categorias")
      .then((res) => res.json())
      .then((data) => setCategorias(data))
      .catch((error) => console.error("Error cargando categorías:", error));
  }, []);

  useEffect(() => {
    if (categoriaSeleccionada) {
      fetch(`http://localhost:3000/api/productos?categoria=${categoriaSeleccionada}`)
        .then((res) => res.json())
        .then((data) => setProductos(data));
    }
  }, [categoriaSeleccionada]);

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold mb-6 text-center uppercase">Explorar por categoría</h2>
      <select
        className="w-full border border-black rounded px-4 py-2 mb-8"
        onChange={(e) => setCategoriaSeleccionada(e.target.value)}
        value={categoriaSeleccionada}
      >
        <option value="">Selecciona una categoría</option>
        {categorias.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.nombre}
          </option>
        ))}
      </select>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {productos.map((prod) => (
          <div
            key={prod.id}
            className="border border-black rounded-xl p-4 flex flex-col items-center bg-white hover:shadow-lg transition"
          >
            <img
              src={prod.imagen || "/assets/default.png"}
              alt={prod.nombre}
              className="w-full h-48 object-contain mb-4"
            />
            <h3 className="text-lg font-semibold text-center">{prod.nombre}</h3>
            <p className="text-sm text-gray-600 mb-2 text-center">{prod.descripcion}</p>
            <span className="font-bold text-black mb-2">{prod.precio} €</span>
          </div>
        ))}
      </div>
    </section>
  );
}
