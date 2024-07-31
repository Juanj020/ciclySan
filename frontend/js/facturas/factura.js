import {newUsuario, getUsuario, borrarUsuario, updateUSuar, getOne} from "./Api.js";


const rut = document.querySelector('#tabla')
document.addEventListener('DOMContentLoaded', mostrarRutaAdmin);
async function mostrarRutaAdmin() {
    const rutas = await getUsuario();
rutas.forEach(ruta => {
    const {_id, productos, fecha_fac, total, forma_pago} = ruta;
    let fechaa = fecha_fac.substring(0, 10);

    if (Array.isArray(productos) && productos.length > 0) {
        const primerProducto = productos[0];

        const nombresProductos = Object.keys(primerProducto);
        if (nombresProductos.length > 0) {
            nombresProductos.forEach(nombre => {
                rut.innerHTML += `
                    <tr>
                        <th>${_id}</th>
                        <th>${nombre}</th>
                        <td>${fechaa}</td>
                        <td>${total}</td>
                        <td>${forma_pago}</td>
                        <td>
                            <button class="btn btn-dark update" data-bs-toggle="modal" data-bs-target="#update" idUpd="${_id}">Actualizar</button>
                            <button type="button" value="${_id}" id="${_id}" class="btn btn-danger delete">Eliminar</button>
                        </td>
                    </tr>
                `;
            });
        } else {
            console.error(`No se encontraron nombres de productos en la ruta con ID ${_id}`);
        }
    } else {
        console.error(`El campo 'productos' no es un array o está vacío para la ruta con ID ${_id}`);
    }
});


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

