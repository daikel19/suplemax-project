import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function CartPage() {
  const { carrito, eliminarProducto, añadirProducto, clearCart } = useCart();
  const navigate = useNavigate();

  const handleFinalizarCompra = async () => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario || !usuario.id) {
      alert("Debes iniciar sesión para finalizar la compra.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_usuario: usuario.id,
          carrito: carrito.map(p => ({
            id_producto: p.id,
            cantidad: p.cantidad,
            precio_unitario: parseFloat(p.precio),
          }))
        }),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(`Error ${res.status}: ${msg}`);
      }

      const data = await res.json();
      localStorage.removeItem("carrito");
      clearCart();
      navigate("/confirmacion", {
        state: {
          pedidoId: data.id_pedido,
          total: total,
          productos: carrito.map(p => ({
            nombre: p.nombre,
            cantidad: p.cantidad,
            precio_unitario: parseFloat(p.precio)
          }))
        },
      });
    } catch (err) {
      console.error(err);
      alert("Error en el servidor al registrar el pedido.");
    }
  };

  const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">Tu carrito</h1>

      {carrito.length === 0 ? (
        <p className="text-gray-500 text-base">Tu carrito está vacío.</p>
      ) : (
        <div className="space-y-6">
          {carrito.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-start border-b border-gray-200 pb-4"
            >
              <div>
                <h2 className="text-base font-medium text-gray-900 mb-1">{item.nombre}</h2>
                <p className="text-sm text-gray-400">{item.marca}</p>
                <div className="flex items-center mt-2 space-x-2">
                  <button
                    onClick={() => {
                      if (item.cantidad > 1) {
                        añadirProducto(item, -1);
                      } else {
                        eliminarProducto(item.id);
                      }
                    }}
                    className="text-lg text-gray-600 hover:text-black px-2"
                  >
                    –
                  </button>
                  <span className="text-sm px-3 py-1 border rounded text-center">
                    {item.cantidad}
                  </span>
                  <button
                    onClick={() => añadirProducto(item, 1)}
                    className="text-lg text-gray-600 hover:text-black px-2"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400 line-through">{parseFloat(item.precio).toFixed(2)} €</p>
                <p className="text-base font-semibold text-gray-900">
                  {(parseFloat(item.precio) * item.cantidad).toFixed(2)} €
                </p>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center border-t border-black pt-6">
            <p className="text-lg font-medium text-gray-900">Total:</p>
            <p className="text-lg font-semibold">{total.toFixed(2)} €</p>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleFinalizarCompra}
              className="bg-black text-white px-6 py-2 rounded-full text-sm hover:bg-gray-900 transition"
            >
              Finalizar compra
            </button>
          </div>
        </div>
      )}
    </div>
  );
}