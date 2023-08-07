import { getPrducto, newProducto, borrarProducto, getOne, updateProducto } from "./Api.js";


const pro = document.querySelector('#tabla')
document.addEventListener('DOMContentLoaded', mostrarProductos);
async function mostrarProductos() {
    const productos = await getPrducto();
    productos.forEach(producto => {
        const { _id, nombrePro, precio, marca, stock, descripcion, garantia } = producto;
        pro.innerHTML += `
        <tr>
            <th scope="row">${nombrePro}</th>
            <td>${precio}</td>
            <td>${marca}</td>
            <td>${stock}</td>
            <td>${descripcion}</td>
            <td><button class="btn btn-light update" data-bs-toggle="modal" data-bs-target="#update" idUpd="${_id}">Actualizar</button><button type="button" value="${_id}" id="${_id}"  class="btn btn-danger delete">Eliminar</button> </td>
        </tr>
        `
    })




}


const formulario = document.querySelector('.formu');
formulario.addEventListener('submit', validacionProdcu);

function validacionProdcu(e) {
    e.preventDefault();

    const nombrePro = document.querySelector(".nombrePro").value;
    const precio = document.querySelector(".precio").value;
    const marca = document.querySelector(".marca").value;
    const stock = document.querySelector(".stock").value;
    const descripcion = document.querySelector(".descripcion").value;
    const garantia = document.querySelector(".garantia").value;

    const pro = {
        nombrePro,
        precio,
        marca,
        stock,
        descripcion,
        garantia
    }

    if (validacion(pro)) {
        alert("Llene todos los campos")
        return
    }

    newProducto(pro);
    window.location.reload();

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
            borrarProducto(borrarr);
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

    const { _id, nombrePro, precio, stock, marca, descripcion, garantia } = await getOne(idUpdate)


    document.querySelector('#updId').value = _id;
    document.querySelector('#nombrePro').value = nombrePro;
    document.querySelector('#precio').value = precio;
    document.querySelector('#marca').value = marca;
    document.querySelector('#stock').value = stock;
    document.querySelector('#descripcion').value = descripcion;
    document.querySelector('#garantia').value = garantia;
}

updateModal.addEventListener("submit", actualizarDatos)

async function actualizarDatos() {
    const id = document.querySelector('#updId').value;
    const nombrePro = document.querySelector('#nombrePro').value;
    const precio = document.querySelector('#precio').value;
    const marca = document.querySelector('#marca').value;
    const stock = document.querySelector('#stock').value;
    const descripcion = document.querySelector('#descripcion').value;
    const garantia = document.querySelector('#garantia').value;

    const datos = {
        nombrePro,
        precio,
        marca,
        stock,
        descripcion,
        garantia
    }

    await updateProducto(id, datos);
}