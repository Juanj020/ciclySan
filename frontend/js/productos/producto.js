import { getPrducto, getPrductoRuta, getPrductoAcces } from "./Api.js";

const carts = document.querySelector('.contenido')
document.addEventListener('DOMContentLoaded', mostrarPRodcuto);
const cartsRuta = document.querySelector('.contenidoRuta')
document.addEventListener('DOMContentLoaded', mostrarPRodcuto);
const cartsAcces = document.querySelector('.contenidoAccesorio')
document.addEventListener('DOMContentLoaded', mostrarPRodcuto);

async function mostrarPRodcuto() {
    const productos = await getPrducto();
    productos.forEach(ruta => {
        const { _id, nombrePro, precio, marca, descripcion, garantia, imagen } = ruta;
        carts.innerHTML += `
            <div class="parrafos">
                <div class="imagen">
                    <img id="imagenimagen" class="deletee" width="auto" height="200px" src="${imagen}" alt="">
                </div>
                <h1 class="title">${nombrePro}</h1>
                <h3>Precio: <strong class="precio">${precio}</strong></h3>
                <h3>Marca: ${marca}</h3>
                <h3>${descripcion}</h3>
                <h3>Garantia: ${garantia}</h3>
                    <button value="${_id}" data-id='${_id}' class='btn-add-cart sisen'>Añadir al carrtio</button>
            </div>
        `
    })
    const productosruta = await getPrductoRuta();
    productosruta.forEach(ruta => {
        const { _id, nombrePro, precio, marca, descripcion, garantia, imagen } = ruta;
        cartsRuta.innerHTML += `
            <div class="parrafos">
                <div class="imagen">
                    <img id="imagenimagen" class="deletee" width="auto" height="200px" src="${imagen}" alt="">
                </div>
                <h1 class="title">${nombrePro}</h1>
                <h3>Precio: <strong class="precio">${precio}</strong></h3>
                <h3>Marca: ${marca}</h3>
                <h3>${descripcion}</h3>
                <h3>Garantia: ${garantia}</h3>
                    <button value="${_id}" data-id='${_id}' class='btn-add-cart sisen'>Añadir al carrtio</button>
            </div>
        `
    })
    const productosacce = await getPrductoAcces();
    productosacce.forEach(ruta => {
        const { _id, nombrePro, precio, marca, descripcion, garantia, imagen } = ruta;
        cartsAcces.innerHTML += `
            <div class="parrafos">
                <div class="imagen">
                    <img id="imagenimagen" class="deletee" width="auto" height="200px" src="${imagen}" alt="">
                </div>
                <h1 class="title">${nombrePro}</h1>
                <h3>Precio: <strong class="precio">${precio}</strong></h3>
                <h3>Marca: ${marca}</h3>
                <h3>${descripcion}</h3>
                <h3>Garantia: ${garantia}</h3>
                    <button value="${_id}" data-id='${_id}' class='btn-add-cart sisen'>Añadir al carrtio</button>
            </div>
        `
    })
    let allContainerCart = document.querySelector('.contenido');
    let allContainerCartr = document.querySelector('.contenidoRuta');
    let allContainerCarta = document.querySelector('.contenidoAccesorio');
    let containerBuyCart = document.querySelector('.card-items');
    let priceTotal = document.querySelector('.price-total')
    let amountProduct = document.querySelector('.count-product');


    let buyThings = [];
    let totalCard = 0;
    let countProduct = 0;

    //functions
    loadEventListenrs();
    function loadEventListenrs() {
        allContainerCart.addEventListener('click', addProduct);
        allContainerCartr.addEventListener('click', addProduct);
        allContainerCarta.addEventListener('click', addProduct);

        containerBuyCart.addEventListener('click', deleteProduct);
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

            buyThings.forEach(value => {
                if (value.id == deleteId) {
                    let priceReduce = parseFloat(value.price) * parseFloat(value.amount);
                    totalCard = totalCard - priceReduce;
                    totalCard = totalCard.toFixed(2);
                }
            });
            buyThings = buyThings.filter(product => product.id !== deleteId);

            countProduct--;
        }
        //FIX: El contador se quedaba con "1" aunque ubiera 0 productos
        if (buyThings.length === 0) {
            priceTotal.innerHTML = 0;
            amountProduct.innerHTML = 0;
        }
        loadHtml();
    }

    function readTheContent(product) {

        const infoProduct = {
            image: product.querySelector('#imagenimagen').getAttribute('src'),
            nombrePro: product.querySelector('.title').textContent,
            price: product.querySelector('.precio').textContent,
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
                    return product
                }
            });
            buyThings = [...pro];
        } else {
            buyThings = [...buyThings, infoProduct]
            countProduct++;
        }
        loadHtml();
        //console.log(infoProduct);
    }

    function loadHtml() {
        clearHtml();
        buyThings.forEach(product => {
            const { image, nombrePro, price, amount, id } = product;
            const row = document.createElement('div');
            row.classList.add('item');
            row.innerHTML = `
                <img src="${image}" alt="">
                <div class="item-content">
                    <h5>${nombrePro}</h5>
                    <h5 class="cart-price">${price}$</h5>
                    <h6>Cantidad: ${amount}</h6>
                </div>
                <span class="delete-product" data-id="${id}">X</span>
            `;
            containerBuyCart.appendChild(row);

            priceTotal.innerHTML = totalCard;

            amountProduct.innerHTML = countProduct;
        });
    }
    function clearHtml() {
        containerBuyCart.innerHTML = '';
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const userInfo = document.getElementById('user-info');

    // Verifica si hay un token en localStorage
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');

    if (token && userName) {
        // Muestra el nombre del usuario y un botón para cerrar sesión
        userInfo.innerHTML = `
            <span>Bienvenido, ${userName}</span>
            <a href="#" id="logout"><img width="50px" src="../img/puerta-abierta.png" alt="Alo xd"></a> 
        `;

        // Manejo de cierre de sesión
        document.getElementById('logout').addEventListener('click', () => {
            localStorage.removeItem('token');
            localStorage.removeItem('userName');
            window.location.reload(); // Recarga la página para actualizar el estado de inicio de sesión
        });
    } else {
        // Muestra el enlace para iniciar sesión
        userInfo.innerHTML = '<a href="login/login.html">Iniciar sesión</a>';
    }
});