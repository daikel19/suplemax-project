import React from 'react';
import ProductGrid from '../components/ProductGrid';

const ProductPage = () => {
  return (
    <div className="bg-white text-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-extrabold tracking-tight mb-6 border-b pb-2 border-gray-200">
          Productos
        </h1>
        <ProductGrid />
      </div>
    </div>
  );
};

export default ProductPage;
