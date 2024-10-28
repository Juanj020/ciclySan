import { Router } from 'express';
import { createCalificacion, getCalificaciones, getCalificacionesTotal, putCalificacion, updateCalificacion, deleteCalificacion, getCalificacionId, getCalificacionUsuario } from '../controllers/calificacion.controller.js';

const router = Router();

router.post('/calificar-ruta', createCalificacion);
router.get('/calificaciones/:rutaId', getCalificaciones);
router.get('/', getCalificacionesTotal);
router.put('/:id', putCalificacion);
router.get('/:id', getCalificacionId);
router.delete('/:id', deleteCalificacion);
router.put('/calificaciones/:id', updateCalificacion);
router.get('/calificacion/ruta/:rutaId/usuario', getCalificacionUsuario);

export default router;
