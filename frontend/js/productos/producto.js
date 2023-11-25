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


/* let imagena = document.querySelector('.cart').getAttribute('src');
console.log(imagena);  // Imprime el src de la imagen
 
db.productos.insertOne({
  "nombrePro": "Guantes Térmicos Invierno Impermeables Pro Ciclismo Ruta Mtb",
  "precio": 60000,
  "marca": "Generico",
  "stock": 10,
  "descripcion": "Multi deportivos, tres puntas aptas para sensibilidad tactil. Diseñados para climas adversos.",
  "garantia": "2 meses",
  "imagen": "https://cdn.shopify.com/s/files/1/0275/1794/3856/products/BS0594.png?v=1645710433&width=533",
  "tipo": "accesorio"
})

*/