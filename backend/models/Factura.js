import mongoose from 'mongoose';

const facturaShema = mongoose.Schema({
    fecha:{
        type: Date,
        required: [true, 'La fecha es obligatoria']
    },
    productos:{
        type: Array,
        required:[true, 'El o los productos son requeridos'],
        trim: true
    },
    total:{
        type: Number,
        required:[true, 'El total es requerido'],
    },
    forma_pago:{
        type: String,
        required:[true, 'La forma de pago es requerida'],
    }
});

const Facturas = mongoose.model('factura', facturaShema);

export default Facturas;