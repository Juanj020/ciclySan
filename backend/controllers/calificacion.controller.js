import Calificacion from '../models/Calificacion.js';

export const createCalificacion = async (req, res) => {
    try {
        const { rutaId, userId, rating } = req.body;
        const nuevaCalificacion = new Calificacion({ rutaId, userId, rating });
        await nuevaCalificacion.save();
        res.status(201).json({ message: 'Calificación creada con éxito', calificacion: nuevaCalificacion });
    } catch (error) {
        console.error('Error al crear calificación:', error);
        res.status(500).json({ message: 'Error al crear calificación', error });
    }
};

export const getCalificaciones = async (req, res) => {
    try {
        const { rutaId } = req.params;
        const calificaciones = await Calificacion.find({ rutaId });
        res.status(200).json(calificaciones);
    } catch (error) {
        console.error('Error al obtener calificaciones:', error);
        res.status(500).json({ message: 'Error al obtener calificaciones', error });
    }
};
