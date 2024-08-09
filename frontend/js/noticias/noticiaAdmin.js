import { getNoticia, newNoticia, borrarNoticia, getOne} from "./Api.js";

document.addEventListener('DOMContentLoaded', () => {
    const userName = localStorage.getItem('userName');
    if (userName) {
        document.getElementById('welcomeMessage').textContent = `Bienvenido: ${userName}`;
    } else {
        // Si no hay nombre de usuario, podrías redirigir al login o mostrar un mensaje
        window.location.href = 'login/login.html';
    }
});

document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    window.location.href = 'login/login.html'; // Redirige al login después de cerrar sesión
});

const noti = document.querySelector('#tabla')
document.addEventListener('DOMContentLoaded', mostrarNoticiasAdmin);
async function mostrarNoticiasAdmin() {
    const noticias = await getNoticia();
    noticias.forEach(ruta => {
        const { _id, titulo, descripcion, imagen, resumen, fecha, autor } = ruta;
        let fechaa = fecha.substring(0, 10)
        noti.innerHTML += `
        <tr>
            <th scope="row">${titulo}</th>
            <td>${descripcion}</td>
            <td>${fechaa}</td>
            <td>${autor}</td>
            <td><button class="btn btn-dark update" data-bs-toggle="modal" data-bs-target="#update" updId="${_id}">Actualizar</button><button type="button" value="${_id}"  class="btn btn-danger delete">Eliminar</button> </td>
        </tr>
        `
    })
}

const formulario = document.querySelector('.formu');
formulario.addEventListener('submit', validacionNoticia);

function validacionNoticia(e) {
    e.preventDefault();

    const titulo = document.querySelector('.tituloo').value;
    const descripcion = document.querySelector('.descripcion').value;
    const imagen = document.querySelector('.imagen').value;
    const resumen = document.querySelector('.resumen').value;
    const fecha = document.querySelector('.fecha').value;
    const autor = document.querySelector('.autor').value;

    const usu = {
        titulo,
        descripcion,
        imagen,
        resumen,
        fecha,
        autor
    }

    if (validacion(usu)) {
        alert("Llene todos los campos")
        return
    }

    newNoticia(usu);
    window.location.href = "noticia.html"

}

function validacion(objeto) {
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
            borrarNoticia(borrarr);
        }
    }
}
/* 
let params = new URLSearchParams(window.location.search);
let valor = params.get('idd');
console.log(valor);

console.log(getOneID); */

const upd = document.querySelector('#tabla')
upd.addEventListener('click', oneOrAnother)

function oneOrAnother(e) {
    if (e.target.classList.contains("update")) {
        launchModalUpt(e);
    }
}

const updateModal = document.querySelector('#update');
async function launchModalUpt(e) {
    const idUpdate = e.target.getAttribute("idUpd");

    const {_id, titulo, descripcion, imagen, fecha, estado } = await getOne(idUpdate)


    document.querySelector('#updId').value = _id;
    document.querySelector('#titulo').value = titulo;
    document.querySelector('#descripcion').value = descripcion;
    document.querySelector('#imagen').value = imagen;
    document.querySelector('#fecha').value = fecha;
    document.querySelector('#estado').value = estado;
}