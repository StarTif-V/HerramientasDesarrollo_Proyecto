import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connectDB } from './database.js';
import userRoutes from './routes/userRoutes.js';
import clienteRoutes from './routes/clienteRoutes.js';
import proveedorRoutes from './routes/proveedorRoutes.js';
import ventaRecargaRoutes from './routes/ventarecargaRoutes.js'; // Unificando rutas de ventas y recargas

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Conexión a la base de datos
connectDB();

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/proveedores', proveedorRoutes);
app.use('/api/ventas-recargas', ventaRecargaRoutes); // Rutas unificadas de ventas y recargas

// Manejo de errores para rutas no encontradas
app.use((req, res, next) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejo general de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Error interno del servidor' });
});

export default app;
