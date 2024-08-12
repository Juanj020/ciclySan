import { newFactura, getFacturas, borrarFactura, getFacturaById } from "./Api.js";

const tablaFacturas = document.querySelector('#tabla');

document.addEventListener('DOMContentLoaded', mostrarFacturas);

async function mostrarFacturas() {
    const facturas = await getFacturas();
    facturas.forEach(factura => {
        const {_id, productos, fecha_fac, total, forma_pago} = factura;
        let fechaa = fecha_fac.substring(0, 10);

        if (Array.isArray(productos) && productos.length > 0) {
            const primerProducto = productos[0];
            const nombresProductos = Object.keys(primerProducto);
            if (nombresProductos.length > 0) {
                nombresProductos.forEach(nombre => {
                    tablaFacturas.innerHTML += `
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
                console.error(`No se encontraron nombres de productos en la factura con ID ${_id}`);
            }
        } else {
            console.error(`El campo 'productos' no es un array o está vacío para la factura con ID ${_id}`);
        }
    });
}

const formulario = document.querySelector('.formu');
formulario.addEventListener('submit', validarFactura);

function validarFactura(e) {
    e.preventDefault();

    const productos = document.querySelector('.productos').value;
    const fecha_fac = document.querySelector('.fecha_fac').value;
    const total = document.querySelector('.total').value;
    const forma_pago = document.querySelector('.forma_pago').value;

    const factura = {
        productos,
        fecha_fac,
        total,
        forma_pago
    }

    if (!Object.values(factura).every(element => element !== '')) {
        alert("Llene todos los campos");
        return;
    }

    newFactura(factura);
    window.location.href = "facturas.html";
}

tablaFacturas.addEventListener('click', borrarFacturaHandler);

function borrarFacturaHandler(e) {
    if (e.target.classList.contains('delete')) {
        const facturaId = e.target.getAttribute('id');
        const confirmar = confirm("¿Desea eliminar esta factura?");
        if (confirmar) {
            borrarFactura(facturaId);
        }
    }
}

tablaFacturas.addEventListener('click', gestionarActualizarFactura);

function gestionarActualizarFactura(e) {
    if (e.target.classList.contains("update")) {
        mostrarModalActualizar(e);
    }
}

async function mostrarModalActualizar(e) {
    const idFactura = e.target.getAttribute("idUpd");

    const { _id, productos, fecha_fac, total, forma_pago } = await getFacturaById(idFactura);

    document.querySelector('#updId').value = _id;
    document.querySelector('#productos').value = productos;
    document.querySelector('#fecha_fac').value = fecha_fac;
    document.querySelector('#total').value = total;
    document.querySelector('#forma_pago').value = forma_pago;
}
