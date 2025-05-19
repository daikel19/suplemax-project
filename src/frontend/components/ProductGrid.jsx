import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CategoryDropdown from './CategoryDropdown';

const ProductGrid = () => {
  const [productos, setProductos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  const fetchProductos = async (categoriaId = null) => {
    try {
      const endpoint = categoriaId
        ? `http://localhost:3000/api/productos/categoria/${categoriaId}`
        : 'http://localhost:3000/api/productos';

      const response = await axios.get(endpoint);
      setProductos(response.data);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };

  useEffect(() => {
    fetchProductos(categoriaSeleccionada);
  }, [categoriaSeleccionada]);

  return (
    <div className="space-y-6">
      <div className="w-full max-w-xs">
        <CategoryDropdown onSelect={setCategoriaSeleccionada} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {productos.map((producto) => (
          <div
            key={producto.id}
            className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all"
          >
            <div className="mb-2">
              <h3 className="font-semibold text-lg">{producto.nombre}</h3>
              <p className="text-sm text-gray-500">{producto.marca}</p>
            </div>
            <p className="text-xl font-bold text-black">{producto.precio} €</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
