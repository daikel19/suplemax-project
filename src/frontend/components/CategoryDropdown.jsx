import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CategoryDropdown = ({ onSelect }) => {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/categorias');
        setCategorias(response.data);
      } catch (error) {
        console.error('Error al obtener categorías:', error);
      }
    };
    fetchCategorias();
  }, []);

  const handleChange = (e) => {
    const categoriaId = parseInt(e.target.value);
    onSelect(categoriaId); // Notifica al componente padre
  };

  return (
    <select onChange={handleChange} className="p-2 border rounded">
      <option value="">Todas las categorías</option>
      {categorias.map((cat) => (
        <option key={cat.id} value={cat.id}>
          {cat.nombre}
        </option>
      ))}
    </select>
  );
};

export default CategoryDropdown;
