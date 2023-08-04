import Noticias from "../models/Noticia.js";

const getNoticias = async (req, res) =>{
    try {
        const noticia = await Noticias.find();
        res.json(noticia); 
    } catch (error) {
        console.log(error);
    }
}

const getNoticiasId = async (req, res)=>{
    try {
        const noticia = await Noticias.findOne({_id: req.params.id});
        res.json(noticia);
    } catch (error) {
        console.log(error);
    }
}

const postNoticias = async (req, res) => {
    try {
        const { titulo, descripcion, img, resumen, fecha, autor } = req.body;
        const noticia = new Noticias({titulo, descripcion, img, resumen, fecha, autor});

        const existeTitulo = await Noticias.findOne({titulo});
        if(existeTitulo){
            return res.status(400).json({msg:"El titulo ya esta registado"})
        }

        await noticia.save();
        res.json(noticia)

    } catch (error) {
        console.log(error);
    }
}

const putNoticias = async (req, res)=>{
    try {
        const {titulo, descripcion, img, resumen, autor} = req.body;
        const nombreNoticia = await Noticias.findOne({titulo});
        if(nombreNoticia)
        if((nombreNoticia._id).toString() != req.params.id)
        return res.status(400).json({msg: "El titulo ya esta registrado"});

        const noticia = await Noticias.findOneAndUpdate({_id: req.params.id}, req.body,{new:true});
        res.json(noticia);
    } catch (error) {
        console.log(error);
    }
}

const deleteNoticias = async (req,res)=>{
    try {
        const noticia = await Noticias.deleteOne({_id:req.params.id})
        res.status(204).send();
        res.json(noticia)
    } catch (error) {
        console.log(error);
    }
} 

export {getNoticias, postNoticias, deleteNoticias, getNoticiasId, putNoticias};