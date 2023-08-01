import express from 'express';
const router = express.Router();
import validateDocuments from "../middlewares/validate.documents.js";

import { getNoticias, postNoticias, getNoticiasId, deleteNoticias, putNoticias } from '../controllers/noticia.controllers.js';
import { check } from 'express-validator';

router.get('/', getNoticias);
router.post('/', [
    check('titulo', "Es obligatorio el titulo").not().isEmpty(),
    check('precio', "El precio debe ser mayor a 1000").isLength({min:4}),
    check('stock', 'El stock debe llevar un valor').not().isEmpty(),
    validateDocuments
], postProductos);

router.get('/:id', getProductosId);
router.delete('/:id', deleteProductos);
router.put('/:id', putProductos);

export default router;