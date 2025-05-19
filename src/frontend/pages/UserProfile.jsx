import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserProfile() {
  const [usuario, setUsuario] = useState(null);
  const [pedidos, setPedidos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('usuario');
    if (savedUser) {
      const usuarioParsed = JSON.parse(savedUser);
      setUsuario(usuarioParsed);

      fetch(`http://localhost:3000/api/pedidos/${usuarioParsed.id}`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            setPedidos(data);
          } else {
            setPedidos([]);
          }
        })
        .catch(() => setPedidos([]));
    }
  }, []);

  if (!usuario) {
    return <div className="p-6 text-center text-gray-600">No has iniciado sesión.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Pedidos</h1>

      {pedidos.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-10 text-center">
          <p className="text-xl font-semibold mb-2">Aún no tienes ningún pedido realizado</p>
          <p className="text-gray-500">Ve a la tienda para realizar un pedido.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {pedidos.map((pedido) => (
            <div
              key={pedido.id}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
            >
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm text-gray-500">Pedido Nº {pedido.id}</p>
                <p className="text-sm text-gray-500">
                  {new Date(pedido.fecha).toLocaleDateString('es-ES')}
                </p>
              </div>

              <ul className="text-sm text-gray-700 list-disc ml-5 space-y-1">
                {pedido.detalles.map((prod, i) => (
                  <li key={i}>
                    {prod.nombre} – {prod.cantidad} ud. – {(prod.precio_unitario * prod.cantidad).toFixed(2)} €
                  </li>
                ))}
              </ul>

              <div className="text-right mt-3 font-semibold">
                Total: {pedido.detalles.reduce((sum, p) => sum + p.precio_unitario * p.cantidad, 0).toFixed(2)} €
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
