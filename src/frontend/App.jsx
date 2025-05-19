import React from "react";
import Hero from "./components/Hero";
import ProductGrid from "./components/ProductGrid";
import Footer from "./components/Footer";
import FeaturedCategories from "./components/FeaturedCategories";
import Suplebot from "./components/Suplebot";

export default function App() {
  return (
    <div className="bg-white text-black font-sans">
      <Hero />  
      <FeaturedCategories />
      <ProductGrid />
      <Suplebot />
      <Footer />
    </div>
  );
}
