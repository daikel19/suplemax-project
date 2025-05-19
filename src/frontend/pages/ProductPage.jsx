import BCCAHSN from "../../assets/BCCAHSN.png";
import CreatinaBigNeutra from "../../assets/CreatinaBigNeutra.png";
import CreatinaLifeProNeutra from "../../assets/CreatinaLifeProNeutra.png";
import CreatinahsNNeutra from "../../assets/CreatinahsNNeutra.png";
import DailyVitaminasOP from "../../assets/DailyVitaminasOP.png";
import EssentialAminoOP from "../../assets/EssentialAminoOP.png";
import IsolateGourmetLFChocoMonky from "../../assets/IsolateGourmetLFChocoMonky.png";
import IsoWheyZeroBiotech from "../../assets/IsoWheyZeroBiotech.png";
import IsoWheyZeroOP from "../../assets/IsoWheyZeroOP.png";
import NapalmPreContestFANutrition from "../../assets/NapalmPreContestFANutrition.png";
import NOXplodeBSN from "../../assets/NO-XplodeBSN.png";
import PreWorkoutBig from "../../assets/PreWorkoutBig.png";
import ProteinaWheyBrownie from "../../assets/ProteinaWheyBrownie.png";
import VitaEssentialsBig from "../../assets/VitaEssentialsBig.png";
import VitaminaCAmix from "../../assets/VitaminaCAmix.png";
import VitaminaCIO from "../../assets/VitaminaCIO.png";
import VitaminasDiariasHSN from "../../assets/VitaminasDiariasHSN.png";
import WheyPureBigOnePiece from "../../assets/WheyPureBigOnePiece.png";
import WildPumpLFCola from "../../assets/WildPumpLFCola.png";

import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useLocation } from 'react-router-dom';

export default function ProductPage() {

  const imagenes = {
    'NO-Xplode': NOXplodeBSN,
    'Creatina 100% Pure': CreatinaBigNeutra,
    'Creatina Life Pro': CreatinaLifeProNeutra,
    'Creatina HSN': CreatinahsNNeutra,
    'Daily Vitamins': DailyVitaminasOP,
    'Essential Amino': EssentialAminoOP,
    'Isolate Gourmet': IsolateGourmetLFChocoMonky,
    'Iso Whey Zero': IsoWheyZeroOP,
    'Iso Whey Zero Biotech': IsoWheyZeroBiotech,
    'Napalm PreContest': NapalmPreContestFANutrition,
    'PreWorkout Big': PreWorkoutBig,
    'Proteina Whey Brownie': ProteinaWheyBrownie,
    'Vita+ Essentials': VitaEssentialsBig,
    'Vitamina C Amix': VitaminaCAmix,
    'Vitamina C Iogenix': VitaminaCIO,
    'Vitaminas Diarias': VitaminasDiariasHSN,
    'Whey Pure': WheyPureBigOnePiece,
    'Wild Pump': WildPumpLFCola,
    'BCAA HSN': BCCAHSN
  };

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const buscar = params.get('buscar')?.toLowerCase() || '';
  const { categoriaNombre } = useParams();
  const [searchParams] = useSearchParams();
  const terminoBusqueda = searchParams.get('buscar')?.toLowerCase() || null;

  const [productos, setProductos] = useState([]);
  const [precioMaximo, setPrecioMaximo] = useState('');
  const [marcaSeleccionada, setMarcaSeleccionada] = useState('');
  const [cantidades, setCantidades] = useState({});
  const { añadirProducto } = useCart();

  const titulo = categoriaNombre
    ? decodeURIComponent(categoriaNombre)
    : terminoBusqueda
    ? `Resultados para "${terminoBusqueda}"`
    : 'Productos';

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        if (categoriaNombre) {
          const response = await axios.get(`http://localhost:3000/api/productos/categoria/${categoriaNombre}`);
          setProductos(response.data);
        } else {
          const response = await axios.get(`http://localhost:3000/api/productos`);
          setProductos(response.data);
        }
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };
    fetchProductos();
  }, [categoriaNombre]);

  const handleCantidadChange = (id, value) => {
    setCantidades(prev => ({
      ...prev,
      [id]: Math.max(1, parseInt(value) || 1),
    }));
  };

  const handleAddToCart = (producto) => {
    const cantidad = cantidades[producto.id] || 1;
    añadirProducto(producto, cantidad);
  };

  const productosFiltrados = productos.filter(producto => {
    const cumpleBusqueda = buscar
      ? (producto.nombre?.toLowerCase().includes(buscar) ||
         producto.marca?.toLowerCase().includes(buscar) ||
         producto.categoria?.toLowerCase().includes(buscar))
      : true;

    const cumplePrecio = precioMaximo ? producto.precio <= Number(precioMaximo) : true;
    const cumpleMarca = marcaSeleccionada ? producto.marca === marcaSeleccionada : true;

    return cumpleBusqueda && cumplePrecio && cumpleMarca;
  });

  const marcasUnicas = [...new Set(productos.map(p => p.marca))];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold mb-10 capitalize border-b pb-2 border-gray-200">
        {titulo}
      </h1>

      <div className="flex flex-wrap gap-4 mb-10">
        <select
          value={precioMaximo}
          onChange={e => setPrecioMaximo(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-md text-sm bg-white shadow-sm"
        >
          <option value="">Filtrar por precio máximo</option>
          <option value="20">Hasta 20€</option>
          <option value="30">Hasta 30€</option>
          <option value="40">Hasta 40€</option>
        </select>

        <select
          value={marcaSeleccionada}
          onChange={e => setMarcaSeleccionada(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-md text-sm bg-white shadow-sm"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {productosFiltrados.map(producto => (
            <div
              key={producto.id}
              className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-5 flex flex-col justify-between"
            >
              <div className="flex flex-col gap-2">
                <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center mb-4 overflow-hidden">
                  <img
                    src={imagenes[producto.nombre] || '/default-image.png'}
                    alt={producto.nombre}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-base font-semibold text-gray-900">{producto.nombre}</h3>
                <p className="text-sm text-gray-500">{producto.marca}</p>
                <p className="text-lg font-bold text-black">{producto.precio} €</p>

                <div className="mt-3">
                  <label className="text-sm text-gray-600 block mb-1">Cantidad</label>
                  <input
                    type="number"
                    min="1"
                    value={cantidades[producto.id] || 1}
                    onChange={e => handleCantidadChange(producto.id, e.target.value)}
                    className="w-full border border-gray-300 px-3 py-1 rounded-md shadow-sm"
                  />
                </div>
              </div>

              <button
                onClick={() => handleAddToCart(producto)}
                className="mt-4 bg-black text-white py-2 rounded-md font-medium hover:bg-gray-900 transition text-sm"
              >
                Añadir al carrito
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
