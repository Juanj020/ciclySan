import express from 'express';
import cors from 'cors';
import conectaDB from '../database/config.js'
import usuarioRouter from "../routes/usuario.routes.js"
import productoRouter from "../routes/producto.routes.js"

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuarioPath = "/api/usuarios";
        this.productoPath = "/api/productos";

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
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`El server esta corriendo el el puerto: ${this.port}`);
        })
    }

}

export {Server};