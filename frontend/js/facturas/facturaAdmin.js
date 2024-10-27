import { getFacturas, newFactura, updateFactura, borrarFactura, getFacturaById} from "./Api.js";
import { getProductoTotal} from "../productos/Api.js"

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

document.addEventListener('DOMContentLoaded', async () => {
    await cargarProductos();
    document.querySelector('.numero_factura').value = generarNumeroFactura();

    const tipoPagoSelect = document.querySelector('.tipo_pago');
    tipoPagoSelect.addEventListener('change', (e) => {
        document.querySelector('#camposTarjeta').style.display = e.target.value === 'Visa' || 'MasterCard' ? 'block' : 'none';
    });
});

function generarNumeroFactura() {
    return Math.floor(Math.random() * 9000000) + 1000000; 
}

const productosSeleccionados = [];

async function cargarProductos() {
    try {
        const response = await fetch('http://localhost:4005/api/productos/total');
        const productos = await response.json();
        const selectProductos = document.querySelector('#selectProductos');

        productos.forEach(producto => {
            const option = document.createElement('option');
            option.value = JSON.stringify({ id: producto._id, precio: producto.precio, nombre: producto.nombrePro });
            option.textContent = `${producto.nombrePro} - ${producto.precio}`;
            selectProductos.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar productos:', error);
    }
}

function agregarProducto() {
    const productoSeleccionado = JSON.parse(document.querySelector('#selectProductos').value);
    const cantidad = parseInt(document.querySelector('.cantidadProducto').value);

    if (!productoSeleccionado || isNaN(cantidad) || cantidad <= 0) {
        alert("Selecciona un producto y una cantidad válida");
        return;
    }

    productosSeleccionados.push({ ...productoSeleccionado, cantidad });
    actualizarTotal();
    mostrarProductosSeleccionados();
}

function actualizarTotal() {
    const total = productosSeleccionados.reduce((sum, prod) => sum + prod.precio * prod.cantidad, 0);
    document.querySelector('.total').value = total;
}

function mostrarProductosSeleccionados() {
    const listaProductos = document.querySelector('#listaProductos');
    listaProductos.innerHTML = '';

    productosSeleccionados.forEach(producto => {
        const item = document.createElement('li');
        item.textContent = `${producto.cantidad} x ${producto.nombre} - ${producto.precio}`;
        listaProductos.appendChild(item);
    });
}

const formulario = document.querySelector(".formu")
formulario.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fecha = document.querySelector('.fecha').value;
    const numero_factura = document.querySelector('.numero_factura').value;
    const total = document.querySelector('.total').value;
    const tipo_tarjeta = document.querySelector('.tipo_pago').value;
    const fk_usuario = localStorage.getItem('userId');

    const forma_pago = {
        tipo_tarjeta,
        numero_tarjeta: document.querySelector('.numero_tarjeta').value,
        fecha_expiracion: document.querySelector('.fecha_expiracion').value,
        cvv: document.querySelector('.cvv').value,
        nombre_titular: document.querySelector('.nombre_titular').value
    };

    if (!fecha || !total || total <= 0 || !Array.isArray(productosSeleccionados) || productosSeleccionados.length === 0) {
        alert("Por favor, completa todos los campos requeridos y asegúrate de que hay productos en el carrito.");
        return;
    }

    if (!['Visa', 'MasterCard'].includes(forma_pago.tipo_tarjeta)) {
        alert("El tipo de tarjeta es requerido y debe ser 'Visa' o 'MasterCard'.");
        return;
    }

    if (forma_pago.numero_tarjeta.length !== 16 || isNaN(forma_pago.numero_tarjeta)) {
        alert("El número de tarjeta debe tener 16 dígitos.");
        return;
    }

    if (!forma_pago.nombre_titular) {
        alert("El nombre del titular es requerido.");
        return;
    }

    if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(forma_pago.fecha_expiracion)) {
        alert("La fecha de expiración debe tener el formato MM/YY.");
        return;
    }

    if (forma_pago.cvv.length < 3 || forma_pago.cvv.length > 4 || isNaN(forma_pago.cvv)) {
        alert("El CVV debe tener 3 o 4 dígitos.");
        return;
    }

    const factura = {
        fecha,
        numero_factura,
        total: Number(total),
        forma_pago,
        productos: productosSeleccionados.map(prod => ({
            id: prod.id,
            cantidad: prod.cantidad
        })),
        fk_usuario
    };

    if (validacion(factura)) {
        alert("Llena todos los campos correctamente");
        return;
    }
    
    await newFactura(factura);
    window.location.reload();
});

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
window.agregarProducto = agregarProducto;

const updateForm = document.querySelector('.updateFormu');
updateForm.addEventListener("submit", actualizarDatos);

