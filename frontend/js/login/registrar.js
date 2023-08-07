import { newUsuario, getUsuario, borrarUsuario } from "./Api.js";

const pro = document.querySelector('#tabla')
document.addEventListener('DOMContentLoaded', mostrarUsuarios);
async function mostrarUsuarios() {
    const usuarios = await getUsuario();
    usuarios.forEach(usuario => {
        const {_id, nombre, correo, password, telefono, rol} = usuario;
        pro.innerHTML += `
        <tr>
            <th scope="row">${nombre}</th>
            <td>${correo}</td>
            <td>${password}</td>
            <td>${telefono}</td>
            <td>${rol}</td>
            <td><a type="button" href="noticiasDet.html?idd=${_id}">Actualizar</a><button type="button" href="noticiasDet.html" class="btn btn-light">Actualizar</button><button type="button" value="${_id}" id="${_id}"  class="btn btn-danger delete">Eliminar</button> </td>
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