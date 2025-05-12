import { useState } from 'react';

const flavorOptions = {
  vainilla: {
    name: "Whey Protein Vainilla",
    image: "/assets/whey-vanilla.png",
  },
  speculoos: {
    name: "Whey Protein Speculoos",
    image: "/assets/whey-lotus.png",
  },
  brownie: {
    name: "Whey Protein Chocolate Brownie",
    image: "/assets/whey-brownie.png",
  },
};

function ProteinProduct() {
  const [selectedFlavor, setSelectedFlavor] = useState("vainilla");

  const handleFlavorChange = (e) => {
    setSelectedFlavor(e.target.value);
  };

  const product = flavorOptions[selectedFlavor];

  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <img
          src={product.image}
          alt={product.name}
          className="h-72 w-full object-contain grayscale hover:grayscale-0 transition"
        />
        <div>
          <h2 className="text-2xl font-bold text-black mb-2">{product.name}</h2>
          <p className="text-gray-700 mb-4">Precio: 29,99 €</p>

          <label htmlFor="flavor" className="block mb-2 text-sm font-medium text-gray-800">
            Selecciona el sabor:
          </label>
          <select
            id="flavor"
            value={selectedFlavor}
            onChange={handleFlavorChange}
            className="border border-gray-300 rounded px-3 py-2 mb-6 w-full"
          >
            <option value="vainilla">Vainilla</option>
            <option value="speculoos">Speculoos (Lotus)</option>
            <option value="brownie">Chocolate Brownie</option>
          </select>

          <button className="bg-black text-white px-6 py-2 rounded hover:bg-white hover:text-black border border-black transition">
            Añadir al carrito
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProteinProduct;
