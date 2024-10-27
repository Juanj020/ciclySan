import { Router } from 'express';
import { createCalificacion, getCalificaciones, getCalificacionesTotal, putCalificacion, updateCalificacion, deleteCalificacion, getCalificacionId } from '../controllers/calificacion.controller.js';

const router = Router();

router.post('/calificar-ruta', createCalificacion);
router.get('/calificaciones/:rutaId', getCalificaciones);
router.get('/', getCalificacionesTotal);
router.put('/:id', putCalificacion);
router.get('/:id', getCalificacionId);
router.delete('/:id', deleteCalificacion);
router.put('/calificaciones:id', updateCalificacion);

export default router;
