import React, { useEffect, useState } from 'react';

export default function UserProfile() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("usuario");
    if (userData) {
      setUsuario(JSON.parse(userData));
    }
  }, []);

  if (!usuario) {
    return <div className="p-8 text-center text-gray-600">No has iniciado sesión.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Mi Perfil</h1>

      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Información Personal</h2>
        <p><strong>Nombre:</strong> {usuario.nombre}</p>
        <p><strong>Email:</strong> {usuario.email}</p>
        <p><strong>Rol:</strong> {usuario.rol}</p>
      </div>

      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Pedidos recientes</h2>
        <div className="border-t divide-y">
          {[1, 2, 3].map((id) => (
            <div key={id} className="py-3 flex justify-between text-sm text-gray-700">
              <span>Pedido #{id}</span>
              <span>Estado: <span className="text-green-600">Entregado</span></span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Opciones</h2>
        <button
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          onClick={() => alert("Funcionalidad en desarrollo")}
        >
          Editar información
        </button>
      </div>
    </div>
  );
}
