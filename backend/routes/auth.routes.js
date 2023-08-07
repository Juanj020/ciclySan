import Router from "express"
import {check} from "express-validator"
import { login } from "../controllers/auth.controller.js"
import validarDocumentos from "../middlewares/validate.documents.js"

const router = Router()

router.post("/",[
    check('correo', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarDocumentos
], login)

export default router