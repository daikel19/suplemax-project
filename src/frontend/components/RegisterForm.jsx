import React, { useState } from 'react';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    contraseña: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost/suplemax-project/src/backend/register.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error('Error en el registro:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold">Registro</h2>
      <input name="nombre" placeholder="Nombre" onChange={handleChange} className="w-full border p-2" />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} className="w-full border p-2" />
      <input name="contraseña" type="password" placeholder="Contraseña" onChange={handleChange} className="w-full border p-2" />
      <button type="submit" className="bg-black text-white px-4 py-2">Registrar</button>
    </form>
  );
}
