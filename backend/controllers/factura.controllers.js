import Facturas from "../models/Factura.js";

const getFacturas = async (req, res) =>{
    try {
        const factura = await Facturas.find();
        res.json(factura); 
    } catch (error) {
        console.log(error);
    }
}

const getFacturasId = async (req, res)=>{
    try {
        const factura = await Facturas.findOne({_id: req.params.id});
        res.json(factura);
    } catch (error) {
        console.log(error);
    }
}

const postFacturas = async (req, res) => {
    try {
        const { fecha, productos, total, forma_pago } = req.body;
        const factura = new Facturas({fecha, productos, total, forma_pago});


        await factura.save();
        res.json(factura)

    } catch (error) {
        console.log(error);
    }
}

const putFacturas = async (req, res)=>{
    try {
        const {fecha, productos, total, forma_pago} = req.body;

        const factura = await Facturas.findOneAndUpdate({_id: req.params.id}, req.body,{new:true});
        res.json(factura);
    } catch (error) {
        console.log(error);
    }
}

const deleteFacturas = async (req,res)=>{
    try {
        const factura = await Facturas.deleteOne({_id:req.params.id})
        res.status(204).send();
        res.json(factura)
    } catch (error) {
        console.log(error);
    }
} 

export {getFacturas, postFacturas, deleteFacturas, getFacturasId, putFacturas};