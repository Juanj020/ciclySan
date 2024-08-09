import { Router } from 'express';
import { createCalificacion, getCalificaciones } from '../controllers/calificacion.controller.js';

const router = Router();

router.post('/calificar-ruta', createCalificacion);
router.get('/calificaciones/:rutaId', getCalificaciones);

export default router;
