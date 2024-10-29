import { Router } from 'express';
import { 
    createCalificacion, 
    getCalificaciones, 
    getCalificacionesTotal, 
    putCalificacion, 
    updateCalificacion, 
    deleteCalificacion, 
    getCalificacionId, 
    getCalificacionUsuario 
} from '../controllers/calificacion.controller.js';

const router = Router();

// Crear o actualizar una calificación para una ruta específica
router.post('/calificar-ruta', createCalificacion);

// Obtener todas las calificaciones de una ruta específica
router.get('/calificaciones/:rutaId', getCalificaciones);

// Obtener el total de calificaciones
router.get('/', getCalificacionesTotal);

// Obtener una calificación específica por ID
router.get('/:id', getCalificacionId);

// Obtener la calificación de un usuario específico para una ruta específica
router.get('/ruta/:rutaId/usuario/:userId', getCalificacionUsuario);

// Actualizar calificación por ID
router.put('/calificaciones/:id', updateCalificacion);

// Eliminar una calificación específica por ID
router.delete('/:id', deleteCalificacion);

export default router;