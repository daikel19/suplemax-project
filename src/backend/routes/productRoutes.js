import express from 'express';
import { getProducts, getProductsByCategoryId } from '../controllers/productController.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/categoria/:id', getProductsByCategoryId); // <- esta es la que usas en Postman

export default router;
