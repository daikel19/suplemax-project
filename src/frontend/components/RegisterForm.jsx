import React, { useState } from 'react';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // IMPORTANTE para evitar que el navegador haga un envío por defecto

    try {
      const response = await fetch('http://localhost/suplemax-project/src/backend/register.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Enviamos JSON
        },
        body: JSON.stringify(formData), // Convertimos los datos a JSON
      });

      const data = await response.json();
      console.log('Respuesta del backend:', data);
      alert(data.message);
    } catch (error) {
      console.error('Error en el registro:', error);
    }
  };

  return (
    <div>
      <h2>Registro</h2>

      {/* El formulario no tiene "action" ni "method", solo usa handleSubmit */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Correo electrónico"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Contraseña"
          required
        />

        {/* Este botón sí puede ser de tipo submit */}
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}
