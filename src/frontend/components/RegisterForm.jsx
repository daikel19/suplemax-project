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
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        localStorage.setItem('usuario', JSON.stringify(data.usuario));
        window.location.href = '/'; // redirige a la página principal
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error en el registro:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="nombre" placeholder="Nombre" onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} required />
      <button type="submit">Registrarse</button>
    </form>
  );
}
