import express from 'express';
import cors from 'cors';
import conectaDB from '../database/config.js'
import usuarioRouter from "../routes/usuario.routes.js"
import productoRouter from "../routes/producto.routes.js"
import noticiaRouter from "../routes/noticia.routes.js"
import rutaRouter from "../routes/ruta.routes.js"
import facturaRouter from "../routes/factura.routes.js"
import envioRouter from "../routes/envio.routes.js"

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuarioPath = "/api/usuarios";
        this.facturaPath = "/api/facturas";
        this.envioPath = "/api/envios";
        this.productoPath = "/api/productos";
        this.noticiaPath = "/api/noticias";
        this.rutaPath = "/api/rutas";

        this.dbConexion();

        this.middlewares(express.static);

        this.routes();

    }

    async dbConexion(){
        await conectaDB();
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'))
    }

    routes(){
        this.app.use(this.usuarioPath, usuarioRouter);
        this.app.use(this.productoPath, productoRouter);
        this.app.use(this.noticiaPath, noticiaRouter);
        this.app.use(this.rutaPath, rutaRouter);
        this.app.use(this.facturaPath, facturaRouter);
        this.app.use(this.envioPath, envioRouter);
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`El server esta corriendo el el puerto: ${this.port}`);
        })
    }

}

export {Server};