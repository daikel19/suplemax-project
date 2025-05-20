import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';

export default function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { pedidoId, total } = location.state || {};

  if (!pedidoId) {
    navigate('/');
    return null;
  }

  const descargarRecibo = () => {
    const doc = new jsPDF();

    doc.setFont('helvetica');
    doc.setFontSize(22);
    doc.text('Suplemax', 20, 20);

    doc.setFontSize(16);
    doc.text('Confirmación de Pedido', 20, 30);
    doc.setLineWidth(0.5);
    doc.line(20, 33, 190, 33);

    doc.setFontSize(12);
    doc.text(`Pedido Nº: ${pedidoId}`, 20, 45);
    doc.text(`Total pagado: ${total.toFixed(2)} €`, 20, 53);
    doc.text(`Fecha: ${new Date().toLocaleString()}`, 20, 61);

    doc.setFontSize(13);
    doc.text('¡Gracias por confiar en Suplemax!', 20, 75);

    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text('Este documento no es una factura.', 20, 85);

    doc.save(`pedido-${pedidoId}.pdf`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-10 rounded-3xl shadow-lg text-center max-w-md w-full">
        <div className="flex items-center justify-center mb-6">
          <span className="text-green-500 text-3xl">✅</span>
          <h1 className="text-2xl font-bold ml-3">Confirmación de Pedido</h1>
        </div>
        <p className="text-gray-700 mb-1">Pedido Nº: <span className="font-semibold">#{pedidoId}</span></p>
        <p className="text-gray-700 mb-1">Total pagado: <span className="font-semibold">{total.toFixed(2)} €</span></p>
        <p className="text-gray-700 mb-4">Fecha: <span className="font-semibold">{new Date().toLocaleString()}</span></p>
        <p className="text-lg font-medium text-black mb-6">¡Gracias por confiar en Suplemax!</p>

        <div className="flex justify-center gap-4">
          <button
            onClick={descargarRecibo}
            className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-900 transition"
          >
            Descargar recibo PDF
          </button>
          <button
            onClick={() => navigate('/')}
            className="border border-black text-black px-6 py-2 rounded-full hover:bg-gray-100 transition"
          >
            Volver a la tienda
          </button>
        </div>
      </div>
    </div>
  );
}
