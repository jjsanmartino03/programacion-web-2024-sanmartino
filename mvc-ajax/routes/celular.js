import express from "express";
import { getcelulars, createcelular, deletecelular, updatecelular } from '../controllers/celular-controller.js';

const router = express.Router();

// Rutas
router.get('/', getcelulars);
router.post('/add', createcelular);
router.delete('/:id', deletecelular);
router.put('/:id', updatecelular);

export default router;
