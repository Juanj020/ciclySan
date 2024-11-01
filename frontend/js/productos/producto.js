import { getPrducto, getPrductoRuta, getPrductoAcces, newFactura, getFacturas, borrarFactura, getFacturaById, newEnvio } from "./Api.js";

const carts = document.querySelector('.contenido');
const cartsRuta = document.querySelector('.contenidoRuta');
const cartsAcces = document.querySelector('.contenidoAccesorio');
const tablaFacturas = document.querySelector('#tabla');
const containerBuyCart = document.querySelector('.card-items');
const priceTotal = document.querySelector('.price-total');
const amountProduct = document.querySelector('.count-product');
const userInfo = document.getElementById('user-info');

let buyThings = [];
let totalCard = 0;
let countProduct = 0;

document.addEventListener('DOMContentLoaded', () => {
    if (carts) mostrarProductos(getPrducto, carts);
    if (cartsRuta) mostrarProductos(getPrductoRuta, cartsRuta);
    if (cartsAcces) mostrarProductos(getPrductoAcces, cartsAcces);
    if (tablaFacturas) mostrarFacturas();
    setupUserInfo();
});

async function mostrarProductos(categoria, contenedor) {
    const productos = await categoria();
    contenedor.innerHTML = ''; 
    productos.forEach(producto => {
        const { _id, nombrePro, precio, marca, descripcion, garantia, imagen } = producto;
        const precioFormateado = parseFloat(precio).toLocaleString();
        contenedor.innerHTML += `
            <div class="parrafos">
                <div class="imagen">
                    <img id="imagenimagen" class="deletee" width="auto" height="200px" src="${imagen}" alt="">
                </div>
                <h1 class="title">${nombrePro}</h1>
                <h3>Precio: <strong class="precio">${precioFormateado}$</strong></h3>
                <h3>Marca: ${marca}</h3>
                <h3>${descripcion}</h3>
                <h3>Garantia: ${garantia}</h3>
                <button value="${_id}" data-id='${_id}' class='btn-add-cart sisen'>Añadir al carrito</button>
            </div>
        `;
    });

    setupCartListeners();
}

function setupCartListeners() {
    if (carts) carts.addEventListener('click', addProduct);
    if (cartsRuta) cartsRuta.addEventListener('click', addProduct);
    if (cartsAcces) cartsAcces.addEventListener('click', addProduct);
    if (containerBuyCart) containerBuyCart.addEventListener('click', deleteProduct);
}

function addProduct(e) {
    e.preventDefault();
    if (e.target.classList.contains('btn-add-cart')) {
        const selectProduct = e.target.parentElement;
        readTheContent(selectProduct);
    }
}

function deleteProduct(e) {
    if (e.target.classList.contains('delete-product')) {
        const deleteId = e.target.getAttribute('data-id');

        const productToRemove = buyThings.find(product => product.id === deleteId);

        if (productToRemove) {
            let priceReduce = parseFloat(productToRemove.price) * parseFloat(productToRemove.amount);
            totalCard -= priceReduce;

            buyThings = buyThings.filter(product => product.id !== deleteId);

            countProduct = buyThings.reduce((acc, product) => acc + product.amount, 0);
            totalCard = totalCard.toFixed(2);

            loadHtml();
        }
    }
}


function readTheContent(product) {
    const infoProduct = {
        image: product.querySelector('#imagenimagen').getAttribute('src'),
        nombrePro: product.querySelector('.title').textContent,
        price: product.querySelector('.precio').textContent.replace('$', '').replace(/\./g, '').replace(/,/g, '.'), 
        id: product.querySelector('.sisen').value,
        amount: 1
    }

    totalCard = parseFloat(totalCard) + parseFloat(infoProduct.price);
    totalCard = totalCard.toFixed(2);

    const exist = buyThings.some(product => product.id === infoProduct.id);
    if (exist) {
        const pro = buyThings.map(product => {
            if (product.id === infoProduct.id) {
                product.amount++;
                return product;
            } else {
                return product;
            }
        });
        buyThings = [...pro];
    } else {
        buyThings = [...buyThings, infoProduct];
        countProduct++;
    }
    loadHtml();
}

function loadHtml() {
    clearHtml();
    buyThings.forEach(product => {
        const { image, nombrePro, price, amount, id } = product;
        const priceFormateado = parseFloat(price).toLocaleString();
        const row = document.createElement('div');
        row.classList.add('item');
        row.innerHTML = `
            <img src="${image}" alt="">
            <div class="item-content">
                <h5>${nombrePro}</h5>
                <h5 class="cart-price">${priceFormateado}$</h5> 
                <h6>Cantidad: ${amount}</h6>
            </div>
            <span class="delete-product" data-id="${id}">X</span>
        `;
        containerBuyCart.appendChild(row);
    });

    priceTotal.innerHTML = parseFloat(totalCard).toLocaleString() + '$'; 
    /* console.log(priceTotal.innerHTML = parseFloat(totalCard).toLocaleString() + '$'); */
    
    amountProduct.innerHTML = countProduct;
}

function clearHtml() {
    if (containerBuyCart) containerBuyCart.innerHTML = '';
}

