import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { pedidoId, total } = location.state || {};

  if (!pedidoId) {
    navigate('/');
    return null;
  }

  const descargarRecibo = () => {
    const contenido = `
      ✅ Confirmación de Pedido
      --------------------------
      Pedido Nº: ${pedidoId}
      Total pagado: ${total.toFixed(2)} €
      Fecha: ${new Date().toLocaleString()}

      ¡Gracias por comprar en Suplemax!
    `;
    const blob = new Blob([contenido], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `pedido-${pedidoId}.txt`;
    link.click();
  };

  return (
    <div className="max-w-2xl mx-auto text-center py-20 px-4">
      <h1 className="text-4xl font-bold mb-6">¡Pedido realizado con éxito!</h1>
      <p className="text-lg mb-2">Tu número de pedido es:</p>
      <p className="text-2xl font-semibold mb-6">#{pedidoId}</p>
      <p className="text-lg mb-6">Total pagado: <strong>{total.toFixed(2)} €</strong></p>
      <div className="space-x-4 mt-8">
        <button
          onClick={descargarRecibo}
          className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-900 transition"
        >
          Descargar recibo
        </button>
        <button
          onClick={() => navigate('/')}
          className="bg-white border border-black text-black px-6 py-3 rounded-full hover:bg-gray-100 transition"
        >
          Volver a la tienda
        </button>
      </div>
    </div>
  );
}
