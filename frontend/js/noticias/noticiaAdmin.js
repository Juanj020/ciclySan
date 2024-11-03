import { getNoticia, newNoticia, updateNoticia, borrarNoticia, getOne} from "./Api.js";

document.addEventListener('DOMContentLoaded', () => {
    const userName = localStorage.getItem('userName');
    if (!userName) {
        window.location.href = '../login/login.html';
    }
    if (userName) {
        document.getElementById('welcomeMessage').textContent = `Bienvenido: ${userName}`;
    } else {
        window.location.href = '../login/login.html';
    }
});

document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    window.location.href = '../login/login.html';
});

const noti = document.querySelector('#tabla')
document.addEventListener('DOMContentLoaded', mostrarNoticiasAdmin);
async function mostrarNoticiasAdmin() {
    const noticias = await getNoticia();
    noticias.forEach(ruta => {
        const { _id, titulo, descripcion, imagen, resumen, fecha, autor } = ruta;
        let fechaa = fecha.substring(0, 10)

        const nombreAutor = autor && autor.nombre ? autor.nombre : 'Desconocido';

        noti.innerHTML += `
        <tr>
            <th scope="row">${titulo}</th>
            <td>${descripcion}</td>
            <td>${fechaa}</td>
            <td>${nombreAutor}</td>
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

function cargarUsuarios() {
    fetch('http://localhost:4005/api/usuarios')
        .then(response => response.json())
        .then(data => {
            const usuarioSelect = document.getElementById('usuarioSelect');
            data.forEach(usuario => {
                const option = document.createElement('option');
                option.value = usuario._id; 
                option.textContent = usuario.nombre;
                usuarioSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error al cargar los usuarios:', error));
}

document.addEventListener('DOMContentLoaded', cargarUsuarios);

async function cargarUsuarioss() {
    try {
        const response = await fetch('http://localhost:4005/api/usuarios'); 
        const usuarios = await response.json();
        
        const autorSelect = document.querySelector('.autorSelect');
        autorSelect.innerHTML = '<option value="">Selecciona un autor</option>';

        usuarios.forEach(usuario => {
            const option = document.createElement('option');
            option.value = usuario._id; 
            option.textContent = usuario.nombre;
            autorSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar usuarios:', error);
    }
}

const formulario = document.querySelector('.formu');
formulario.addEventListener('submit', validacionNoticia);

async function validacionNoticia(e) {
    e.preventDefault();

    const titulo = document.querySelector('.tituloo').value;
    const descripcion = document.querySelector('.descripcion').value;
    const imagenn = document.querySelector('.imagen').files[0];
    const resumen = document.querySelector('.resumen').value;
    const fecha = document.querySelector('.fecha').value;
    const autor = document.querySelector('#usuarioSelect').value;
    const estado = document.querySelector('.estado').value;

    let imagenBase64 = '';

    if (imagenn) {
        try {
            imagenBase64 = await getBase64(imagenn);
        } catch (error) {
            console.log('Error al convertir la imagen a base64:', error);
            alert('Error al procesar la imagen');
            return;
        }
    }

    const not = {
        titulo,
        descripcion,
        imagen : imagenBase64,
        resumen,
        fecha,
        estado,
        autor
    }

    if (validacion(not)) {
        alert("Llene todos los campos")
        return
    }

    newNoticia(not);
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

    const {_id, titulo, descripcion, autor, imagen, fecha, resumen, estado } = await getOne(idUpdate)

    document.querySelector('#updId').value = _id;
    document.querySelector('#tituloo').value = titulo;
    document.querySelector('#descripcion').value = descripcion;
    const fecha_formateada = fecha.split('T')[0];
    document.querySelector('#fecha').value = fecha_formateada;
    document.querySelector('#resumen').value = resumen;
    document.querySelector('.autorSelect').value = autor;
    document.querySelector('#estado').value = estado;

    const imagenPreview = document.querySelector('#imagenPreview');
    if (imagen) {
        imagenPreview.src = imagen; 
    } else {
        imagenPreview.src = ''; 
    }

    await cargarUsuarioss();

    const autorSelect = document.querySelector('.autorSelect');
    autorSelect.value = autor;

}

const updateForm = document.querySelector('.updateFormu'); 
updateForm.addEventListener("submit", actualizarDatos);

async function actualizarDatos(e) {
    e.preventDefault();

    const id = document.querySelector('#updId').value;
    const titulo = document.querySelector('#tituloo').value;
    const descripcion = document.querySelector('#descripcion').value;
    const fecha = document.querySelector('#fecha').value;
    const autor = document.querySelector('.autorSelect').value;
    const imagenInput = document.querySelector('#imagen').files[0];
    const resumen = document.querySelector('#resumen').value;
    const estado = document.querySelector('#estado').value;

    let imagenBase64 = '';

    if (imagenInput) {
        try {
            imagenBase64 = await getBase64(imagenInput); 
        } catch (error) {
            console.log('Error al convertir la imagen a base64:', error);
            alert('Error al procesar la imagen');
            return;
        }
    }else {
        const imagenPreview = document.querySelector('#imagenPreview').src;
        imagenBase64 = imagenPreview; 
    }

    const datos = {
        titulo,
        descripcion,
        imagen : imagenBase64,
        resumen,
        fecha,
        autor,
        estado
    }

    await updateNoticia(id, datos);
    window.location.reload();
}