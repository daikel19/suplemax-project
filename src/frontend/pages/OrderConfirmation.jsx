import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { pedidoId, total, productos } = location.state || {};

  if (!pedidoId) {
    navigate('/');
    return null;
  }

  const descargarRecibo = (pedidoId, total, productos) => {
    const doc = new jsPDF();
    const fecha = new Date().toLocaleString('es-ES');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('Suplemax', 20, 20);

    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text('Confirmación de Pedido', 20, 30);
    doc.line(20, 32, 190, 32);

    doc.setFontSize(12);
    doc.text(`Pedido Nº: ${pedidoId}`, 20, 45);
    doc.text(`Fecha: ${fecha}`, 20, 52);

    doc.setFontSize(13);
    doc.text("Resumen de productos:", 20, 65);

    // Productos en tabla
    const tabla = productos.map((prod) => [
      prod.nombre,
      `${prod.cantidad} ud.`,
      `${(prod.cantidad * prod.precio_unitario).toFixed(2)} €`,
    ]);

    autoTable(doc, {
      startY: 70,
      head: [['Producto', 'Cantidad', 'Subtotal']],
      body: tabla,
      theme: 'grid',
      styles: {
        font: 'helvetica',
        fontSize: 11,
      },
      headStyles: {
        fillColor: [0, 0, 0],
        textColor: [255, 255, 255],
      },
    });

    // Total
    const totalY = doc.lastAutoTable.finalY + 10;
    doc.setFont('helvetica', 'bold');
    doc.text(`Total pagado: ${total.toFixed(2)} €`, 20, totalY);

    // Mensaje de agradecimiento
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text('¡Gracias por confiar en Suplemax!', 20, totalY + 15);
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text('Este documento no es una factura oficial.', 20, totalY + 22);

    doc.save(`pedido-${pedidoId}.pdf`);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-10 rounded-3xl shadow-lg text-center max-w-md w-full">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-black text-white rounded-full p-2 mr-4 shadow-md animate-pulse">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold ml-3">Confirmación de Pedido</h1>
        </div>
        <p className="text-gray-700 mb-1">Pedido Nº: <span className="font-semibold">#{pedidoId}</span></p>
        <p className="text-gray-700 mb-1">Total pagado: <span className="font-semibold">{total.toFixed(2)} €</span></p>
        <p className="text-gray-700 mb-4">Fecha: <span className="font-semibold">{new Date().toLocaleString()}</span></p>
        <p className="text-lg font-medium text-black mb-6">¡Gracias por confiar en Suplemax!</p>

        <div className="flex justify-center gap-4">
          <button onClick={() => descargarRecibo(pedidoId, total, productos)}
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
