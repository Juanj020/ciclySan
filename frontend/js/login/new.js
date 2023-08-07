import { newUsuario } from "./Api.js";

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
    window.location.href = "../index.html"

}

function validacion(objeto){
    return !Object.values(objeto).every(element => element !== '');
}