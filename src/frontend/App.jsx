import React from "react";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import FeaturedCategories from "./components/FeaturedCategories";


export default function App() {
  return (
    <div className="bg-white text-black font-sans">
      <Hero />  
      <FeaturedCategories />
      <Footer />
    </div>
  );
}
