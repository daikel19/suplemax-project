import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LogIn } from "lucide-react";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        localStorage.setItem("usuario", JSON.stringify(data.usuario));
        window.location.href = "/";
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm bg-white border border-gray-300 shadow-lg p-8 rounded-xl transition-transform animate-fade-in">
        <h1 className="text-3xl font-extrabold text-center text-black mb-6 tracking-wide">
          SUPLEMAX
        </h1>

        <div className="flex justify-center mb-4 text-black">
          <LogIn size={36} />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Correo"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Contraseña"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
          <button
            type="submit"
            className="w-full flex justify-center items-center gap-2 bg-black text-white font-medium py-2 rounded hover:bg-gray-800 transition"
            disabled={loading}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <LogIn size={20} /> Entrar
              </>
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-700">
          ¿No tienes cuenta?{" "}
          <Link
            to="/auth/register"
            className="text-black font-semibold hover:underline"
          >
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}
