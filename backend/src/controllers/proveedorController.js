import Proveedor from '../models/Proveedor.js';

// Crear un nuevo proveedor
export const crearProveedor = async (req, res) => {
    try {
        const nuevoProveedor = new Proveedor(req.body);
        const proveedorGuardado = await nuevoProveedor.save();
        res.status(201).json(proveedorGuardado);
    } catch (error) {
        console.error('Error al crear proveedor:', error);
        res.status(400).json({ error: error.message });
    }
};

// Obtener todos los proveedores
export const obtenerProveedores = async (req, res) => {
    try {
        const proveedores = await Proveedor.find();
        res.json(proveedores);
    } catch (error) {
        console.error('Error al obtener proveedores:', error);
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un proveedor
export const actualizarProveedor = async (req, res) => {
    try {
        const proveedorActualizado = await Proveedor.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!proveedorActualizado) {
            return res.status(404).json({ error: 'Proveedor no encontrado' });
        }
        res.json(proveedorActualizado);
    } catch (error) {
        console.error('Error al actualizar proveedor:', error);
        res.status(400).json({ error: error.message });
    }
};

// Eliminar un proveedor
export const eliminarProveedor = async (req, res) => {
    try {
        const proveedorEliminado = await Proveedor.findByIdAndDelete(req.params.id);
        if (!proveedorEliminado) {
            return res.status(404).json({ error: 'Proveedor no encontrado' });
        }
        res.json({ message: 'Proveedor eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar proveedor:', error);
        res.status(500).json({ error: error.message });
    }
};
