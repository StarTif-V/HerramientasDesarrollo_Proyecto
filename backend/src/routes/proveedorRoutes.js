import express from 'express';
import {
    crearProveedor,
    obtenerProveedores,
    actualizarProveedor,
    eliminarProveedor,
} from '../controllers/proveedorController.js';

const router = express.Router();

// Ruta para crear un proveedor
router.post('/', crearProveedor);

// Ruta para obtener todos los proveedores
router.get('/', obtenerProveedores);

// Ruta para actualizar un proveedor por ID
router.put('/:id', actualizarProveedor);

// Ruta para eliminar un proveedor por ID
router.delete('/:id', eliminarProveedor);

export default router;
