import React, { useState } from "react";
import { UserPlus, Loader2 } from "lucide-react";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
  });
  const [cargando, setCargando] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);

    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        localStorage.setItem("usuario", JSON.stringify(data.usuario));

        // ✅ Enviar también a PHP para guardar cookies
        await fetch("http://localhost/suplemax-project/php/set_session.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            usuario_id: data.usuario.id,
            usuario_nombre: data.usuario.nombre,
            usuario_email: data.usuario.email,
          }),
        });

        window.location.href = "/";
      } else {
        alert(data.message || "Error en el registro");
      }
    } catch (error) {
      console.error("Error al registrar:", error);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-lg p-8 animate-fade-in">
      <div className="flex items-center justify-center mb-6">
        <UserPlus className="w-6 h-6 text-black mr-2" />
        <h2 className="text-2xl font-bold text-black">Crear cuenta</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          className="w-full px-4 py-2 border border-gray-300 rounded text-black focus:outline-none focus:ring focus:border-black"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Correo electrónico"
          className="w-full px-4 py-2 border border-gray-300 rounded text-black focus:outline-none focus:ring focus:border-black"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Contraseña"
          className="w-full px-4 py-2 border border-gray-300 rounded text-black focus:outline-none focus:ring focus:border-black"
          required
        />

        <button
          type="submit"
          className="w-full flex justify-center items-center bg-black text-white font-semibold py-2 px-4 rounded hover:bg-gray-900 transition"
          disabled={cargando}
        >
          {cargando ? (
            <Loader2 className="animate-spin w-5 h-5" />
          ) : (
            "Registrarse"
          )}
        </button>
      </form>

      <div className="mt-4 text-sm text-center">
        ¿Ya tienes cuenta?{" "}
        <a href="/auth/login" className="text-black underline hover:text-gray-600">
          Inicia sesión
        </a>
      </div>
    </div>
  );
}
