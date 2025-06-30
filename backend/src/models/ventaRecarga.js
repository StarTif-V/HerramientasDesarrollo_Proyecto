import mongoose from 'mongoose';

const ventaRecargaSchema = new mongoose.Schema({
    tipo: { 
        type: String, 
        required: true, 
        enum: ['venta', 'recarga'] // Solo permite 'venta' o 'recarga'
    },
    cliente: { type: String, required: true },
    producto: { type: String, required: true },
    cantidad: { type: Number, required: true },
    precio: { type: Number, required: true }
});

const VentaRecarga = mongoose.model('VentaRecarga', ventaRecargaSchema);

export default VentaRecarga;
