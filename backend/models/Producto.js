import mongoose from 'mongoose';

const productoShema = mongoose.Schema({
    nombrePro:{
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true,
        unique:true
    },
    precio:{
        type: Number,
        required:[true, 'El precio es requerido'],
    },
    stock:{
        type: Number,
        required:[true, 'La stock es requerido']
    },
    garantia:{
        type: String,
        default: ['6 meses'],
        trim: true
    }
});

const Productos = mongoose.model('producto', productoShema);

export default Productos;