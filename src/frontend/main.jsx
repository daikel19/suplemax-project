import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserProfile from "./pages/UserProfile";
import ProductPage from './pages/ProductPage';
import Navbar from "./components/Navbar"; // ⬅️ Importa el Navbar globalmente
import "./index.css";
import CategoriaPage from "./pages/CategoriaPage";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* Navbar visible en todas las rutas */}
      <Navbar />

      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/perfil" element={<UserProfile />} />
        <Route path="/productos" element={<ProductPage />} />
        <Route path="/categoria/:id" element={<CategoriaPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
