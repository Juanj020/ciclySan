import mongoose from 'mongoose';

const usuarioShema = mongoose.Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true
    },
    correo:{
        type: String,
        required:[true, 'El correo es requerido'],
        unique:true,
        trim: true
    },
    password:{
        type: String,
        required:[true, 'La contraseña es requerida']
    },
    telefono:{
        type: Number,
        required:[true, 'El telefono es obligatorio']
    },
    rol:{
        type: String,
        required: true,
        default: ['USER']
    }
});

const Usuarios = mongoose.model('usuario', usuarioShema);

export default Usuarios;