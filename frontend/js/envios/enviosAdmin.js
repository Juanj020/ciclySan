import { getEnvio, newEnvio, updateEnvio, borrarEnvio, getOne} from "./Api.js";

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
    localStorage.removeItem('userId');
    window.location.href = 'login/login.html'; // Redirige al login después de cerrar sesión
});

const noti = document.querySelector('#tabla')
document.addEventListener('DOMContentLoaded', mostrarEnviosAdmin);
async function mostrarEnviosAdmin() {
    const envios = await getEnvio();
    envios.forEach(envio => {
        const { _id, nombre, correo, cedula, direccion, departamento, ciudad, telefono, fk_factura, estado_envio } = envio;
        /* let fechaa = fecha.substring(0, 10) */
        noti.innerHTML += `
        <tr>
            <th scope="row">${nombre}</th>
            <td>${cedula}</td>
            <td>${correo}</td>
            <td>${direccion}</td>
            <td>${departamento}</td>
            <td><button class="btn btn-dark update" data-bs-toggle="modal" data-bs-target="#update" idUpd="${_id}">Actualizar</button>
            <button type="button" value="${_id}" id="${_id}" class="btn btn-danger delete">Eliminar</button> </td>
        </tr>
        `
    })
}

// Función para convertir la imagen a Base64
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
formulario.addEventListener('submit', validacionEnvio);

async function validacionEnvio(e) {
    e.preventDefault();

    const nombre = document.querySelector('.nombre').value;
    const cedula = document.querySelector('.cedula').value;
    const correo = document.querySelector('.correo').value;
    const direccion = document.querySelector('.direccion').value;
    const departamento = document.querySelector('.departamento').value;
    const ciudad = document.querySelector('.ciudad').value;
    const telefono = document.querySelector('.telefono').value;
    const fecha_entrega = document.querySelector('.fecha_entrega').value;
    const fk_factura = document.querySelector('.fk_factura').value;
    const estado_envio = document.querySelector('.estado_envio').value;

    const envi = {
        nombre,
        cedula,
        correo,
        direccion,
        departamento,
        ciudad,
        telefono,
        fecha_entrega,
        fk_factura,
        estado_envio
    }

    if (validacion(envi)) {
        alert("Llene todos los campos")
        return
    }

    newEnvio(envi);
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
            borrarEnvio(borrarr);
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

    const {_id, nombre, correo, cedula, direccion, departamento, ciudad, telefono, fecha_entrega, fk_factura, estado_envio} = await getOne(idUpdate)

    document.querySelector('#updId').value = _id;
    document.querySelector('#nombre').value = nombre;
    document.querySelector('#correo').value = correo;
    document.querySelector('#cedula').value = cedula;
    document.querySelector('#direccion').value = direccion;
    document.querySelector('#departamento').value = departamento;
    document.querySelector('#ciudad').value = ciudad;
    document.querySelector('#telefono').value = telefono;
    document.querySelector('#fk_factura').value = fk_factura;
    document.querySelector('#estado_envio').value = estado_envio;
    console.log(fecha_entrega);
    /* const fecha_formateada = fecha_entrega.split('T')[0]; */
    
    document.querySelector('#fecha').value = fecha_formateada;
}

const updateForm = document.querySelector('.updateFormu');
updateForm.addEventListener("submit", actualizarDatos);

async function actualizarDatos(e) {
    e.preventDefault();

    const id = document.querySelector('#updId').value;
    const nombre = document.querySelector('#nombre').value;
    const correo = document.querySelector('#correo').value;
    const cedula = document.querySelector('#cedula').value;
    const direccion = document.querySelector('#direccion').value;
    const departamento = document.querySelector('#departamento').value;
    const ciudad = document.querySelector('#ciudad').value;
    const telefono = document.querySelector('#telefono').value;
    const fecha_entrega = document.querySelector('#fecha_entrega').value;
    const fk_factura = document.querySelector('#fk_factura').value;
    const estado_envio = document.querySelector('#estado_envio').value;

    const datos = {
        nombre,
        cedula,
        correo,
        direccion,
        departamento,
        ciudad,
        telefono,
        fecha_entrega,
        fk_factura,
        estado_envio
    }

    await updateEnvio(id, datos);
    window.location.reload();
}