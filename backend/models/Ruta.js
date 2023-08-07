import mongoose from 'mongoose';

const rutaShema = mongoose.Schema({
    nombreRut:{
        type: String,
        required: [true, 'El nombre de la ruta es obligatoria'],
        trim: true,
        unique:true
    },
    descripcion:{
        type: String,
        required:[true, 'La descripcion es requerida'],
        trim: true
    },
    dificultad:{
        type: String,
        required:[true, 'La dificultad es requerida'],
    },
    kilometros:{
        type: Number
    },
    punto_partida:{
        type: String,
        required:[true, 'El punto de partida es requerido'],
    },
    punto_llegada:{
        type: String,
        required:[true, 'El punto de llegada es requerido'],
    },
    tiempo_aprox:{
        type: String,
        trim: true
    },
    altitud_min:{
        type: String,
        trim: true
    },
    altitud_max:{
        type: String,
        trim: true
    },
    recomendaciones:{
        type: String,
        trim: true
    },
    imagen:{
        type: String
    }
});

const Rutas = mongoose.model('ruta', rutaShema);

export default Rutas;