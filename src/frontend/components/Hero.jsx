import React from "react";
import { Link } from "react-router-dom";
import backgroundImage from "../../assets/MikeM.png";

export default function Hero() {
  return (
    <section
      className="relative h-[90vh] w-full bg-cover bg-no-repeat bg-center flex items-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {/* Capa oscura para mejor legibilidad */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Contenido alineado a la izquierda */}
      <div className="relative z-10 px-8 md:px-20 max-w-2xl text-white">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight uppercase">
          Potencia tu <br /> rendimiento
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-200">
          Descubre la suplementación ideal para tu entrenamiento
        </p>
        <Link
          to="/productos"
          className="mt-6 inline-block bg-white text-black font-semibold px-6 py-3 rounded hover:bg-gray-300 transition"
        >
          Ver productos
        </Link>
      </div>
    </section>
  );
}
