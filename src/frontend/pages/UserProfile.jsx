import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserProfile() {
  const [usuario, setUsuario] = useState(null);
  const [pedidos, setPedidos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem('usuario');
    if (data) {
      const user = JSON.parse(data);
      setUsuario(user);

      // Traer pedidos reales
      fetch(`http://localhost:3000/api/pedidos/${user.id}`)
        .then((res) => res.json())
        .then((data) => setPedidos(data))
        .catch((err) => console.error('Error al cargar pedidos:', err));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    navigate('/');
  };

  if (!usuario) {
    return <div className="p-6 text-center text-gray-600">No has iniciado sesión.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 text-black">
      <h1 className="text-3xl font-bold mb-6 text-center">Mi Perfil</h1>

      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Información Personal</h2>
        <p><strong>Nombre:</strong> {usuario.nombre}</p>
        <p><strong>Email:</strong> {usuario.email}</p>
        <p><strong>Rol:</strong> {usuario.rol}</p>
      </div>

      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Pedidos</h2>
        {pedidos.length === 0 ? (
          <p>No tienes pedidos.</p>
        ) : (
          pedidos.map((pedido) => (
            <div key={pedido.id} className="border-t pt-4 mb-4">
              <p><strong>ID Pedido:</strong> {pedido.id}</p>
              <p><strong>Total:</strong> {pedido.total} €</p>
              <p><strong>Estado:</strong> {pedido.estado}</p>
              <p className="mt-2"><strong>Productos:</strong></p>
              <ul className="ml-4 list-disc">
                {pedido.productos.map((prod, i) => (
                  <li key={i}>
                    {prod.nombre} – {prod.cantidad} ud. – {prod.precio_unitario} €
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>

      <div className="flex justify-between mt-6">
        <button
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-600"
          onClick={handleLogout}
        >
          Cerrar sesión
        </button>
        <button
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-700"
          onClick={() => navigate('/')}
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
}
