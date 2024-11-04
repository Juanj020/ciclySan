import { newUsuario } from "./Api.js";

const formulario = document.querySelector('.formu');
formulario.addEventListener('submit', validacionUsuario);

async function validacionUsuario(e){
    e.preventDefault();

    const nombre = document.querySelector('.nombre').value;
    const correo = document.querySelector('.correo').value;
    const password = document.querySelector('.password').value;
    const telefono = document.querySelector('.telefono').value;
    const rol = document.querySelector('.rol').value;

    if (telefono.length != 10 ){
        alert("El telefono debe tener mínimo 10 digitos")
        return
    }

    if (password.length < 8 ){
        alert("La contraseña debe tener minimo 8 caracteres")
        return
    }


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

    const resultado = await newUsuario(usu);
    
    if (resultado.success === false) {
        alert(resultado.msg);
    } else {
        alert("Usuario registrado correctamente");
        window.location.href = "login.html";
    }
}

function validacion(objeto){
    return !Object.values(objeto).every(element => element !== '');
}