import { getRuta, newRuta } from "./Api.js";

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
            est.addEventListener('click', () => calificarRuta(_id, est.getAttribute('data-rating')));
        });

        // Obtener y aplicar calificación existente
        const calificacion = await obtenerCalificacion(_id);
        aplicarCalificacion(estrellas, calificacion);
    });
}

async function calificarRuta(rutaId, rating) {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Por favor, inicie sesión para calificar.');
        return;
    }

    const userId = 'el-id-del-usuario'; // Obtén el ID del usuario de alguna manera
    const calificacion = {
        rutaId,
        userId,
        rating
    };

    try {
        await fetch('/api/calificar-ruta', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(calificacion)
        });
        alert('¡Gracias por tu calificación!');
        // Actualizar la interfaz con la calificación seleccionada
        const estrellas = document.querySelectorAll(`.estrella[data-ruta-id="${rutaId}"] .estrella-icon`);
        aplicarCalificacion(estrellas, rating);
    } catch (error) {
        console.error('Error al calificar:', error);
        alert('Hubo un problema al enviar tu calificación.');
    }
}

async function obtenerCalificacion(rutaId) {
    const token = localStorage.getItem('token');
    if (!token) return 0; // No se puede obtener calificación si no está autenticado

    try {
        const response = await fetch(`/api/calificaciones/${rutaId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        return data.rating || 0; // Devuelve la calificación existente o 0 si no hay
    } catch (error) {
        console.error('Error al obtener calificación:', error);
        return 0;
    }
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

function validacionRuta(e) {
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
    };

    if (validacion(rut)) {
        alert("Llene todos los campos");
        return;
    }

    newRuta(rut);
    window.location.href = "rutas.html";
}

function validacion(objeto) {
    return !Object.values(objeto).every(element => element !== '');
}

document.addEventListener('DOMContentLoaded', () => {
    const userInfo = document.getElementById('user-info');
    const userName = localStorage.getItem('userName');
    const token = localStorage.getItem('token');
    const boton = document.querySelector('.boton'); // Selecciona el botón que quieres mostrar u ocultar

    if (token && userName) {
        // Muestra el nombre del usuario y el botón de cierre de sesión
        userInfo.innerHTML = `
            <span>Bienvenido, ${userName}</span>
            <a href="#" id="logout"><img width="50px" src="../img/puerta-abierta.png" alt="Cerrar sesión"></a>
        `;

        boton.style.marginLeft = '200px';
        boton.classList.remove('hidden'); // Muestra el botón adicional si hay un nombre de usuario

        // Manejo de cierre de sesión
        document.getElementById('logout').addEventListener('click', () => {
            localStorage.removeItem('token');
            localStorage.removeItem('userName');
            window.location.href = 'login/login.html'; // Redirige al login después de cerrar sesión
        });
    } else {
        // Muestra el enlace para iniciar sesión
        userInfo.innerHTML = '<a href="login/login.html">Iniciar sesión</a>';
    }
});
