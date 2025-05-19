import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';
import pedidoRoutes from './routes/pedidoRoutes.js';
import categoriaRoutes from './routes/categoriaRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api/productos', productRoutes);
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/categorias', categoriaRoutes);

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
