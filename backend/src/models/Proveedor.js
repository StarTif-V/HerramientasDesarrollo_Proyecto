import mongoose from 'mongoose';

const proveedorSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    correo: { type: String, required: true },
    telefono: { type: String, required: true },
    direccion: { type: String, required: true },
    empresa: { type: String, required: true },
}, {
    timestamps: true,
});

const Proveedor = mongoose.model('Proveedor', proveedorSchema);

export default Proveedor;
