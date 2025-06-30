import express from 'express';
// src/routes/clienteRoutes.js
import { crearCliente, obtenerClientes, actualizarCliente, eliminarCliente } from '../controllers/clienteController.js';


const router = express.Router();

// Definición de rutas
router.post('/', crearCliente);  // Ruta para crear un cliente
router.get('/', obtenerClientes);  // Ruta para obtener la lista de clientes
router.put('/:id', actualizarCliente);  // Ruta para actualizar un cliente por ID
router.delete('/:id', eliminarCliente);  // Ruta para eliminar un cliente por ID

export default router;  // Exportación del router
