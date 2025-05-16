import React, { useState } from "react";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost/suplemax-project/src/backend/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("usuario", JSON.stringify(data.usuario));
        alert("Inicio de sesión correcto");
        window.location.href = "/";
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error al iniciar sesión", error);
      alert("No se pudo iniciar sesión");
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold">Iniciar sesión</h2>
      <input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
        className="w-full border p-2"
      />
      <input
        name="password"
        type="password"
        placeholder="Contraseña"
        onChange={handleChange}
        className="w-full border p-2"
      />
      <button type="submit" className="bg-black text-white px-4 py-2">
        Entrar
      </button>
    </form>
  );
}
