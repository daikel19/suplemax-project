import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserProfile from "./pages/UserProfile";
import ProductPage from "./pages/ProductPage";
import Navbar from "./components/Navbar";
import { CartProvider } from "./context/CartContext";
import CartPage from './pages/CartPage';
import OrderConfirmation from './pages/OrderConfirmation';
import Suplebot from "./components/Suplebot";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/perfil" element={<UserProfile />} />
          <Route path="/productos" element={<ProductPage />} />
          <Route path="/productos/:categoriaNombre" element={<ProductPage />} />
          <Route path="/carrito" element={<CartPage />} />
          <Route path="/confirmacion" element={<OrderConfirmation />} />
        </Routes>
        <Suplebot/>
      </BrowserRouter>
    </CartProvider>
  </React.StrictMode>
);
