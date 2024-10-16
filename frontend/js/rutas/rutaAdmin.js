import { getRuta, newRuta, borrarRuta, getOne, updateRuta} from "./Api.js";

document.addEventListener('DOMContentLoaded', () => {
    const userName = localStorage.getItem('userName');
    if (!userName) {
        window.location.href = '../login/login.html';
    }
    if (userName) {
        document.getElementById('welcomeMessage').textContent = `Bienvenido: ${userName}`;
    } else {
        window.location.href = 'login/login.html';
    }
});

document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    window.location.href = 'login/login.html'; // Redirige al login después de cerrar sesión
});

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

const rut = document.querySelector('#tabla')
document.addEventListener('DOMContentLoaded', mostrarRutaAdmin);

async function mostrarRutaAdmin() {
    const rutas = await getRuta();
    rutas.forEach(ruta => {
        const {_id, nombreRut, descripcion, dificultad, kilometros, punto_partida, punto_llegada, tiempo_aprox, altitud_min, altitud_max, recomendaciones, imagen} = ruta;
        rut.innerHTML += `
        <tr>
            <th scope="row">${nombreRut}</th>
            <td class="descrip">${descripcion}</td>
            <td>${dificultad}</td>
            <td>${kilometros} Km</td>
            <td>
                <button class="btn btn-dark update" data-bs-toggle="modal" data-bs-target="#update" idUpd="${_id}">Actualizar</button>
                <button type="button" value="${_id}" id="${_id}" class="btn btn-danger delete">Eliminar</button>
            </td>
        </tr>
        `;
    })
}

const formulario = document.querySelector('.formu');
formulario.addEventListener('submit', manejoEnvioRuta);

async function manejoEnvioRuta(e) {
    e.preventDefault();
    console.log('Formulario enviado');

    const nombreRut = document.querySelector('.nombreRut').value;
    const descripcion = document.querySelector('.descripcion').value;
    const dificultad = document.querySelector('.dificultad').value;
    const kilometros = document.querySelector('.kilometros').value;
    const punto_partida = document.querySelector('.punto_partida').value;
    const punto_llegada = document.querySelector('.punto_llegada').value;
    const tiempo_aprox = document.querySelector('.tiempo_aprox').value;
    const altitud_min = document.querySelector('.altitud_min').value;
    const altitud_max = document.querySelector('.altitud_max').value;
    const recomendaciones = document.querySelector('.recomendaciones').value;
    const imagenInput = document.querySelector('.imagenn').files[0];
    const link = document.querySelector('.link').value;

    let imagenBase64 = ''; // Inicializa la variable imagen

    // Si hay un archivo de imagen, convertirlo a Base64
    if (imagenInput) {
        try {
            imagenBase64 = await getBase64(imagenInput); // Convierte la imagen a Base64
        } catch (error) {
            console.log('Error al convertir la imagen a base64:', error);
            alert('Error al procesar la imagen');
            return;
        }
    }

    const rut = {
        nombreRut,
        descripcion,
        dificultad,
        kilometros,
        tiempo_aprox,
        punto_partida,
        punto_llegada,
        altitud_min,
        altitud_max,
        recomendaciones,
        imagen : imagenBase64,
        link
    };

    // Validar que todos los campos estén completos
    if (validacion(rut)) {
        alert("Por favor, complete todos los campos requeridos.");
        return;
    }

    try {
        const respuesta = await newRuta(rut); // Llama a newRuta para enviar la información
        console.log('Respuesta del servidor:', respuesta);
        window.location.href = "rutas.html"; // Redirige después de enviar
    } catch (error) {
        console.error('Error al enviar la ruta:', error);
        alert('Hubo un problema al enviar la ruta. Por favor, intenta nuevamente.');
    }
}

function validacion(objeto){
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
            borrarRuta(borrarr);
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

    const { _id,  nombreRut, descripcion, dificultad, kilometros, punto_partida, punto_llegada, tiempo_aprox, altitud_min, altitud_max, recomendaciones, estado, imagen, link } = await getOne(idUpdate)

    document.querySelector('#updId').value = _id;
    document.querySelector('#nombreRut').value = nombreRut;
    document.querySelector('#descripcion').value = descripcion;
    document.querySelector('#dificultad').value = dificultad;
    document.querySelector('#kilometros').value = kilometros;
    document.querySelector('#punto_partida').value = punto_partida;
    document.querySelector('#punto_llegada').value = punto_llegada;
    document.querySelector('#tiempo_aprox').value = tiempo_aprox;
    document.querySelector('#altitud_min').value = altitud_min;
    document.querySelector('#altitud_max').value = altitud_max;
    document.querySelector('#recomendaciones').value = recomendaciones;
    /* document.querySelector('#imagennn').value = imagen; */
    document.querySelector('#estado').value = estado;
    document.querySelector('#link').value = link;

    // Mostrar la imagen existente en la vista previa
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
    const nombreRut = document.querySelector('#nombreRut').value;
    const descripcion = document.querySelector('#descripcion').value;
    const dificultad = document.querySelector('#dificultad').value;
    const kilometros = document.querySelector('#kilometros').value;
    const tiempo_aprox = document.querySelector('#tiempo_aprox').value;
    const altitud_min = document.querySelector('#altitud_min').value;
    const altitud_max = document.querySelector('#altitud_max').value;
    const recomendaciones = document.querySelector('#recomendaciones').value;
    const link = document.querySelector('#link').value;
    const estado = document.querySelector('#estado').value;
    const punto_partida = document.querySelector('#punto_partida').value;
    const punto_llegada = document.querySelector('#punto_llegada').value;
    const imagenInput = document.querySelector('#imagennn').files[0];
    
    let imagenBase64 = '';

    // Si hay un archivo de imagen, convertirlo a Base64
    if (imagenInput) {
        try {
            imagenBase64 = await getBase64(imagenInput); // Convierte la imagen a Base64
        } catch (error) {
            console.log('Error al convertir la imagen a base64:', error);
            alert('Error al procesar la imagen');
            return;
        }
    }else {
        // Si no se selecciona una nueva imagen, mantener la existente
        const imagenPreview = document.querySelector('#imagenPreview').src;
        imagenBase64 = imagenPreview; // Asumiendo que imagenPreview.src contiene la imagen en Base64 o una URL válida
    }

    const datos = {
        nombreRut,
        descripcion,
        dificultad,
        kilometros,
        tiempo_aprox,
        punto_partida,
        punto_llegada,
        altitud_min,
        altitud_max,
        recomendaciones,
        imagen : imagenBase64,
        estado,
        link
    }


    await updateRuta(id, datos);
    window.location.reload(); // Recarga la página después de actualizar
}
