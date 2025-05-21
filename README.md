# 🏋️ SUPLEMAX - Tienda de Suplementación Deportiva

Suplemax es una tienda online profesional de suplementos desarrollada con **React**, **Node.js**, **MySQL** y gestión de sesiones con **PHP**. El proyecto permite a los usuarios registrarse, iniciar sesión, comprar productos reales, ver pedidos y gestionar su perfil, todo con un diseño moderno inspirado en sitios como ESN.

---

## 🛠️ Tecnologías utilizadas

| Frontend | Backend | Base de Datos | Sesiones |
|----------|---------|----------------|----------|
| React (Vite) + Tailwind CSS | Node.js + Express | MySQL | PHP (cookies + sesiones) |

---

## 🧩 Estructura del Proyecto

Suplemax-Project/
│
├── dist/ # Carpeta generada tras build (se sirve desde XAMPP)
│ └── index.html # HTML generado por Vite
│
├── php/ # Archivos de sesión y cookies
│ ├── set_session.php
│ ├── get_session.php
│ └── logout.php
│
├── src/
│ ├── backend/
│ │ ├── controllers/ # Controladores para rutas
│ │ ├── models/ # Modelos de la BD
│ │ ├── routes/ # Rutas Express
│ │ ├── app.js # Servidor Express
│ │ └── db.js # Conexión a MySQL
│ │
│ └── frontend/
│ ├── components/ # Componentes reutilizables (Navbar, Form, etc)
│ ├── context/ # CartContext y UserContext
│ ├── pages/ # Vistas: Login, Registro, Productos, Perfil, etc
│ ├── styles/ # Configuración de Tailwind
│ └── main.jsx, App.jsx # Entry Point
│
├── bd/ # Script SQL (opcional)
├── Informe SupleMax Final.pdf
├── package.json
└── README.md




---

## ✅ Funcionalidades

- Registro de usuario con guardado de sesión
- Login real con cookies (persistente)
- Navegación entre categorías (proteínas, creatinas…)
- Búsqueda avanzada con historial y sugerencias
- Carrito funcional con contador y total
- Realización de pedidos reales (guardados en base de datos)
- Visualización de pedidos desde el perfil
- Descarga de comprobante en PDF
- Cierre de sesión

---

## 🖥️ Cómo ejecutar el proyecto

### 🔧 Requisitos previos

- Node.js
- XAMPP o servidor PHP local
- MySQL

### 🔙 Backend

cd backend
npm install
node app.js


Frontend

cd frontend
npm install
npm run build


Esto generará la carpeta dist/. Debes colocarla en htdocs/ de XAMPP o configurarla como ruta principal en tu servidor local.

Ejemplo de ruta:
http://localhost/suplemax-project/dist/

🧩 PHP (sesiones)
Asegúrate de que Apache esté activo. Coloca los archivos de php/ dentro de htdocs/suplemax-project/php/.

🎯 Objetivo del Proyecto
Este proyecto fue desarrollado como proyecto final de formación en desarrollo web. Integra todo lo aprendido en:

Desarrollo Frontend con React

Backend en Node/Express

Bases de datos relacionales en MySQL

Manejo de sesiones reales con cookies vía PHP

Experiencia de usuario fluida y profesional


📦 Vías futuras de desarrollo
Panel de administración para gestionar productos

Pasarela de pago real (Stripe o PayPal)

Mejora en sistema de búsqueda y filtrado

Integración con recomendaciones personalizadas por IA

