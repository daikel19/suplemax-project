const products = [
    {
      id: 1,
      name: "Proteína Whey",
      image: "https://images.unsplash.com/photo-1600180758890-6d30b3043efc",
      price: "29,99 €",
    },
    {
      id: 2,
      name: "Creatina Monohidrato",
      image: "https://images.unsplash.com/photo-1615914986155-b7c30fe0f1fb",
      price: "19,99 €",
    },
    {
      id: 3,
      name: "Pre-entreno Black",
      image: "https://images.unsplash.com/photo-1617957743165-913f2cf9d1ef",
      price: "24,99 €",
    },
  ];
  
  function ProductGrid() {
    return (
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-8 text-center text-black uppercase tracking-wide">Nuestros productos</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {products.map(product => (
            <div key={product.id} className="border border-gray-300 p-4 text-center hover:shadow-lg transition">
              <img src={product.image} alt={product.name} className="h-48 w-full object-cover mb-4 grayscale hover:grayscale-0 transition" />
              <h3 className="text-lg font-semibold text-black">{product.name}</h3>
              <p className="text-gray-700 mt-2">{product.price}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  
  export default ProductGrid;
  