import Calificacion from '../models/Calificacion.js';

export const createCalificacion = async (req, res) => {
    try {
        const { rutaId, userId, rating } = req.body;

        // Busca una calificación existente para esta ruta y usuario
        let calificacion = await Calificacion.findOne({ rutaId, userId });

        if (calificacion) {
            // Actualiza la calificación si ya existe
            calificacion.rating = rating;
        } else {
            // Crea una nueva calificación si no existe
            calificacion = new Calificacion({ rutaId, userId, rating });
        }

        await calificacion.save();
        res.status(200).json({ message: 'Calificación actualizada con éxito', calificacion });
    } catch (error) {
        console.error('Error al crear o actualizar calificación:', error);
        res.status(500).json({ message: 'Error al crear o actualizar calificación', error });
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

export const updateCalificacion = async (req, res) => {
    try {
        const { id } = req.params; // Obtener el ID de la calificación a actualizar
        const { rating } = req.body; // Obtener la nueva calificación desde el cuerpo de la solicitud

        // Buscar la calificación por su ID
        const calificacion = await Calificacion.findById(id);

        if (!calificacion) {
            return res.status(404).json({ message: 'Calificación no encontrada' });
        }

        // Actualizar la calificación
        calificacion.rating = rating;
        await calificacion.save();

        res.status(200).json({ message: 'Calificación actualizada con éxito', calificacion });
    } catch (error) {
        console.error('Error al actualizar la calificación:', error);
        res.status(500).json({ message: 'Error al actualizar la calificación', error });
    }
};