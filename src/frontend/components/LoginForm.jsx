import React, { useState } from 'react';

export default function LoginForm() {
  const [credentials, setCredentials] = useState({ email: '', contraseña: '' });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost/suplemax-project/src/backend/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();
      alert(data.message);

      if (data.success) {
        // guardar usuario o token
        localStorage.setItem('user', JSON.stringify(data.user));
      }
    } catch (error) {
      console.error('Error en login:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold">Iniciar sesión</h2>
      <input name="email" type="email" placeholder="Email" onChange={handleChange} className="w-full border p-2" />
      <input name="contraseña" type="password" placeholder="Contraseña" onChange={handleChange} className="w-full border p-2" />
      <button type="submit" className="bg-black text-white px-4 py-2">Entrar</button>
    </form>
  );
}
