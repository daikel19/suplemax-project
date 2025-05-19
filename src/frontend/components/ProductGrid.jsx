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
      <CategoryDropdown onSelect={setCategoriaSeleccionada} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {productos.map((producto) => (
          <div key={producto.id} className="border p-4 rounded shadow">
            <h3 className="font-bold">{producto.nombre}</h3>
            <p className="text-sm text-gray-600">{producto.marca}</p>
            <p className="mt-1 text-black font-semibold">{producto.precio} €</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
