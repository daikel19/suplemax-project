import express from 'express';
import { obtenerPedidosPorUsuario } from '../controllers/pedidosController.js';

const router = express.Router();

router.get('/:id_usuario', obtenerPedidosPorUsuario);

export default router;
