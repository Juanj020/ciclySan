import { getNoticia, newNoticia, getNoticiaVisibles } from "./Api.js";

const not = document.querySelector('.contenido')
document.addEventListener('DOMContentLoaded', mostrarNoticias);

async function mostrarNoticias(){
    const noticias = await getNoticiaVisibles();
    noticias.forEach(ruta=>{
        const {_id, titulo, descripcion, imagen, resumen, fecha, autor} = ruta;
        let fechaa = fecha.substring(0, 10)

        const nombreAutor = autor && autor.nombre ? autor.nombre : 'Desconocido';

        not.innerHTML += `
        <div class="cont-carts">
            <img width="250px" src="${imagen}" alt="">
            <div class="cont-carts-derecha">
                <h1>${titulo}</h1>
                <p class="descrip" id="descripcion_${_id}">${descripcion}</p>
                <span class="ver-mas" id="ver-mas_${_id}">Ver más...</span>
                <p>Autor: ${nombreAutor}</p>
                <p>${fechaa}</p>
            </div>
        </div>
        `;

        setTimeout(() => {
            const botonVerMas = document.getElementById(`ver-mas_${_id}`);
            botonVerMas.addEventListener('click', () => mostrarMas(_id));
        }, 0);
    })
}

function mostrarMas(id) {
    const descripcionElem = document.getElementById(`descripcion_${id}`);
    descripcionElem.style.display = 'block';
    descripcionElem.style.maxHeight = 'none';
    descripcionElem.style.webkitLineClamp = 'unset'; // Quitar el límite de líneas
    document.getElementById(`ver-mas_${id}`).style.display = 'none';
}

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        if (!file) resolve(null);
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

const hoy = new Date().toISOString().split('T')[0];
document.querySelector('.fecha').setAttribute('max', hoy);

const formulario = document.querySelector('.formu');
formulario.addEventListener('submit', validacionNoticia);

async function validacionNoticia(e){
    e.preventDefault();

    const titulo = document.querySelector('.tituloo').value;
    const descripcion = document.querySelector('.descripcion').value;
    const imagen = document.querySelector('.imagen').files[0];
    const resumen = document.querySelector('.resumen').value;
    const fecha = document.querySelector('.fecha').value;
    const autor = localStorage.getItem('userId');

    let imagenBase64 = ''; 

    if (imagen) {
        try {
            imagenBase64 = await getBase64(imagen);
        } catch (error) {
            console.log('Error al convertir la imagen a base64:', error);
            alert('Error al procesar la imagen');
            return;
        }
    }

    const usu = {
        titulo,
        descripcion,
        imagen : imagenBase64,
        resumen,
        fecha,
        autor
    }

    if(validacion(usu)){
        alert("Llene todos los campos")
        return
    }

    newNoticia(usu);
    alert("Tu noticia será evaluada y pronto estará disponible en la página")
    window.location.reload();
}

function validacion(objeto){
    return !Object.values(objeto).every(element => element !== '');
}

document.addEventListener('DOMContentLoaded', () => {
    const userInfo = document.getElementById('user-info');
    const userName = localStorage.getItem('userName');
    const token = localStorage.getItem('token');
    const boton = document.querySelector('.boton');

    if (token && userName) {
        userInfo.innerHTML = `
            <span>Bienvenido, ${userName}</span>
            <a href="#" id="logout"><img width="50px" src="../img/puerta-abierta.png" alt="Cerrar sesión"></a> 
        `;

        boton.style.marginLeft = '200px';
        boton.classList.remove('hidden');

        document.getElementById('logout').addEventListener('click', () => {
            localStorage.removeItem('token');
            localStorage.removeItem('userName');
            localStorage.removeItem('userId');
            window.location.reload();
        });
    } else {
        userInfo.innerHTML = '<a href="login/login.html">Iniciar sesión</a>';
    }
});