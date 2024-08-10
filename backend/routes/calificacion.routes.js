import { Router } from 'express';
import { createCalificacion, getCalificaciones, updateCalificacion } from '../controllers/calificacion.controller.js';

const router = Router();

router.post('/calificar-ruta', createCalificacion);
router.get('/calificaciones/:rutaId', getCalificaciones);
router.put('/calificaciones/:id', updateCalificacion);

export default router;
