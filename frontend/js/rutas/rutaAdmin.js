import { getRuta, newRuta, borrarRuta, getOne, updateRuta} from "./Api.js";

document.addEventListener('DOMContentLoaded', () => {
    const userName = localStorage.getItem('userName');
    if (!userName) {
        window.location.href = '../login/login.html';
    }
    if (userName) {
        document.getElementById('welcomeMessage').textContent = `Bienvenido: ${userName}`;
    } else {
        // Si no hay nombre de usuario, podrías redirigir al login o mostrar un mensaje
        window.location.href = 'login/login.html';
    }
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

    /* console.log('Datos obtenidos del formulario:', {
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
        imagen,
        link
    }); */

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

const updateModal = document.querySelector('#btnUpdate');
async function launchModalUpt(e) {
    const idUpdate = e.target.getAttribute("idUpd");

    const { _id,  nombreRut, descripcion, dificultad, kilometros, punto_partida, punto_llegada, tiempo_aprox, altitud_min, altitud_max, recomendaciones, imagen, link } = await getOne(idUpdate)


    document.querySelector('#updId').value = _id;
    document.querySelector('#nombreRut').value = nombreRut;
    document.querySelector('#descripcion').value = descripcion;
    document.querySelector('#dificultad').value = dificultad;
    document.querySelector('#kilometros').value = kilometros;
    document.querySelector('#tiempo_aprox').value = tiempo_aprox;
    document.querySelector('#altitud_min').value = altitud_min;
    document.querySelector('#altitud_max').value = altitud_max;
    document.querySelector('#imagennn').value = imagen;
    document.querySelector('#link').value = link;
}

updateModal.addEventListener("click", actualizarDatos);

const updateForm = document.querySelector('#updateFormu'); // Asegúrate de que el formulario tenga este ID
updateForm.addEventListener("submit", actualizarDatos);

async function actualizarDatos(e) {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario

    const id = document.querySelector('#updId').value;
    const nombreRut = document.querySelector('#nombreRut').value;
    const descripcion = document.querySelector('#descripcion').value;
    const dificultad = document.querySelector('#dificultad').value;
    const kilometros = document.querySelector('#kilometros').value;
    const tiempo_aprox = document.querySelector('#tiempo_aprox').value;
    const altitud_min = document.querySelector('#altitud_min').value;
    const altitud_max = document.querySelector('#altitud_max').value;
    const recomendaciones = document.querySelector('.recomendaciones').value;
    const imagenFile = document.querySelector('#imagennn');
    const link = document.querySelector('#link').value;
    const estado = document.querySelector('#estado').value;
    const punto_partida = document.querySelector('#punto_partida').value;
    const punto_llegada = document.querySelector('#punto_llegada').value;

    let imagen = '';

    /* if (imagenFile) {
        try {
            imagen = await getBase64(imagenFile);
        } catch (error) {
            console.log('Error al convertir la imagen a base64:', error);
            alert('Error al procesar la imagen');
            return;
        }
    } */

    const datos = {
        nombreRut,
        descripcion,
        dificultad,
        kilometros,
        tiempo_aprox,
        altitud_min,
        altitud_max,
        recomendaciones,
        imagen,
        link,
        estado,
        punto_partida,
        punto_llegada
    }

    await updateRuta(id, datos);
    window.location.reload(); // Recarga la página después de actualizar
}
