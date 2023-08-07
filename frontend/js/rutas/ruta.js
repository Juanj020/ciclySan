import { getRuta, newRuta } from "./Api.js";

const carts = document.querySelector('.cont-der')
document.addEventListener('DOMContentLoaded', mostrarRutas);

async function mostrarRutas(){
    const rutas = await getRuta();
    rutas.forEach(ruta=>{
        const {_id, nombreRut, descripcion, dificultad, kilometros, punto_partida, punto_llegada, tiempo_aprox, altitud_min, altitud_max, recomendaciones, imagen} = ruta;
        carts.innerHTML += `
        <div class="conte-cont">
            <div class="imagen">
                <img width="350px" height="200px" src="${imagen}" alt="">
            </div>
            <div class="parrafos">
                <h1>${nombreRut}</h1>
                <h2>Dificultad: ${dificultad}</h2>
                <h2>Kilometros: ${kilometros}</h2>
                <h2>${descripcion}</h2>
                <button>Detalles</button>
            </div>
            <div class="vacio">
            </div>
        </div>
        `
    })
}


const formulario = document.querySelector('.formu');
formulario.addEventListener('submit', validacionRuta);

function validacionRuta(e){
    e.preventDefault();

    const nombreRut = document.querySelector('.nombreRut').value;
    const descripcion = document.querySelector('.descripcion').value;
    const dificultad = document.querySelector('.dificultad').value;
    const kilometros = document.querySelector('.kilometros').value;
    const punto_llegada = document.querySelector('.punto_llegada').value;
    const punto_partida = document.querySelector('.punto_partida').value;
    const tiempo_aprox = document.querySelector('.tiempo_aprox').value;
    const altitud_min = document.querySelector('.altitud_min').value;
    const altitud_max = document.querySelector('.altitud_max').value;
    const recomendaciones = document.querySelector('.recomendaciones').value;
    const imagen = document.querySelector('.imagenn').value;

    const rut = {
        nombreRut,
        descripcion,
        dificultad,
        kilometros,
        punto_llegada,
        punto_partida,
        tiempo_aprox,
        altitud_min,
        altitud_max,
        recomendaciones,
        imagen
    }

    if(validacion(rut)){
        alert("Llene todos los campos")
        return
    }

    newRuta(rut);
    window.location.href = "rutas.html"

}

function validacion(objeto){
    return !Object.values(objeto).every(element => element !== '');
}