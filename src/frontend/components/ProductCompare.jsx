import React from 'react';

const ProductCompare = ({ products }) => {
  if (products.length < 2) {
    return <p className="text-center mt-4">Selecciona al menos dos productos para comparar.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full text-sm text-left">
        <thead>
          <tr>
            <th className="px-4 py-2">Atributo</th>
            {products.map(product => (
              <th key={product.id} className="px-4 py-2">{product.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="font-semibold px-4 py-2">Tipo</td>
            {products.map(p => <td key={p.id} className="px-4 py-2">{p.type}</td>)}
          </tr>
          <tr>
            <td className="font-semibold px-4 py-2">Proteína por porción</td>
            {products.map(p => <td key={p.id} className="px-4 py-2">{p.protein} g</td>)}
          </tr>
          <tr>
            <td className="font-semibold px-4 py-2">Sabor</td>
            {products.map(p => <td key={p.id} className="px-4 py-2">{p.flavor}</td>)}
          </tr>
          <tr>
            <td className="font-semibold px-4 py-2">Precio</td>
            {products.map(p => <td key={p.id} className="px-4 py-2">€{p.price}</td>)}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProductCompare;
