import { getRuta, newRuta, calificarRuta, obtenerCalificacionUsuario, actualizarCalificacion } from "./Api.js";


const carts = document.querySelector('.cont-der');

document.addEventListener('DOMContentLoaded', mostrarRutas);

async function mostrarRutas() {
    const rutas = await getRuta();
    rutas.forEach(async ruta => {
        const { _id, nombreRut, descripcion, dificultad, kilometros, tiempo_aprox, altitud_min, altitud_max, recomendaciones, imagen, link } = ruta;
        const nuevoDiv = document.createElement('div');
        nuevoDiv.classList.add('conte-cont');
        nuevoDiv.innerHTML = `
            <div class="imagen">
                <img width="350px" height="200px" src="${imagen}" alt="">
                <div class="estrella" data-ruta-id="${_id}">
                    <img src="../img/estrella.png" width="50px" class="estrella-icon" data-rating="1" alt="Estrella 1">
                    <img src="../img/estrella.png" width="50px" class="estrella-icon" data-rating="2" alt="Estrella 2">
                    <img src="../img/estrella.png" width="50px" class="estrella-icon" data-rating="3" alt="Estrella 3">
                    <img src="../img/estrella.png" width="50px" class="estrella-icon" data-rating="4" alt="Estrella 4">
                    <img src="../img/estrella.png" width="50px" class="estrella-icon" data-rating="5" alt="Estrella 5">
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
                    <h2>Altura max: ${altitud_max}</h2>    
                </div>
                <h2 class="descrip" id="descripcion_${_id}">${descripcion}</h2>
                <span class="ver-mas" id="ver-mas_${_id}">Ver más...</span>
                <a target="_blank" href="${link}" id="${_id}">Ver ruta</a>
            </div>
        `;
        carts.appendChild(nuevoDiv);

        const botonVerMas = document.getElementById(`ver-mas_${_id}`);
        botonVerMas.addEventListener('click', () => mostrarMas(_id));

        // Añadir eventos de calificación
        const estrellas = document.querySelectorAll(`.estrella[data-ruta-id="${_id}"] .estrella-icon`);
        estrellas.forEach(est => {
            est.addEventListener('click', () => calificarRutaCliente(_id, est.getAttribute('data-rating')));
        });

        const userId = localStorage.getItem('userId');
        if (userId) {
            const calificaciones = await obtenerCalificacionUsuario(_id, userId);
            
            if (calificaciones) {
                const calificacion = Array.isArray(calificaciones) && calificaciones.length > 0 ? calificaciones[0].rating : calificaciones.rating || 0;
                aplicarCalificacion(estrellas, calificacion);
            } else {
                console.error('Error al obtener calificaciones:', calificaciones);
            }
        } else {
            console.log("No hay usuario logueado, no se consultarán las calificaciones.");
        }
    });
}

async function calificarRutaCliente(rutaId, rating) {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Por favor, inicie sesión para calificar.');
        return;
    }

    const userId = localStorage.getItem('userId');
    const calificacion = { rutaId, userId, rating };

    try {
        // Obtener calificación existente para decidir entre POST y PUT
        const calificacionExistente = await obtenerCalificacionUsuario(rutaId, userId);
        
        if (calificacionExistente.rating != 0) {
            // Si ya existe, actualizar
            await actualizarCalificacion(calificacionExistente._id, calificacion);
        } else {
            // Si no existe, crear una nueva
            await calificarRuta(calificacion);
        }
        
        alert('¡Gracias por tu calificación!');
        const estrellas = document.querySelectorAll(`.estrella[data-ruta-id="${rutaId}"] .estrella-icon`);
        aplicarCalificacion(estrellas, parseInt(rating));
    } catch (error) {
        console.error('Error al calificar:', error);
        alert('Hubo un problema al enviar tu calificación.');
    }
}

function aplicarCalificacion(estrellas, calificacion) {
    estrellas.forEach(est => {
        const rating = parseInt(est.getAttribute('data-rating'));
        if (rating <= calificacion) {
            est.classList.add('calificada');
        } else {
            est.classList.remove('calificada');
        }
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

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        if (!file) resolve(null); // Si no hay archivo, resolver con null
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

const formulario = document.querySelector('.formu');
formulario.addEventListener('submit', validacionRuta);

async function validacionRuta(e) {
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
    const imagenn = document.querySelector('.imagenn').files[0];

    let imagenBase64 = ''; 

    if (imagenn) {
        try {
            imagenBase64 = await getBase64(imagenn); // Convierte la imagen a Base64
        } catch (error) {
            console.log('Error al convertir la imagen a base64:', error);
            alert('Error al procesar la imagen');
            return;
        }
    }

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
        imagen : imagenBase64
    };

    /* if (validacion(rut)) {
        alert("Llene todos los campos");
        return;
    } */
    alert("Tu ruta será evaluada y pronto aparecerá en la lista de rutas")
    newRuta(rut);
    window.location.href = "rutas.html";
}

document.addEventListener('DOMContentLoaded', () => {
    const userInfo = document.getElementById('user-info');
    const userName = localStorage.getItem('userName');
    const token = localStorage.getItem('token');
    const boton = document.querySelector('.boton');

    if (token && userName) {
        userInfo.innerHTML = `
            <span>Bienvenido, ${userName}</span>
            <a href="#" id="logout"><img width="50px" src="../img/puerta-abierta.png" alt="Cerrar sesión"></a>
        `;

        boton.style.marginLeft = '200px';
        boton.classList.remove('hidden');

        document.getElementById('logout').addEventListener('click', () => {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('userName');
            window.location.reload();
        });
    } else {
        userInfo.innerHTML = '<a href="login/login.html">Iniciar sesión</a>';
    }
});


