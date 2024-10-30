import express from "express";
import { getTiendas, createTienda, deleteTienda, updateTienda } from '../controllers/Tienda-controller.js';

const router = express.Router();

// Rutas
router.get('/', getTiendas);
router.post('/add', createTienda);
router.delete('/:id', deleteTienda);
router.put('/:id', updateTienda);

export default router;
