import Envios from "../models/Envio.js";

const getEnvios = async (req, res) =>{
    try {
        const envio = await Envios.find();
        res.json(envio); 
    } catch (error) {
        console.log(error);
    }
}

const getEnviosId = async (req, res)=>{
    try {
        const envio = await Envios.findOne({_id: req.params.id});
        res.json(envio);
    } catch (error) {
        console.log(error);
    }
}

const postEnvios = async (req, res) => {
    try {
        const { correo, nombre, cedula, direccion, departamento, ciudad, telefono } = req.body;
        const envio = new Envios({correo, nombre, cedula, direccion, departamento, ciudad, telefono});
        await envio.save();
        res.json(envio)

    } catch (error) {
        console.log(error);
    }
}

const putEnvios = async (req, res)=>{
    try {
        const {correo, nombre, cedula, direccion, departamento, ciudad, telefono } = req.body;

        const envio = await Envios.findOneAndUpdate({_id: req.params.id}, req.body,{new:true});
        res.json(envio);
    } catch (error) {
        console.log(error);
    }
}

const deleteEnvios = async (req,res)=>{
    try {
        const envio = await Envios.deleteOne({_id:req.params.id})
        res.status(204).send();
        res.json(envio)
    } catch (error) {
        console.log(error);
    }
} 

export {getEnvios, postEnvios, deleteEnvios, getEnviosId, putEnvios};