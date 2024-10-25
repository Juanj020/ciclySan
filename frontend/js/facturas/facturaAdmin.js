import { getFacturas, newFactura, updateFactura, borrarFactura, getFacturaById} from "./Api.js";

document.addEventListener('DOMContentLoaded', () => {
    const userName = localStorage.getItem('userName');
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
    window.location.href = 'login/login.html';
});

const fac = document.querySelector('#tabla')
document.addEventListener('DOMContentLoaded', mostrarFacturasAdmin);
async function mostrarFacturasAdmin() {
    const fact = await getFacturas();
    fact.forEach(factura => {
        const { _id, fecha, productos, total, numero_factura, forma_pago, fk_usuario } = factura;
        /* let fechaa = fecha.substring(0, 10) */
        console.log(factura);
        
        let fechaa = fecha.substring(0,10);
        fac.innerHTML += `
        <tr>
            <th scope="row">${fechaa}</th>
            <td>${productos}</td>
            <td>${total}</td>
            <td>${forma_pago}</td>
            <td>${numero_factura}</td>
            <td><button class="btn btn-dark update" data-bs-toggle="modal" data-bs-target="#update" idUpd="${_id}">Actualizar</button>
            <button type="button" value="${_id}" id="${_id}" class="btn btn-danger delete">Eliminar</button> </td>
        </tr>
        `
    })
}

const formulario = document.querySelector('.formu');
formulario.addEventListener('submit', validacionFactura);

async function validacionFactura(e) {
    e.preventDefault();

    const nombre = document.querySelector('.nombre').value;
    const cedula = document.querySelector('.cedula').value;
    const correo = document.querySelector('.correo').value;
    const direccion = document.querySelector('.direccion').value;
    const departamento = document.querySelector('.departamento').value;
    const ciudad = document.querySelector('.ciudad').value;
    const telefono = document.querySelector('.telefono').value;
    const fecha_entrega = document.querySelector('.fecha_entrega').value;
    const fk_factura = document.querySelector('.fk_factura').value;
    const estado_envio = document.querySelector('.estado_envio').value;

    const envi = {
        nombre,
        cedula,
        correo,
        direccion,
        departamento,
        ciudad,
        telefono,
        fecha_entrega,
        fk_factura,
        estado_envio
    }

    if (validacion(envi)) {
        alert("Llene todos los campos")
        return
    }

    newFactura(envi);
    window.location.reload()
}

function validacion(objeto) {
    return !Object.values(objeto).every(element => element !== '');
}

const btnOption = document.querySelector('#tabla');
btnOption.addEventListener('click', borrar)

function borrar(e) {
    if (e.target.classList.contains('delete')) {
        const borrarr = e.target.getAttribute('id')
        console.log(borrarr);
        const confirmar = confirm("desea Eliminarlo?");
        if (confirmar) {
            borrarFactura(borrarr);
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

    const {_id, nombre, correo, cedula, direccion, departamento, ciudad, telefono, fecha_entrega, fk_factura, estado_envio} = await getFacturaById(idUpdate)

    document.querySelector('#updId').value = _id;
    document.querySelector('#nombre').value = nombre;
    document.querySelector('#correo').value = correo;
    document.querySelector('#cedula').value = cedula;
    document.querySelector('#direccion').value = direccion;
    document.querySelector('#departamento').value = departamento;
    document.querySelector('#ciudad').value = ciudad;
    document.querySelector('#telefono').value = telefono;
    document.querySelector('#fk_factura').value = fk_factura;
    document.querySelector('#estado_envio').value = estado_envio;
    console.log(fecha_entrega);
    /* const fecha_formateada = fecha_entrega.split('T')[0]; */
    
    document.querySelector('#fecha').value = fecha_formateada;
}

const updateForm = document.querySelector('.updateFormu');
updateForm.addEventListener("submit", actualizarDatos);

async function actualizarDatos(e) {
    e.preventDefault();

    const id = document.querySelector('#updId').value;
    const nombre = document.querySelector('#nombre').value;
    const correo = document.querySelector('#correo').value;
    const cedula = document.querySelector('#cedula').value;
    const direccion = document.querySelector('#direccion').value;
    const departamento = document.querySelector('#departamento').value;
    const ciudad = document.querySelector('#ciudad').value;
    const telefono = document.querySelector('#telefono').value;
    const fecha_entrega = document.querySelector('#fecha_entrega').value;
    const fk_factura = document.querySelector('#fk_factura').value;
    const estado_envio = document.querySelector('#estado_envio').value;

    const datos = {
        nombre,
        cedula,
        correo,
        direccion,
        departamento,
        ciudad,
        telefono,
        fecha_entrega,
        fk_factura,
        estado_envio
    }

    await updateFactura(id, datos);
    window.location.reload();
}