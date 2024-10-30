import express from "express";
import { getempleados, createempleado, deleteempleado, updateempleado } from '../controllers/empleado-controller.js';

const router = express.Router();

// Rutas
router.get('/', getempleados);
router.post('/add', createempleado);
router.delete('/:id', deleteempleado);
router.put('/:id', updateempleado);

export default router;