async function mostrarFacturas() {
    if (!tablaFacturas) return;

    const facturas = await getFacturas();
    tablaFacturas.innerHTML = ''; 
    facturas.forEach(factura => {
        const { _id, productos, fecha_fac, total, forma_pago } = factura;
        const fechaa = fecha_fac.substring(0, 10);

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

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#facturaModal').addEventListener('show.bs.modal', () => {
        const hoy = new Date();
        const fechaFormateada = hoy.toISOString().substring(0, 10);
        document.querySelector('#fecha').value = fechaFormateada;

        document.querySelector('#numeroFactura').value = generarNumeroFactura();
        document.querySelector('#total').value = calcularTotal(); 
    });

    document.querySelector('#facturaForm').addEventListener('submit', async (e) => {
        e.preventDefault();

        const totalSinFormato = parseFloat(calcularTotal().toString().replace(/\./g, ''));

        const factura = {
            fecha: document.querySelector('#fecha').value,
            numero_factura: document.querySelector('#numeroFactura').value,
            total: totalSinFormato, 
            forma_pago: {
                tipo_tarjeta: document.querySelector('#tipoTarjeta').value,
                numero_tarjeta: document.querySelector('#numeroTarjeta').value,
                nombre_titular: document.querySelector('#nombreTitular').value,
                fecha_expiracion: document.querySelector('#fechaExpiracion').value,
                cvv: document.querySelector('#cvv').value
            },
            productos: buyThings.map(product => ({
                id: product.id,
                cantidad: product.amount
            }))
        };

        const userId = localStorage.getItem('userId');
        if (userId != "") {
            factura.fk_usuario = userId; 
        }

        const errores = validarFormulario(factura);
        if (errores.length > 0) {
            alert('Errores encontrados:\n' + errores.join('\n'));
            return; 
        }

        await newFactura(factura);

        const envioModal = new bootstrap.Modal(document.getElementById('modalEnvio'));
        envioModal.show();
        
        const facturaModal = bootstrap.Modal.getInstance(document.getElementById('facturaModal'));
        facturaModal.hide(); 
    });

    function generarNumeroFactura() {
        return Math.floor(Math.random() * 9000000) + 1000000; 
    }

    function calcularTotal() {
        return parseFloat(totalCard).toLocaleString();
    }
});

function validarFormulario(formData) {
    const errores = [];

    if (!formData.fecha || !/^\d{4}-\d{2}-\d{2}$/.test(formData.fecha)) {
        errores.push("Falta la fecha de la compra o no es válida (debe ser formato YYYY-MM-DD)");
    }

    if (!Array.isArray(formData.productos) || formData.productos.length === 0) {
        errores.push("Es necesario agregar productos al carrito");
    }

    if (!formData.total || isNaN(formData.total)) {
        errores.push("Es necesario el total y debe ser un número");
    }

    if (!formData.forma_pago.tipo_tarjeta || !['Visa', 'MasterCard'].includes(formData.forma_pago.tipo_tarjeta)) {
        errores.push("El tipo de tarjeta es requerido y debe ser Visa o MasterCard");
    }

    if (!formData.forma_pago.numero_tarjeta || formData.forma_pago.numero_tarjeta.length !== 16 || isNaN(formData.forma_pago.numero_tarjeta)) {
        errores.push("El número de tarjeta debe tener 16 dígitos y ser numérico");
    }

    if (!formData.forma_pago.nombre_titular) {
        errores.push("El nombre del titular es requerido");
    }

    if (!formData.forma_pago.fecha_expiracion || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.forma_pago.fecha_expiracion)) {
        errores.push("La fecha de expiración debe tener el formato MM/YY");
    }

    if (!formData.forma_pago.cvv || (formData.forma_pago.cvv.length < 3 || formData.forma_pago.cvv.length > 4) || isNaN(formData.forma_pago.cvv)) {
        errores.push("El CVV debe tener 3 o 4 dígitos y ser numérico");
    }

    return errores;
}

document.addEventListener('DOMContentLoaded', () => {
    const envioModalElement = document.getElementById('modalEnvio');
    envioModalElement.addEventListener('show.bs.modal', () => {
        const facturaId = document.querySelector('#numeroFactura').value;
        envioModalElement.querySelector('#facturaId').value = facturaId;
    });

    document.querySelector('#envioForm').addEventListener('submit', async (e) => {
        e.preventDefault();

        const envioData = {
            correo: document.querySelector('#correo').value,
            nombre: document.querySelector('#nombre').value,
            cedula: document.querySelector('#cedula').value,
            direccion: document.querySelector('#direccion').value,
            departamento: document.querySelector('#departamento').value,
            ciudad: document.querySelector('#ciudad').value,
            telefono: document.querySelector('#telefono').value,
            fk_factura: document.querySelector('#facturaId').value
        };

        await newEnvio(envioData);
    });
});

function setupUserInfo() {
    const username = localStorage.getItem('username');
    if (userInfo && username) {
        userInfo.innerHTML = `
            <p class="usuario">${username}</p>
            <button class="btn-salir" id="salir">Salir</button>
        `;
        setupLogoutButton();
    }
}

function setupLogoutButton() {
    const salirButton = document.getElementById('salir');
    if (salirButton) {
        salirButton.addEventListener('click', () => {
            localStorage.clear();
            window.location.href = '/api/auth/login';
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const envioModalElement = document.getElementById('modalEnvio');
    if (envioModalElement) {
        envioModalElement.addEventListener('show.bs.modal', () => {
            const facturaId = document.querySelector('#numeroFactura').value;
            envioModalElement.querySelector('#facturaId').value = facturaId;
        });
    } else {
        console.error('Modal de envío no encontrado');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const userInfo = document.getElementById('user-info');
    const userName = localStorage.getItem('userName');
    const token = localStorage.getItem('token');
    const boton = document.querySelector('.boton');

    if (token && userName) {
        userInfo.innerHTML = `
            <span>Bienvenido, ${userName}</span>
            <a href="#" id="logout"><img width="50px" src="../img/puerta-abierta.png" alt="Cerrar sesión"></a>
        `;
        /* boton.classList.remove('hidden'); */

        document.getElementById('logout').addEventListener('click', () => {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('userName');
            window.location.reload();
        });
    } else {
        userInfo.innerHTML = '<a href="login/login.html">Iniciar sesión</a>';
    }
});
