import mongoose from 'mongoose';

const envioShema = mongoose.Schema({
    correo:{
        type: String,
        required: [true, 'El correo es requerido en la factura'],
        trim: true
    },
    nombre:{
        type: String,
        required:[true, 'El nombre es requerido'],
        trim: true
    },
    cedula:{
        type: Number,
        required:[true, 'La cedula es requerida'],
        trim: true
    },
    direccion:{
        type: String,
        required:[true, 'La direccin es requerida'],
    },
    departamento:{
        type: String,
        required:[true, 'El departamento es requerido'],
    },
    ciudad:{
        type: String,
        required:[true, 'La ciudad es requerida'],
    },
    telefono:{
        type: Number,
        required:[true, 'El telefono es requerido'],
    }
});

const Envio = mongoose.model('envio', envioShema);

export default Envio;