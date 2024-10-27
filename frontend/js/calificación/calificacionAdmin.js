import { getCalificacion, newCalificacion, updateCalificacion, borrarCalificacion, getOne} from "./Api.js";
import { getUsuario } from "../login/Api.js";
import { getRuta } from "../rutas/Api.js";

document.addEventListener('DOMContentLoaded', () => {
    const userName = localStorage.getItem('userName');
    if (userName) {
        document.getElementById('welcomeMessage').textContent = `Bienvenido: ${userName}`;
    } else {
        window.location.href = 'login/login.html';
    }
});

document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    window.location.href = 'login/login.html'; // Redirige al login después de cerrar sesión
});

const noti = document.querySelector('#tabla')
document.addEventListener('DOMContentLoaded', mostrarEnviosAdmin);
async function mostrarEnviosAdmin() {
    const envios = await getCalificacion();
    envios.forEach(envio => {
        const { _id, rutaId, userId, rating } = envio;
        /* let fechaa = fecha.substring(0, 10) */
        noti.innerHTML += `
        <tr>
            <th scope="row">${rutaId.nombreRut}</th>
            <td>${userId.nombre}</td>
            <td>${rating}</td>
            <td><button class="btn btn-dark update" data-bs-toggle="modal" data-bs-target="#update" idUpd="${_id}">Actualizar</button>
            <button type="button" value="${_id}" id="${_id}" class="btn btn-danger delete">Eliminar</button> </td>
        </tr>
        `
    })
}

async function cargarUsuarios() {
    try {
        const usuarios = await getUsuario();
        const selectUsuarios = document.querySelector('#selectUsuarios');

        usuarios.forEach(usuario => {
            const option = document.createElement('option');
            option.value = usuario._id;
            option.textContent = usuario.nombre;
            selectUsuarios.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar usuarios:', error);
    }
}

async function cargarUsuarioss() {
    try {
        const usuarios = await getUsuario();
        const selectUsuarios = document.querySelector('.selectUsuarioss');

        usuarios.forEach(usuario => {
            const option = document.createElement('option');
            option.value = usuario._id;
            option.textContent = usuario.nombre;
            selectUsuarios.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar usuarios:', error);
    }
}

async function cargarRutas() {
    try {
        const rutas = await getRuta();
        const selectUsuarios = document.querySelector('#selectRutas');

        rutas.forEach(ruta => {
            const option = document.createElement('option');
            option.value = ruta._id;
            option.textContent = ruta.nombreRut;
            selectUsuarios.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar rutas:', error);
    }
}

async function cargarRutass() {
    try {
        const rutas = await getRuta();
        const selectUsuarios = document.querySelector('.selectRutass');

        rutas.forEach(ruta => {
            const option = document.createElement('option');
            option.value = ruta._id;
            option.textContent = ruta.nombreRut;
            selectUsuarios.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar rutas:', error);
    }
}

cargarUsuarios(); cargarRutas();

const formulario = document.querySelector('.formu');
formulario.addEventListener('submit', validacionEnvio);

async function validacionEnvio(e) {
    e.preventDefault();

    const rutaId = document.querySelector('.rutaId').value;
    const userId = document.querySelector('.userId').value;
    const rating = document.querySelector('.rating').value;

    if(rating > 5 || rating <1){
        alert("Por favor indique un valor entre 0 y 5")
        return
    }

    const calif = {
        rutaId,
        userId,
        rating : Number(rating)
    }

    if (validacion(calif)) {
        alert("Llene todos los campos")
        return
    }


    console.log(calif);
    
    newCalificacion(calif);
    window.location.reload()
}

function validacion(objeto) {
    return !Object.values(objeto).every(element => element !== '');
}

const btnOption = document.querySelector('#tabla');
btnOption.addEventListener('click', borrar)

function borrar(e) {
    if (e.target.classList.contains('delete')) {
        const borrarr = e.target.getAttribute('id')
        console.log(borrarr);
        const confirmar = confirm("desea Eliminarlo?");
        if (confirmar) {
            borrarCalificacion(borrarr);
        }
    }
}

const upd = document.querySelector('#tabla')
upd.addEventListener('click', oneOrAnother)

function oneOrAnother(e) {
    if (e.target.classList.contains("update")) {
        launchModalUpt(e);
    }
}

async function launchModalUpt(e) {
    const idUpdate = e.target.getAttribute("idUpd");

    const {_id, rutaId, userId, rating} = await getOne(idUpdate)

    document.querySelector('#updId').value = _id;
    const userSelect = document.querySelector('#userId');
    const routeSelect = document.querySelector('#rutaId');
    document.querySelector('#rating').value = rating;

    await cargarUsuarioss();
    await cargarRutass();

    userSelect.value = userId;
    routeSelect.value = rutaId;
}

const updateForm = document.querySelector('.updateFormu');
updateForm.addEventListener("submit", actualizarDatos);

async function actualizarDatos(e) {
    e.preventDefault();

    const id = document.querySelector('#updId').value;
    const userId = document.querySelector('#userId').value;
    const rutaId = document.querySelector('#rutaId').value;
    const rating = Number(document.querySelector('#rating').value);

    if (rating > 5 || rating < 1) {
        alert("Por favor indique un valor entre 1 y 5");
        return;
    }

    const confirmar = confirm("¿Desea actualizar esta calificación?");
    if (!confirmar) return;

    const datos = { userId, rutaId, rating };

    try {
        await updateCalificacion(id, datos);
        alert("Calificación actualizada correctamente");
        window.location.reload();
    } catch (error) {
        console.error("Error al actualizar calificación:", error);
        alert("Hubo un error al actualizar la calificación.");
    }
}