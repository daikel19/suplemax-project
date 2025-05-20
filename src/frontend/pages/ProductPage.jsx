import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';

// Imágenes importadas
import BCCAHSN from "../../assets/BCCAHSN.png";
import CreatinaBigNeutra from "../../assets/CreatinaBigNeutra.png";
import CreatinaLifeProNeutra from "../../assets/CreatinaLifeProNeutra.png";
import CreatinaQuamtraxNeutra from "../../assets/CreatinaQuamtraxNeutra.png"
import DailyVitaminasOP from "../../assets/DailyVitaminasOP.png";
import EssentialAminoOP from "../../assets/EssentialAminoOP.png";
import IsolateGourmetLFChocoMonky from "../../assets/IsolateGourmetLFChocoMonky.png";
import NapalmPreContestFANutrition from "../../assets/NapalmPreContestFANutrition.png";
import NOXplodeBSN from "../../assets/NO-XplodeBSN.png";
import PreWorkoutBig from "../../assets/PreWorkoutBig.png";
import VitaEssentialsBig from "../../assets/VitaEssentialsBig.png";
import VitaminaCAmix from "../../assets/VitaminaCAmix.png";
import VitaminaCIO from "../../assets/VitaminaCIO.png";
import VitaminasDiariasHSN from "../../assets/VitaminasDiariasHSN.png";
import WheyPureBigOnePiece from "../../assets/WheyPureBigOnePiece.png";
import WildPumpLFCola from "../../assets/WildPumpLFCola.png";

export default function ProductPage() {
  const imagenes = {
    // Aminoácidos
    "Essential Amino Energy": EssentialAminoOP,
    "AminoComplete": EssentialAminoOP,
    "Aminoacids Powder": EssentialAminoOP,
    "BCAA 8:1:1": BCCAHSN,
    "BCAA Instant": BCCAHSN,

    // Vitaminas y multivitamínicos
    "Vitaminas Diarias": VitaminasDiariasHSN,
    "Daily Vitamins": DailyVitaminasOP,
    "Vita+ Essentials": VitaEssentialsBig,
    "Multivitamin Complex": VitaminaCIO,
    "MultiVit": VitaminaCAmix,
    "Omega 3": VitaEssentialsBig,
    "ZMA Advanced": VitaEssentialsBig,
    "Joint+ Colágeno": VitaEssentialsBig,
    "Melatonina 1mg": VitaEssentialsBig,

    // Creatinas
    "Creatina 100% Pure": CreatinaBigNeutra,
    "Creatina Monohidratada": CreatinaLifeProNeutra,
    "Creatine Monohydrate": CreatinaQuamtraxNeutra,

    // Proteínas
    "Isolate Gourmet": IsolateGourmetLFChocoMonky,
    "Whey Pure OnePiece": WheyPureBigOnePiece,
   
    // Pre-entrenos
    "NO-Xplode": NOXplodeBSN,
    "PreWorkout 2.0": PreWorkoutBig,
    "Explosive Pump": WildPumpLFCola,
    "Napalm Pre-Contest": NapalmPreContestFANutrition,

    // Termogénicos
    "ThermoPro": WildPumpLFCola,
    "Fat Burner Extreme": WildPumpLFCola,
    "Lipo 6 Black": WildPumpLFCola,
    "Burner Thermo": WildPumpLFCola,
    "Green Coffee Burner": WildPumpLFCola,

    // Otros
    "CLA 1000mg": WildPumpLFCola,
    "Creapowder": WildPumpLFCola,
    "Boogieman": WildPumpLFCola,

    // Gainers
    "Mass Gainer Elite": WildPumpLFCola,
    "Serious Mass": WildPumpLFCola,
    "Super Mega Gainer": WildPumpLFCola,
    "Mass Professional": WildPumpLFCola,
    "Gainer Pro": WildPumpLFCola,
  };


  const { categoriaNombre } = useParams();
  const [searchParams] = useSearchParams();
  const terminoBusqueda = searchParams.get('buscar')?.toLowerCase() || null;

  const [productos, setProductos] = useState([]);
  const [marcaSeleccionada, setMarcaSeleccionada] = useState('');
  const [cantidades, setCantidades] = useState({});
  const { añadirProducto } = useCart();
  const [clickedId, setClickedId] = useState(null); 

  const titulo = categoriaNombre
    ? decodeURIComponent(categoriaNombre)
    : terminoBusqueda
      ? `Resultados para "${terminoBusqueda}"`
      : 'Productos';

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const url = categoriaNombre
          ? `http://localhost:3000/api/productos/categoria/${categoriaNombre}`
          : `http://localhost:3000/api/productos`;
        const response = await axios.get(url);
        setProductos(response.data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };
    fetchProductos();
  }, [categoriaNombre]);

  const handleCantidadChange = (id, value) => {
    setCantidades(prev => ({ ...prev, [id]: Math.max(1, parseInt(value) || 1) }));
  };

  const handleAddToCart = (producto) => {
    const cantidad = cantidades[producto.id] || 1;
    añadirProducto(producto, cantidad);
    setClickedId(producto.id);
    setTimeout(() => setClickedId(null), 300); 
  };

  const productosFiltrados = productos.filter(producto => {
    const matchBusqueda = terminoBusqueda
      ? [producto.nombre, producto.marca, producto.categoria]
        .some(val => val?.toLowerCase().includes(terminoBusqueda))
      : true;
    const matchMarca = marcaSeleccionada ? producto.marca === marcaSeleccionada : true;
    return matchBusqueda && matchMarca;
  });

  const marcasUnicas = [...new Set(productos.map(p => p.marca))];

  const getImagen = (nombre) => {
    return imagenes[nombre] || '/default-image.png';
  };



  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold mb-6 capitalize text-gray-900">
        {titulo}
      </h1>

      <div className="mb-8">
        <select
          value={marcaSeleccionada}
          onChange={e => setMarcaSeleccionada(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-md text-sm bg-white shadow-sm focus:outline-none"
        >
          <option value="">Filtrar por marca</option>
          {marcasUnicas.map((marca, index) => (
            <option key={index} value={marca}>{marca}</option>
          ))}
        </select>
      </div>

      {productosFiltrados.length === 0 ? (
        <p className="text-center text-gray-500">No se encontraron productos que coincidan.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {productosFiltrados.map(producto => (
            <div
              key={producto.id}
              className="border border-gray-200 rounded-xl p-4 flex flex-col justify-between hover:shadow-md transition"
            >
              <div>
                <div className="aspect-square bg-white mb-4 flex items-center justify-center">
                  <img
                    src={getImagen(producto.nombre)}
                    alt={producto.nombre}
                    className="object-contain h-36"
                  />

                </div>
                <h3 className="text-sm font-semibold text-gray-900 leading-tight line-clamp-2">
                  {producto.nombre}
                </h3>
                <p className="text-xs text-gray-500 mb-1">{producto.marca}</p>
                <p className="text-sm font-bold text-black">{producto.precio} €</p>
              </div>

              <div className="flex items-center justify-between mt-3">
                <input
                  type="number"
                  min="1"
                  value={cantidades[producto.id] || 1}
                  onChange={e => handleCantidadChange(producto.id, e.target.value)}
                  className="w-16 border border-gray-300 text-sm rounded px-2 py-1"
                />

                <button
                  onClick={() => handleAddToCart(producto)}
                  className={`bg-black text-white p-2 rounded-full flex items-center justify-center transition transform duration-300 ${clickedId === producto.id ? 'animate-cart-pulse' : ''
                    }`}
                  aria-label="Añadir al carrito"
                >
                  <ShoppingCart size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
