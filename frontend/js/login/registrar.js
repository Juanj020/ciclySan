import { newUsuario, getUsuario, borrarUsuario, updateUSuar, getOne } from "./Api.js";

const pro = document.querySelector('#tabla')
document.addEventListener('DOMContentLoaded', mostrarUsuarios);
async function mostrarUsuarios() {
    const usuarios = await getUsuario();
    usuarios.forEach(usuario => {
        const {_id, nombre, correo, password, telefono, rol} = usuario;
        pro.innerHTML += `
        <tr>
            <th scope="row">${nombre}</th>
            <td scope="col-6">${correo}</td>
            <td class="texto-limitado">${password}</td>
            <td>${telefono}</td>
            <td>${rol}</td>
            <td><button type="button" href="noticiasDet.html" class="btn btn-update update btn-dark" data-bs-toggle="modal" data-bs-target="#update" idUpd="${_id}">Actualizar</button><button type="button" value="${_id}" id="${_id}"  class="btn btn-danger delete">Eliminar</button> </td>
        </tr>
        `
    })
}

const formulario = document.querySelector('.formu');
formulario.addEventListener('submit', validacionUsuario);

function validacionUsuario(e){
    e.preventDefault();

    const nombre = document.querySelector('.nombre').value;
    const correo = document.querySelector('.correo').value;
    const password = document.querySelector('.password').value;
    const telefono = document.querySelector('.telefono').value;
    const rol = document.querySelector('.rol').value;

    const usu = {
        nombre,
        correo,
        password,
        telefono,
        rol
    }

    if(validacion(usu)){
        alert("Llene todos los campos")
        return
    }

    newUsuario(usu);
    window.location.reload()

}

function validacion(objeto){
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
            borrarUsuario(borrarr);
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

const updateModal = document.querySelector('#update');
async function launchModalUpt(e) {
    const idUpdate = e.target.getAttribute("idUpd");

    const { _id,  nombre, correo, password, telefono, rol} = await getOne(idUpdate)


    document.querySelector('#updId').value = _id;
    document.querySelector('#nombre').value = nombre;
    document.querySelector('#correo').value = correo;
    document.querySelector('#password').value = password;
    document.querySelector('#telefono').value = telefono;
    document.querySelector('#rol').value = rol;
}

updateModal.addEventListener("submit", actualizarDatos)
updateModal.addEventListener("submit", actualizarDatos)

async function actualizarDatos() {
    const id = document.querySelector('#updId').value;
    const nombre = document.querySelector('#nombre').value;
    const correo = document.querySelector('#correo').value;
    const password = document.querySelector('#password').value;
    const telefono = document.querySelector('#telefono').value;
    const rol = document.querySelector('#rol').value;

    const datos = {nombre,correo, password, telefono, rol}

    await updateUSuar(id, datos);
}