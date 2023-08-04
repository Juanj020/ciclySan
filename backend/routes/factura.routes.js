import express from 'express';
const router = express.Router();
import validateDocuments from "../middlewares/validate.documents.js";

import { getFacturas, postFacturas, deleteFacturas, getFacturasId, putFacturas } from "../controllers/factura.controllers.js";
import { check } from 'express-validator';

router.get('/', getFacturas);
router.post('/', [
    check('fecha', "Falta la fecha de la compra").not().isEmpty(),
    check('productos', "Es agregar productos al carrito").not().isEmpty(),
    check('total', "Es nesario el total").not().isEmpty(),
    check('forma_pago', 'El requerido la forma de pago').not().isEmpty(),
    validateDocuments
], postFacturas);

router.get('/:id', getFacturasId);
router.delete('/:id', deleteFacturas);
router.put('/:id', putFacturas);

export default router;