import { getNoticia, newNoticia, borrarNoticia} from "./Api.js";


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
            <td>${fecha}</td>
            <td><a type="button" href="noticiasDet.html?idd=${_id}">Actualizar</a><button type="button" href="noticiasDet.html" class="btn btn-light">Actualizar</button><button type="button" value="${_id}" id="${_id}"  class="btn btn-danger delete">Eliminar</button> </td>
        </tr>
        `
    })
}


const formulario = document.querySelector('.formu');
formulario.addEventListener('submit', validacionNoticia);

function validacionNoticia(e) {
    e.preventDefault();

    const titulo = document.querySelector('.tituloo').value;
    const descripcion = document.querySelector('.descripcion').value;
    const imagen = document.querySelector('.imagen').value;
    const resumen = document.querySelector('.resumen').value;
    const fecha = document.querySelector('.fecha').value;
    const autor = document.querySelector('.autor').value;

    const usu = {
        titulo,
        descripcion,
        imagen,
        resumen,
        fecha,
        autor
    }

    if (validacion(usu)) {
        alert("Llene todos los campos")
        return
    }

    newNoticia(usu);
    window.location.href = "noticia.html"

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
/* 
let params = new URLSearchParams(window.location.search);
let valor = params.get('idd');
console.log(valor);

console.log(getOneID); */

