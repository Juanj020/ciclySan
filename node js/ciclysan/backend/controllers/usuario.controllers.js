import Usuarios from "../models/Usuario.js";
import bcryptjs from 'bcryptjs'

const getUsuarios = async (req, res) =>{
    try {
        const usuario = await Usuarios.find();
        res.json(usuario); 
    } catch (error) {
        console.log(error);
    }
}

const getUsuariosId = async (req, res)=>{
    try {
        const usuario = await Usuarios.findOne({_id: req.params.id});
        res.json(usuario);
    } catch (error) {
        console.log(error);
    }
}

const postUsuarios = async (req, res) => {
    try {
        const { nombre, correo, password, telefono, rol } = req.body;
        const usuario = new Usuarios({nombre, correo, password, telefono, rol});

        const existeEmail = await Usuarios.findOne({correo});
        if(existeEmail){
            return res.status(400).json({msg:"El correo ya esta registrado"})
        }

        const encrip = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password, encrip);

        await usuario.save();
        res.json(usuario)

    } catch (error) {
        console.log(error);
    }
}

const putUsuarios = async (req, res)=>{
    try {
        const {nombre, correo, password, telefono, rol} = req.body;
        const nombreUsuario = await Usuarios.findOne({nombre});
        const correoUsuario = await Usuarios.findOne({correo});
        if(nombreUsuario)
        if((nombreUsuario._id).toString() != req.params.id)
        return res.status(400).json({msg: "El nombre del usuario ya esta registrado"});
        
        if(correoUsuario)
        if((correoUsuario._id).toString() != req.params.id)
        return res.status(400).json({msg: "Este correo ya esta registrado"})

        const usuario = await Usuarios.findOneAndUpdate({_id: req.params.id}, req.body,{new:true});
        res.json(usuario);
    } catch (error) {
        console.log(error);
    }
}

const deleteUsuarios = async (req,res)=>{
    try {
        const usuario = await Usuarios.deleteOne({_id:req.params.id})
        res.status(204).send();
        res.json(usuario)
    } catch (error) {
        console.log(error);
    }
} 

export {getUsuarios, postUsuarios, deleteUsuarios, getUsuariosId, putUsuarios};