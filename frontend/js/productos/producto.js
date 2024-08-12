import { getPrducto, getPrductoRuta, getPrductoAcces, newFactura, getFacturas, borrarFactura, getFacturaById, newEnvio } from "./Api.js";

const carts = document.querySelector('.contenido');
const cartsRuta = document.querySelector('.contenidoRuta');
const cartsAcces = document.querySelector('.contenidoAccesorio');
const tablaFacturas = document.querySelector('#tabla');
const formulario = document.querySelector('.formu');
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

        if (document.querySelector('#facturaForm').checkValidity()) {
            const factura = {
                fecha: document.querySelector('#fecha').value,
                numero_factura: document.querySelector('#numeroFactura').value,
                total: parseFloat(document.querySelector('#total').value), 
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
                })),
                fk_usuario: localStorage.getItem('userId') || null
            };

            await newFactura(factura);

            const envioModal = new bootstrap.Modal(document.getElementById('modalEnvio'));
            envioModal.show();
        } else {
            alert('Por favor, complete todos los campos requeridos con datos válidos.');
        }
    });

    function generarNumeroFactura() {
        return Math.floor(Math.random() * 9000000) + 1000000; 
    }

    function calcularTotal() {
        return parseFloat(totalCard).toLocaleString();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const envioModalElement = document.getElementById('modalEnvio');
    envioModalElement.addEventListener('show.bs.modal', () => {
        const facturaId = document.querySelector('#numeroFactura').value;
        envioModalElement.querySelector('#facturaId').value = facturaId;
    });

    document.querySelector('#envioForm').addEventListener('submit', async (e) => {
        e.preventDefault();

        const envioData = {
            direccion: document.querySelector('#direccion').value,
            ciudad: document.querySelector('#ciudad').value,
            pais: document.querySelector('#pais').value,
            codigo_postal: document.querySelector('#codigoPostal').value,
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