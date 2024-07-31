import {newUsuario, getUsuario, borrarUsuario, updateUSuar, getOne} from "./Api.js";


const rut = document.querySelector('#tabla')
document.addEventListener('DOMContentLoaded', mostrarRutaAdmin);
async function mostrarRutaAdmin() {
    const noticias = await getUsuario();
    noticias.forEach(ruta => {
        const {_id, pais, departamento, ciudad, direccion, fecha_env, nomb_persona_entre, cedula, fk_factura} = ruta;
        let fechaa = fecha_env.substring(0, 10)
        rut.innerHTML += `
        <tr>
            <th scope="row">${pais}</th>
            <td>${departamento}</td>
            <td>${ciudad}</td>
            <td>${direccion}</td>
            <td>${fechaa}</td>
            <td>${nomb_persona_entre}</td>
            <td>${cedula}</td>
            <td>${fk_factura}</td>
            <td><button class="btn btn-dark update " data-bs-toggle="modal" data-bs-target="#update" idUpd="${_id}">Actualizar</button><button type="button" value="${_id}" id="${_id}"  class="btn btn-danger delete">Eliminar</button> </td>
        </tr>
        `
    })
}


const formulario = document.querySelector('.formu');
formulario.addEventListener('submit', validacionRuta);

function validacionRuta(e){
    e.preventDefault();

    const pais = document.querySelector('.pais').value;
    const departamento = document.querySelector('.departamento').value;
    const ciudad = document.querySelector('.ciudad').value;
    const direccion = document.querySelector('.direccion').value;
    const punto_llegada = document.querySelector('.punto_llegada').value;
    const punto_partida = document.querySelector('.punto_partida').value;
    const tiempo_aprox = document.querySelector('.tiempo_aprox').value;
    const altitud_min = document.querySelector('.altitud_min').value;
    const altitud_max = document.querySelector('.altitud_max').value;
    const recomendaciones = document.querySelector('.recomendaciones').value;
    const imagen = document.querySelector('.imagenn').value;

    const rut = {
        pais,
        departamento,
        ciudad,
        direccion,
        punto_llegada,
        punto_partida,
        tiempo_aprox,
        altitud_min,
        altitud_max,
        recomendaciones,
        imagen
    }

    if(validacion(rut)){
        alert("Llene todos los campos")
        return
    }

    newUsuario(rut);
    window.location.href = "rutas.html"

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

    const { _id, pais, departamento, ciudad, direccion, fecha_env, nomb_persona_entre, cedula, telefono, fk_factura } = await getOne(idUpdate)


    document.querySelector('#updId').value = _id;
    document.querySelector('#pais').value = pais;
    document.querySelector('#departamento').value = departamento;
    document.querySelector('#ciudad').value = ciudad;
    document.querySelector('#direccion').value = direccion;
    document.querySelector('#fecha_env').value = fecha_env;
    document.querySelector('#nomb_persona_entre').value = nomb_persona_entre;
    document.querySelector('#cedula').value = cedula;
    document.querySelector('#telefono').value = telefono;
    document.querySelector('#fk_factura').value = fk_factura;
}

updateModal.addEventListener("submit", actualizarDatos)

async function actualizarDatos() {
    const id = document.querySelector('#updId').value;
    const pais = document.querySelector('#pais').value;
    const departamento = document.querySelector('#departamento').value;
    const ciudad = document.querySelector('#ciudad').value;
    const direccion = document.querySelector('#direccion').value;
    const punto_partida = document.querySelector('#punto_partida').value;
    const punto_llegada = document.querySelector('#punto_llegada').value;
    const tiempo_aprox = document.querySelector('#tiempo_aprox').value;
    const altitud_min = document.querySelector('#altitud_min').value;
    const altitud_max = document.querySelector('#altitud_max').value;
    const recomendaciones = document.querySelector('#recomendaciones').value;
    const imagen = document.querySelector('#imagennn').value;

    const datos = {
        pais,
        departamento,
        ciudad,
        direccion,
        punto_partida,
        punto_llegada,
        tiempo_aprox,
        altitud_min,
        altitud_max,
        recomendaciones,
        imagen
    }

    await updateUSuar(id, datos);
}
