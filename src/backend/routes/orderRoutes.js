import express from 'express';
import { getUserOrders, addOrder } from '../controllers/orderController.js';

const router = express.Router();


router.get('/:id_usuario', getUserOrders);
router.post('/', addOrder);

export default router;
