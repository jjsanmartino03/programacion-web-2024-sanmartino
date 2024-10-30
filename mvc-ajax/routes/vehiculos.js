import express from "express";
import { getvehiculos, createvehiculos, deletevehiculos, updatevehiculos } from '../controllers/vehiculos-controller.js';

const router = express.Router();

// Rutas
router.get('/', getvehiculos);
router.post('/add', createvehiculos);
router.delete('/:id', deletevehiculos);
router.put('/:id', updatevehiculos);

export default router;
