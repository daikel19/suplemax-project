import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CategoryDropdown = ({ onSelect }) => {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/categorias');
        setCategorias(res.data);
      } catch (error) {
        console.error('Error al cargar categorías:', error);
      }
    };

    fetchCategorias();
  }, []);

  const handleChange = (e) => {
    const selectedId = e.target.value;
    onSelect(selectedId ? parseInt(selectedId) : null); // null = mostrar todos
  };

  return (
    <div className="mb-4">
      <select
        onChange={handleChange}
        className="border border-gray-300 px-4 py-2 rounded text-black"
      >
        <option value="">Todas las categorías</option>
        {categorias.map((categoria) => (
          <option key={categoria.id} value={categoria.id}>
            {categoria.nombre}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryDropdown;
