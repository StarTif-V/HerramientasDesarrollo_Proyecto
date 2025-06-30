import VentaRecarga from '../models/ventaRecarga.js';

// Obtener todas las ventas y recargas
export const obtenerVentasRecargas = async (req, res) => {
    try {
        const { tipo } = req.query; // Se puede filtrar por tipo: 'venta' o 'recarga'
        const filter = tipo ? { tipo } : {}; // Si se pasa 'tipo', filtra por ese tipo

        const ventasRecargas = await VentaRecarga.find(filter);
        res.json(ventasRecargas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener ventas y recargas' });
    }
};

// Crear una nueva venta o recarga
export const crearVentaRecarga = async (req, res) => {
    try {
        const { tipo, cliente, producto, cantidad, precio } = req.body;
        
        const nuevaVentaRecarga = new VentaRecarga({
            tipo,
            cliente,
            producto,
            cantidad,
            precio
        });
        
        await nuevaVentaRecarga.save();
        res.status(201).json(nuevaVentaRecarga);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear la venta o recarga' });
    }
};

// Actualizar una venta o recarga existente
export const actualizarVentaRecarga = async (req, res) => {
    try {
        const { tipo, cliente, producto, cantidad, precio } = req.body;
        
        const ventaRecarga = await VentaRecarga.findByIdAndUpdate(
            req.params.id,
            { tipo, cliente, producto, cantidad, precio },
            { new: true }
        );
        
        if (!ventaRecarga) {
            return res.status(404).json({ error: 'Venta o recarga no encontrada' });
        }
        
        res.json(ventaRecarga);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la venta o recarga' });
    }
};

// Eliminar una venta o recarga
export const eliminarVentaRecarga = async (req, res) => {
    try {
        const ventaRecarga = await VentaRecarga.findByIdAndDelete(req.params.id);
        
        if (!ventaRecarga) {
            return res.status(404).json({ error: 'Venta o recarga no encontrada' });
        }
        
        res.json({ message: 'Venta o recarga eliminada con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar la venta o recarga' });
    }
};
