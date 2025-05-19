import express from 'express';
import { getProducts, getProductsByCategory} from '../controllers/productController.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/categoria/:nombre', getProductsByCategory);

export default router;
