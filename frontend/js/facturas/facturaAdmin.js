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
        const productos_count = productos.length;
        const forma_pago_tipo = forma_pago.tipo_tarjeta;
        let fechaa = fecha.substring(0,10);
        fac.innerHTML += `
        <tr>
            <td>${fechaa}</td>
            <td>${productos_count}</td>
            <td>${total}</td>
            <td>${forma_pago_tipo}</td>
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

const updateForm = document.querySelector('.updateFormu');
updateForm.addEventListener("submit", actualizarDatos);

// Función para cargar datos en el formulario de actualización
async function launchModalUpt(e) {
    const idUpdate = e.target.getAttribute("idUpd");
    const { _id, fecha, productos, total, numero_factura, forma_pago } = await getFacturaById(idUpdate);

    document.querySelector('#updId').value = _id;
    document.querySelector('#fecha').value = fecha.split('T')[0];
    document.querySelector('#numero_factura').value = numero_factura;
    document.querySelector('#total').value = total;
    document.querySelector('#tipo_tarjeta').value = forma_pago.tipo_tarjeta || ''; 
    document.querySelector('#numero_tarjeta').value = forma_pago.numero_tarjeta || '';
    document.querySelector('#fecha_expiracion').value = forma_pago.fecha_expiracion || '';
    document.querySelector('#cvv').value = forma_pago.cvv || '';
    document.querySelector('#nombre_titular').value = forma_pago.nombre_titular || '';
    // Productos (solo se asigna el primer producto en el select como ejemplo)
    document.querySelector('#productos').value = productos.length ? productos[0].id : '';
}

async function actualizarDatos(e) {
    e.preventDefault();

    const id = document.querySelector('#updId').value;
    const numero_factura = document.querySelector('#numero_factura').value;
    const fecha = document.querySelector('#fecha').value;
    const productos = [{
        id: document.querySelector('#productos').value,
        cantidad: 1
    }];
    const total = document.querySelector('#total').value;
    const forma_pago = {
        tipo_tarjeta: document.querySelector('#tipo_tarjeta').value,
        numero_tarjeta: document.querySelector('#numero_tarjeta').value,
        fecha_expiracion: document.querySelector('#fecha_expiracion').value,
        cvv: document.querySelector('#cvv').value,
        nombre_titular: document.querySelector('#nombre_titular').value
    };

    const datos = {
        numero_factura,
        fecha,
        productos,
        total,
        forma_pago
    };

    await updateFactura(id, datos);
    window.location.reload();
}