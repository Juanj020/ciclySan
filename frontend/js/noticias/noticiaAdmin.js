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
    localStorage.removeItem('userId');
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
formulario.addEventListener('submit', validacionNoticia);

const autorLocal = localStorage.getItem('userId');

async function validacionNoticia(e) {
    e.preventDefault();

    const titulo = document.querySelector('.tituloo').value;
    const descripcion = document.querySelector('.descripcion').value;
    const imagenn = document.querySelector('.imagen').files[0];
    const resumen = document.querySelector('.resumen').value;
    const fecha = document.querySelector('.fecha').value;
    const estado = document.querySelector('.estado').value;

    let imagenBase64 = ''; // Inicializa la variable imagen

    // Si hay un archivo de imagen, convertirlo a Base64
    if (imagenn) {
        try {
            imagenBase64 = await getBase64(imagenn); // Convierte la imagen a Base64
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
        estado,
        autor: autorLocal
    }

    if (validacion(usu)) {
        alert("Llene todos los campos")
        return
    }

    newNoticia(usu);
    window.location.reload();

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

const upd = document.querySelector('#tabla')
upd.addEventListener('click', oneOrAnother)

function oneOrAnother(e) {
    if (e.target.classList.contains("update")) {
        launchModalUpt(e);
    }
}

async function launchModalUpt(e) {
    const idUpdate = e.target.getAttribute("idUpd");

    const {_id, titulo, descripcion, imagen, fecha, estado } = await getOne(idUpdate)

    document.querySelector('#updId').value = _id;
    document.querySelector('#tituloo').value = titulo;
    document.querySelector('#descripcion').value = descripcion;
    document.querySelector('#fecha').value = fecha;
    document.querySelector('#estado').value = estado;

    const imagenPreview = document.querySelector('#imagenPreview');
    if (imagen) {
        imagenPreview.src = imagen; // Asumiendo que 'imagen' es una URL válida o una cadena Base64
    } else {
        imagenPreview.src = ''; // O una imagen por defecto
    }
}

const updateForm = document.querySelector('.updateFormu'); // Asegúrate de que el formulario tenga este ID
updateForm.addEventListener("submit", actualizarDatos);

async function actualizarDatos(e) {
    e.preventDefault();

    const id = document.querySelector('#updId').value;
    


    await updateRuta(id, datos);
    window.location.reload();
}