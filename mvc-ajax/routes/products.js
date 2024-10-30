// routes for product
import express from 'express';

import {getProducts, createProduct, deleteProduct, updateProduct} from '../controllers/products-controller.js';

const router = express.Router();

// Routes
router.get('/', getProducts);
router.post('/add', createProduct);
router.delete('/:id', deleteProduct);
router.put('/:id', updateProduct);

export default router;
