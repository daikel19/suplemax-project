// src/frontend/pages/CategoriaPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function CategoriaPage() {
  const { id } = useParams();
  const [productos, setProductos] = useState([]);
  const [precioMax, setPrecioMax] = useState('');
  const [marcaFiltro, setMarcaFiltro] = useState('');
  const [marcasDisponibles, setMarcasDisponibles] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/productos/categoria/${id}`);
        setProductos(response.data);
        const marcasUnicas = [...new Set(response.data.map(p => p.marca))];
        setMarcasDisponibles(marcasUnicas);
      } catch (error) {
        console.error('Error al obtener productos por categoria:', error);
      }
    };

    fetchProductos();
  }, [id]);

  const productosFiltrados = productos.filter(p => {
    const coincidePrecio = precioMax ? p.precio <= parseFloat(precioMax) : true;
    const coincideMarca = marcaFiltro ? p.marca === marcaFiltro : true;
    return coincidePrecio && coincideMarca;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Productos</h1>

      {/* Filtros */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          className="border px-3 py-2 rounded"
          value={precioMax}
          onChange={e => setPrecioMax(e.target.value)}
        >
          <option value="">Filtrar por precio máximo</option>
          <option value="20">Hasta 20€</option>
          <option value="30">Hasta 30€</option>
          <option value="40">Hasta 40€</option>
        </select>

        <select
          className="border px-3 py-2 rounded"
          value={marcaFiltro}
          onChange={e => setMarcaFiltro(e.target.value)}
        >
          <option value="">Filtrar por marca</option>
          {marcasDisponibles.map(marca => (
            <option key={marca} value={marca}>{marca}</option>
          ))}
        </select>
      </div>

      {/* Grid de productos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {productosFiltrados.map((producto) => (
          <div key={producto.id} className="border rounded-lg p-4 hover:shadow">
            <h3 className="font-bold text-lg mb-1">{producto.nombre}</h3>
            <p className="text-sm text-gray-600">{producto.marca}</p>
            <p className="text-black font-semibold mt-1">{producto.precio} €</p>
            <button className="mt-3 w-full bg-black text-white py-1 rounded hover:bg-gray-800">
              Añadir al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
