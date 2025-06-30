import express from 'express';
import {
    obtenerVentasRecargas,
    crearVentaRecarga,
    actualizarVentaRecarga,
    eliminarVentaRecarga
} from '../controllers/ventaRecargaController.js';

const router = express.Router();

// Rutas para manejar las ventas y recargas
router.get('/', obtenerVentasRecargas); // Obtener todas las ventas y recargas, o filtrar por tipo
router.post('/', crearVentaRecarga); // Crear una venta o recarga
router.put('/:id', actualizarVentaRecarga); // Actualizar una venta o recarga
router.delete('/:id', eliminarVentaRecarga); // Eliminar una venta o recarga

export default router;