async function launchModalUpt(e) {
    const idUpdate = e.target.getAttribute("idUpd");
    const { _id, fecha, productos, total, numero_factura, forma_pago } = await getFacturaById(idUpdate);

    document.querySelector('#updId').value = _id;
    document.querySelector('#fecha').value = fecha.split('T')[0];
    document.querySelector('#numero_factura').value = numero_factura;
    document.querySelector('#total').value = total;
    document.querySelector('#forma_pago').value = forma_pago.tipo_tarjeta || ''; 
    document.querySelector('#numero_tarjeta').value = forma_pago.numero_tarjeta || '';
    document.querySelector('#fecha_expiracion').value = forma_pago.fecha_expiracion || '';
    document.querySelector('#cvv').value = forma_pago.cvv || '';
    document.querySelector('#nombre_titular').value = forma_pago.nombre_titular || '';

    const productosContainer = document.querySelector('#productosContainer');
    productosContainer.innerHTML = '';
    if (Array.isArray(productos)) {
        productos.forEach((producto) => {
            agregarProductoo(producto.id, producto.cantidad);
        });
    } else {
        console.error("El formato de productos no es correcto:", productos);
    }
}

async function cargarProductoss() {
    try {
        const response = await fetch('http://localhost:4005/api/productos/total');
        const productos = await response.json();
        return productos; // Devolver la lista de productos para usar en `agregarProducto`
    } catch (error) {
        console.error('Error al cargar productos:', error);
        return []; // Retornar una lista vacía en caso de error
    }
}

async function agregarProductoo(id = '', cantidad = 1) {
    const productos = await cargarProductoss();
    const productosContainer = document.querySelector('#productosContainer');

    // Crear el select de productos con opciones cargadas
    const selectProducto = document.createElement('select');
    selectProducto.classList.add('form-select', 'producto-select', 'mb-1');

    // Opción por defecto
    selectProducto.innerHTML = `<option selected disabled>Selecciona un producto</option>`;

    productos.forEach(producto => {
        const option = document.createElement('option');
        option.value = producto._id;
        option.setAttribute('data-precio', producto.precio);
        option.textContent = `${producto.nombrePro} - $${producto.precio.toLocaleString()}`;
        if (producto._id === id) option.selected = true;
        selectProducto.appendChild(option);
    });

    const cantidadInput = document.createElement('input');
    cantidadInput.type = 'number';
    cantidadInput.classList.add('form-control', 'cantidad-input', 'mb-1');
    cantidadInput.placeholder = 'Cantidad';
    cantidadInput.value = cantidad;
    cantidadInput.min = 1;

    const eliminarBtn = document.createElement('button');
    eliminarBtn.type = 'button';
    eliminarBtn.classList.add('btn', 'btn-danger', 'mt-2', 'remove-producto');
    eliminarBtn.textContent = 'Eliminar';
    eliminarBtn.onclick = () => eliminarProducto(eliminarBtn);

    // Contenedor del producto
    const productoItem = document.createElement('div');
    productoItem.classList.add('producto-item', 'mb-3');
    productoItem.appendChild(selectProducto);
    productoItem.appendChild(cantidadInput);
    productoItem.appendChild(eliminarBtn);

    productosContainer.appendChild(productoItem);

    // Eventos para actualizar total al cambiar el producto o cantidad
    selectProducto.addEventListener('change', calcularTotal);
    cantidadInput.addEventListener('input', calcularTotal);
}

function eliminarProducto(button) {
    const productosContainer = document.querySelector('#productosContainer');
    if (productosContainer.childElementCount > 1) {
        button.closest('.producto-item').remove();
        calcularTotal(); // Recalcular el total después de eliminar un producto
    } else {
        alert("Debe haber al menos un producto en la factura.");
    }
}

// Función para calcular el total
function calcularTotal() {
    const totalInput = document.querySelector('#total');
    let total = 0;
    const productoItems = document.querySelectorAll('#productosContainer .producto-item');

    productoItems.forEach(item => {
        const selectProducto = item.querySelector('.producto-select');
        const cantidadInput = item.querySelector('.cantidad-input');
        const precio = parseFloat(selectProducto.options[selectProducto.selectedIndex].dataset.precio || 0);
        const cantidad = parseInt(cantidadInput.value) || 0;
        total += precio * cantidad;
    });

    totalInput.value = total.toFixed(2);
}

// Evento para botón "Agregar Producto"
document.querySelector('#addProductoBtn').addEventListener('click', () => agregarProductoo());

// Función para actualizar datos
async function actualizarDatos(e) {
    e.preventDefault();

    const id = document.querySelector('#updId').value;
    const numero_factura = document.querySelector('#numero_factura').value;
    const fecha = document.querySelector('#fecha').value;
    const total = parseFloat(document.querySelector('#total').value);
    const forma_pago = {
        tipo_tarjeta: document.querySelector('#forma_pago').value,
        numero_tarjeta: document.querySelector('#numero_tarjeta').value,
        fecha_expiracion: document.querySelector('#fecha_expiracion').value,
        cvv: document.querySelector('#cvv').value,
        nombre_titular: document.querySelector('#nombre_titular').value
    };

    const productos = Array.from(document.querySelectorAll('#productosContainer .producto-item')).map(item => {
        return {
            id: item.querySelector('.producto-select').value,
            cantidad: parseInt(item.querySelector('.cantidad-input').value)
        };
    });

    const datos = {
        numero_factura,
        fecha,
        productos,
        total,
        forma_pago
    };

    await updateFactura(id, datos);
    alert("Factura actualizada correctamente.");
    window.location.reload();
}
