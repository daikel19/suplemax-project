function Hero() {
    return (
      <section className="relative bg-white h-[80vh] flex items-center justify-center text-black">
        <div className="text-center max-w-2xl px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 uppercase tracking-wide">
            Potencia tu rendimiento
          </h1>
          <p className="text-lg mb-6 text-gray-700">
            Descubre la suplementación ideal para tu entrenamiento
          </p>
          <button className="bg-black text-white px-6 py-3 font-semibold rounded hover:bg-white hover:text-black border border-black transition">
            Ver productos
          </button>
        </div>
      </section>
    );
  }
  
  export default Hero;
  