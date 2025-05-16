import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductGrid from "./components/ProductGrid";
import Footer from "./components/Footer";
import FeaturedCategories from "./components/FeaturedCategories";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";

export default function App() {
  return (
    <div className="bg-white text-black font-sans">
      <Navbar />
      <Hero />
      <RegisterForm />   
      <LoginForm />  
      <FeaturedCategories />
      <ProductGrid />
      <Footer />
    </div>
  );
}
