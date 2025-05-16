import React from "react";

const productos = [
  {
    nombre: "Proteína Whey",
    precio: "29,99 €",
    imagen: "/img/whey.png"
  },
  {
    nombre: "Creatina Monohidrato",
    precio: "19,99 €",
    imagen: "/img/creatina.png"
  },
  {
    nombre: "Pre-entreno Black",
    precio: "24,99 €",
    imagen: "/img/preentreno.png"
  },
];

export default function ProductGrid() {
  return (
    <section id="productos" className="py-16 px-6">
      <h3 className="text-center text-3xl font-bold mb-12">NUESTROS PRODUCTOS</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {productos.map((producto) => (
          <div key={producto.nombre} className="border p-6 text-center shadow-sm hover:shadow-lg transition">
            <img src={producto.imagen} alt={producto.nombre} className="w-40 mx-auto mb-4" />
            <h4 className="text-xl font-semibold">{producto.nombre}</h4>
            <p className="mt-2 text-gray-700">{producto.precio}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
