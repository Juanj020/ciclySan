import { getRuta, newRuta, borrarRuta, getOne, updateRuta} from "./Api.js";

document.addEventListener('DOMContentLoaded', () => {
    const userName = localStorage.getItem('userName');
    if (!userName) {
        window.location.href = '../login/login.html';
    }
    if (userName) {
        document.getElementById('welcomeMessage').textContent = `Bienvenido: ${userName}`;
    } else {
        // Si no hay nombre de usuario, podrías redirigir al login o mostrar un mensaje
        window.location.href = 'login/login.html';
    }
});

const rut = document.querySelector('#tabla')
document.addEventListener('DOMContentLoaded', mostrarRutaAdmin);
async function mostrarRutaAdmin() {
    const noticias = await getRuta();
    noticias.forEach(ruta => {
        const {_id, nombreRut, descripcion, dificultad, kilometros, punto_partida, punto_llegada, tiempo_aprox, altitud_min, altitud_max, recomendaciones, imagen} = ruta;
        rut.innerHTML += `
        <tr>
            <th scope="row">${nombreRut}</th>
            <td class="descrip">${descripcion}</td>
            <td>${dificultad}</td>
            <td>${kilometros} Km</td>
            <td><button class="btn btn-dark update" data-bs-toggle="modal" data-bs-target="#update" idUpd="${_id}">Actualizar</button><button type="button" value="${_id}" id="${_id}"  class="btn btn-danger delete">Eliminar</button> </td>
        </tr>
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
        tiempo_aprox,
        altitud_min,
        altitud_max,
        recomendaciones,
        imagen
    }

    if (validacion(rut)) {
        alert("Por favor, complete todos los campos requeridos.");
        return;
    }

    newRuta(rut);
    window.location.href = "rutas.html"

}

function validacion(objeto){
    return !Object.values(objeto).every(element => element !== '');
}

const btnOption = document.querySelector('#tabla');
btnOption.addEventListener('click', borrar)
console.log(btnOption);

function borrar(e) {
    if (e.target.classList.contains('delete')) {
        const borrarr = e.target.getAttribute('id')
        console.log(borrarr);
        const confirmar = confirm("desea Eliminarlo?");
        if (confirmar) {
            borrarRuta(borrarr);
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

const updateModal = document.querySelector('#btnUpdate');
async function launchModalUpt(e) {
    const idUpdate = e.target.getAttribute("idUpd");

    const { _id,  nombreRut, descripcion, dificultad, kilometros, punto_partida, punto_llegada, tiempo_aprox, altitud_min, altitud_max, recomendaciones, imagen, link } = await getOne(idUpdate)


    document.querySelector('#updId').value = _id;
    document.querySelector('#nombreRut').value = nombreRut;
    document.querySelector('#descripcion').value = descripcion;
    document.querySelector('#dificultad').value = dificultad;
    document.querySelector('#kilometros').value = kilometros;
    document.querySelector('#tiempo_aprox').value = tiempo_aprox;
    document.querySelector('#altitud_min').value = altitud_min;
    document.querySelector('#altitud_max').value = altitud_max;
    document.querySelector('#imagennn').value = imagen;
    document.querySelector('#link').value = link;
}

updateModal.addEventListener("click", actualizarDatos);

async function actualizarDatos() {
    const id = document.querySelector('#updId').value;
    const nombreRut = document.querySelector('#nombreRut').value;
    const descripcion = document.querySelector('#descripcion').value;
    const dificultad = document.querySelector('#dificultad').value;
    const kilometros = document.querySelector('#kilometros').value;
    const tiempo_aprox = document.querySelector('#tiempo_aprox').value;
    const altitud_min = document.querySelector('#altitud_min').value;
    const altitud_max = document.querySelector('#altitud_max').value;
    const recomendaciones = document.querySelector('.recomendaciones').value;
    const imagen = document.querySelector('#imagennn').files[0];
    const link = document.querySelector('#link').value;

    const datos = {
        nombreRut,
        descripcion,
        dificultad,
        kilometros,
        tiempo_aprox,
        altitud_min,
        altitud_max,
        recomendaciones,
        imagen,
        link
    }

    await updateRuta(id, datos);
}
