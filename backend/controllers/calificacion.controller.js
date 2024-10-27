import Calificacion from '../models/Calificacion.js';

export const getCalificacionesTotal = async (req, res) => {
    try {
        const calificaciones = await Calificacion.find()
            .populate({ path: 'userId', select: 'nombre' }) 
            .populate({ path: 'rutaId', select: 'nombreRut' }); 
        res.json(calificaciones);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener los envíos" });
    }
};

export const getCalificacionId = async (req, res) => {
    try {
        const calificacion = await Calificacion.findOne({_id : req.params.id})
        if (!calificacion) {
            return res.status(404).json({ error: 'Calificación no encontrada' });
        }
        res.json(calificacion);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la calificación' });
    }
};

export const createCalificacion = async (req, res) => {
    try {
        const { rutaId, userId, rating } = req.body;

        let calificacion = await Calificacion.findOne({ rutaId, userId });

        if (calificacion) {
            calificacion.rating = rating;
        } else {
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

export const putCalificacion = async (req, res) => {
    try {
        const calificacion = await Calificacion.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!calificacion) {
            return res.status(404).json({ error: 'Calificación no encontrada' });
        }
        res.json(calificacion);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la calificacion' });
    }
};

export const deleteCalificacion = async (req, res) => {
    try {
        const calificacion = await Calificacion.findByIdAndDelete(req.params.id);
        if (!calificacion) {
            return res.status(404).json({ error: 'Calificación no encontrada' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la calificación' });
    }
};