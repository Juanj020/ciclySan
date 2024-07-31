import { getRuta, newRuta } from "./Api.js";

const carts = document.querySelector('.cont-der')
document.addEventListener('DOMContentLoaded', mostrarRutas);

async function mostrarRutas() {
    const rutas = await getRuta();
    rutas.forEach(ruta => {
        const { _id, nombreRut, descripcion, dificultad, kilometros, tiempo_aprox, altitud_min, altitud_max, recomendaciones, imagen, link } = ruta;
        const nuevoDiv = document.createElement('div');
        nuevoDiv.classList.add('conte-cont');
        nuevoDiv.innerHTML = `
        
            <div class="imagen">
                <img width="350px" height="200px" src="${imagen}" alt="">
                <div class="estrella">
                    <img src="../img/estrella.png" width="50px" class="" alt="">
                    <img src="../img/estrella.png" width="50px" class="" alt="">
                    <img src="../img/estrella.png" width="50px" class="" alt="">
                    <img src="../img/estrella.png" width="50px" class="" alt="">
                    <img src="../img/estrella.png" width="50px" class="" alt="">
                </div>
            </div>
            <div class="parrafos">
                <h1>${nombreRut}</h1>
                <div class="parrafos-parte">
                    <h2>Dificultad: ${dificultad}</h2>
                    <h2>Kilometros: ${kilometros}</h2>
                    </div>
                <div class="parrafos-parte">
                    <h2>Tiempo aprox: ${tiempo_aprox}</h2>
                    <h2>Altura min: ${altitud_min}</h2>
                    <h2>Altura min: ${altitud_max}</h2>    
                </div>
                <h2 class="descrip" id="descripcion_${_id}">${descripcion}</h2>
                <span class="ver-mas" id="ver-mas_${_id}">Ver más...</span>
                <a target="_blank" href="${link}" id="${_id}">Ver ruta</a>
            </div>
        `;
        carts.appendChild(nuevoDiv);

        const botonVerMas = document.getElementById(`ver-mas_${_id}`);
        botonVerMas.addEventListener('click', () => mostrarMas(_id));
    });
}

function mostrarMas(rutaId) {
    var descripcion = document.getElementById(`descripcion_${rutaId}`);
    var botonVerMas = document.getElementById(`ver-mas_${rutaId}`);

    if (descripcion.classList.contains('descrip')) {
        descripcion.classList.remove('descrip');
        botonVerMas.textContent = 'Ver menos';
    } else {
        descripcion.classList.add('descrip');
        botonVerMas.textContent = 'Ver más...';
    }
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