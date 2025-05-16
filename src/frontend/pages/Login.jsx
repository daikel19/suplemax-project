import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      {/* Título Suplemax */}
      <h1 className="text-3xl font-extrabold tracking-wide text-black mb-8">
        SUPLEMAX
      </h1>

      {/* Formulario de login */}
      <div className="w-full max-w-sm bg-white border border-gray-300 shadow-md p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-center text-black mb-6">
          Iniciar sesión
        </h2>

        <form
          action="http://localhost/suplemax-project/src/backend/login.php"
          method="POST"
          className="flex flex-col gap-4"
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
          <button
            type="submit"
            className="bg-black text-white py-2 rounded hover:bg-gray-900 transition"
          >
            Entrar
          </button>
        </form>

        {/* Enlace a registro */}
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
