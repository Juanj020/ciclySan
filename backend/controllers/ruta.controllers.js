import Rutas from "../models/Ruta.js";

const getRutas = async (req, res) =>{
    try {
        const ruta = await Rutas.find();
        res.json(ruta); 
    } catch (error) {
        console.log(error);
    }
}

const getRutasId = async (req, res)=>{
    try {
        const ruta = await Rutas.findOne({_id: req.params.id});
        res.json(ruta);
    } catch (error) {
        console.log(error);
    }
}

const postRutas = async (req, res) => {
    try {
        const { nombreRut, descripcion, dificultad, kilometros, punto_partida, punto_llegada, tiempo_aprox, altitud_min, altitud_max, recomendaciones } = req.body;
        const ruta = new Rutas({nombreRut, descripcion, dificultad, kilometros, punto_partida, punto_llegada, tiempo_aprox, altitud_min, altitud_max, recomendaciones});

        const existeRuta = await Rutas.findOne({nombreRut});
        if(existeRuta){
            return res.status(400).json({msg:"La ruta ya esta registado"})
        }

        await ruta.save();
        res.json(ruta)

    } catch (error) {
        console.log(error);
    }
}

const putRutas = async (req, res)=>{
    try {
        const {titulo, descripcion, img, resumen, autor} = req.body;
        const nombreruta = await Rutas.findOne({titulo});
        if(nombreruta)
        if((nombreruta._id).toString() != req.params.id)
        return res.status(400).json({msg: "El titulo ya esta registrado"});

        const ruta = await Rutas.findOneAndUpdate({_id: req.params.id}, req.body,{new:true});
        res.json(ruta);
    } catch (error) {
        console.log(error);
    }
}

const deleteRutas = async (req,res)=>{
    try {
        const ruta = await Rutas.deleteOne({_id:req.params.id})
        res.status(204).send();
        res.json(ruta)
    } catch (error) {
        console.log(error);
    }
} 

export {getRutas, postRutas, deleteRutas, getRutasId, putRutas};