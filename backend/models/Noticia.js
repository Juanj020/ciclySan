import mongoose from 'mongoose';

const noticiaShema = mongoose.Schema({
    titulo:{
        type: String,
        required: [true, 'El titulo es obligatorio'],
        trim: true,
        unique:true
    },
    descripcion:{
        type: String,
        required:[true, 'La descripcion es requerida'],
        trim: true
    },
    img:{
        type: String
    },
    resumen:{
        type: String,
        required:[true, 'El resumen es obligatorio'],
        trim: true
    },
    autor:{
        type: String,
        required:[true, 'El autor el obligatorio'],
        trim: true
    }
});

const Noticias = mongoose.model('noticia', noticiaShema);

export default Noticias;