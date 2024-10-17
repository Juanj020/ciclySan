import { getProductoTotal, getPrducto, newProducto, borrarProducto, getOne, updateProducto } from "./Api.js";

document.addEventListener('DOMContentLoaded', () => {
    const userName = localStorage.getItem('userName');
    if (userName) {
        document.getElementById('welcomeMessage').textContent = `Bienvenido: ${userName}`;
    } else {
        // Si no hay nombre de usuario, podrías redirigir al login o mostrar un mensaje
        window.location.href = 'login/login.html';
    }
});

document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    window.location.href = 'login/login.html'; // Redirige al login después de cerrar sesión
});

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        if (!file) resolve(null); // Si no hay archivo, resolver con null
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

const pro = document.querySelector('#tabla')
document.addEventListener('DOMContentLoaded', mostrarProductos);
async function mostrarProductos() {
    const productos = await getProductoTotal();
    productos.forEach(producto => {
        const { _id, nombrePro, precio, marca, stock, descripcion, garantia } = producto;
        pro.innerHTML += `
        <tr>
            <th scope="row">${nombrePro}</th>
            <td>${precio}</td>
            <td>${marca}</td>
            <td>${stock}</td>
            <td>${descripcion}</td>
            <td><button class="btn btn-dark update" data-bs-toggle="modal" data-bs-target="#update" idUpd="${_id}">Actualizar</button><button type="button" value="${_id}" id="${_id}"  class="btn btn-danger delete">Eliminar</button> </td>
        </tr>
        `
    })

}

const formulario = document.querySelector('.formu');
formulario.addEventListener('submit', validacionProdcu);

async function validacionProdcu(e) {
    e.preventDefault();

    const nombrePro = document.querySelector(".nombrePro").value;
    const precio = document.querySelector(".precio").value;
    const marca = document.querySelector(".marca").value;
    const stock = document.querySelector(".stock").value;
    const imagenInput = document.querySelector(".imagenn").files[0];
    const descripcion = document.querySelector(".descripcion").value;
    const garantia = document.querySelector(".garantia").value;
    const tipo = document.querySelector(".tipo").value;

    let imagenBase64 = ''; // Inicializa la variable imagen

    // Si hay un archivo de imagen, convertirlo a Base64
    if (imagenInput) {
        try {
            imagenBase64 = await getBase64(imagenInput); // Convierte la imagen a Base64
        } catch (error) {
            console.log('Error al convertir la imagen a base64:', error);
            alert('Error al procesar la imagen');
            return;
        }
    }

    const pro = {
        nombrePro,
        precio,
        marca,
        stock,
        descripcion,
        garantia,
        imagen : imagenBase64,
        tipo
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

async function launchModalUpt(e) {
    const idUpdate = e.target.getAttribute("idUpd");

    const { _id, nombrePro, precio, stock, marca, descripcion, imagen, garantia, tipo } = await getOne(idUpdate)

    document.querySelector('#updId').value = _id;
    document.querySelector('#nombrePro').value = nombrePro;
    document.querySelector('#precio').value = precio;
    document.querySelector('#marca').value = marca;
    document.querySelector('#stock').value = stock;
    document.querySelector('#descripcion').value = descripcion;
    document.querySelector('#garantia').value = garantia;
    document.querySelector('#tipo').value = tipo;

    const imagenPreview = document.querySelector('#imagenPreview');
    if (imagen) {
        imagenPreview.src = imagen; // Asumiendo que 'imagen' es una URL válida o una cadena Base64
    } else {
        imagenPreview.src = ''; // O una imagen por defecto
    }
}

const updateForm = document.querySelector('.updateFormu');
updateForm.addEventListener("submit", actualizarDatos)

async function actualizarDatos(e) {
    e.preventDefault();

    const id = document.querySelector('#updId').value;
    const nombrePro = document.querySelector('#nombrePro').value;
    const precio = document.querySelector('#precio').value;
    const marca = document.querySelector('#marca').value;
    const stock = document.querySelector('#stock').value;
    const descripcion = document.querySelector('#descripcion').value;
    const imagenInput = document.querySelector("#imagen").files[0];
    const garantia = document.querySelector('#garantia').value;
    const tipo = document.querySelector('#tipo').value;

    let imagenBase64 = '';

    if (imagenInput) {
        try {
            imagenBase64 = await getBase64(imagenInput); // Convierte la imagen a Base64
        } catch (error) {
            console.log('Error al convertir la imagen a base64:', error);
            alert('Error al procesar la imagen');
            return;
        }
    }else {
        // Si no se selecciona una nueva imagen, mantener la existente
        const imagenPreview = document.querySelector('#imagenPreview').src;
        imagenBase64 = imagenPreview; // Asumiendo que imagenPreview.src contiene la imagen en Base64 o una URL válida
    }

    const datos = {
        nombrePro,
        precio,
        marca,
        stock,
        descripcion,
        garantia,
        imagen : imagenBase64,
        tipo
    }

    await updateProducto(id, datos);
    window.location.reload();
}