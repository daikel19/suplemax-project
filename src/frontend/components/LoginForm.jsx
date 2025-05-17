import React, { useState } from 'react';

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 👈 evitar que el navegador haga submit normal

    try {
      const response = await fetch('http://localhost/suplemax-project/src/backend/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // 👈 asegúrate que va como JSON
        },
        body: JSON.stringify(formData), // 👈 convierte tu objeto a JSON
      });

      const data = await response.json();
      console.log(data);
      alert(data.message);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Correo"
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Contraseña"
      />
      <button type="submit">Iniciar sesión</button>
    </form>
  );
}
