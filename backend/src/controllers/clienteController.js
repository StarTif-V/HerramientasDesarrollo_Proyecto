import Cliente from '../models/Cliente.js';  // Importación correcta

// Crear un cliente
export const crearCliente = async (req, res) => {
    try {
        console.log('Datos recibidos:', req.body); // Verifica los datos
        const cliente = new Cliente(req.body);
        await cliente.save();
        res.status(201).json(cliente);
    } catch (error) {
        console.error('Error al crear cliente:', error);
        res.status(400).json({ message: 'Error al crear cliente', error });
    }
};

// Obtener todos los clientes
export const obtenerClientes = (req, res) => {
    Cliente.find()
        .then((clientes) => res.status(200).json(clientes))
        .catch((error) => res.status(400).json({ error: error.message }));
};

// Actualizar un cliente
export const actualizarCliente = (req, res) => {
    const { id } = req.params;
    Cliente.findByIdAndUpdate(id, req.body, { new: true })
        .then((cliente) => res.status(200).json(cliente))
        .catch((error) => res.status(400).json({ error: error.message }));
};

// Eliminar un cliente
export const eliminarCliente = (req, res) => {
    const { id } = req.params;
    Cliente.findByIdAndDelete(id)
        .then(() => res.status(200).json({ message: 'Cliente eliminado' }))
        .catch((error) => res.status(400).json({ error: error.message }));
};
