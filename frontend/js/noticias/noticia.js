import { getNoticia, newNoticia } from "./Api.js";

const not = document.querySelector('.contenido')
document.addEventListener('DOMContentLoaded', mostrarNoticias);

async function mostrarNoticias(){
    const noticias = await getNoticia();
    noticias.forEach(ruta=>{
        const {_id, titulo, descripcion, imagen, resumen, fecha, autor} = ruta;
        let fechaa = fecha.substring(0, 10)
        not.innerHTML += `
        <div class="cont-carts">
            <img width="250px" src="${imagen}" alt="">
            <div class="cont-carts-derecha">
                <h1>${titulo}</h1>
                <p>${descripcion}</p>
                <p>Autor: ${autor}</p>
                <p>${fechaa}</p>
            </div>
        </div>
        `
    })
}

const noti = document.querySelector('#tabla')
document.addEventListener('DOMContentLoaded', mostrarNoticiasAdmin);
async function mostrarNoticiasAdmin(){
    const noticias = await getNoticia();
    noticias.forEach(ruta=>{
        const {_id, titulo, descripcion, imagen, resumen, fecha, autor} = ruta;
        let fechaa = fecha.substring(0, 10)
        noti.innerHTML += `
        <tr>
            <th scope="row">${titulo}</th>
            <td>${descripcion}</td>
            <td>${fecha}</td>
            <td><button type="button" class="btn btn-light">Actualizar</button><button type="button" class="btn btn-danger">Eliminar</button> </td>
        </tr>
        `
    })
}



const formulario = document.querySelector('.formu');
formulario.addEventListener('submit', validacionNoticia);

function validacionNoticia(e){
    e.preventDefault();

    const titulo = document.querySelector('.tituloo').value;
    const descripcion = document.querySelector('.descripcion').value;
    const imagen = document.querySelector('.imagen').value;
    const resumen = document.querySelector('.resumen').value;
    const fecha = document.querySelector('.fecha').value;
    const autor = document.querySelector('.autor').value;;

    const usu = {
        titulo,
        descripcion,
        imagen,
        resumen,
        fecha,
        autor
    }

    if(validacion(usu)){
        alert("Llene todos los campos")
        return
    }

    newNoticia(usu);
    window.location.href = "noticia.html"

}

function validacion(objeto){
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