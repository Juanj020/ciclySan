import response from "express";
import Usuario from "../models/Usuario.js";
import bcryptjs from "bcryptjs"


const login = async (req, res = response) =>{
    const {correo, password} = req.body

    try {
        
        const usuario = await Usuario.findOne({correo})

        if(!usuario){
            res.json({
                msg: "El email no esta registrado",
                success: false
            })
        }

        const passwordValido = bcryptjs.compareSync(password, usuario.password)

        if(!passwordValido){
            res.json({
                msg: "La contraseña no es correcta",
                success:false
            })
        }
        
        
        res.json({
            success:true,
            usuario
        })

    } catch (error) {
        console.log(error);
    }  
}

export { login }