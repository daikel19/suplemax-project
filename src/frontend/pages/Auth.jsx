import React from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

export default function Auth() {
  return (
    <div className="min-h-screen bg-white text-black font-sans flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Iniciar sesión</h2>
        <LoginForm />
        <hr className="my-6 border-t border-gray-300" />
        <h2 className="text-2xl font-bold mb-4 text-center">¿No tienes cuenta?</h2>
        <RegisterForm />
      </div>
    </div>
  );
}
