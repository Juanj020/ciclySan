const url = "http://localhost:4005/api/noticias";

const getNoticia = async () => {
    try {
        const noticia = await fetch(url);
        const datosNoticias = await noticia.json();
        return datosNoticias;
    } catch (error) {
        console.log(error);
    }
}

const newNoticia = async (noticias) => {
    try {
        await fetch(url, {
            method: 'POST',
            body: JSON.stringify(noticias),
            headers: {
                'Content-Type': 'Application/json'
            }
        })
    } catch (error) {
        console.log(error);
    }
}

const borrarNoticia = async (noticias) => {
    try {
        await fetch(`${url}/${noticias}`, {
            method: 'DELETE'
        }); window.location.reload()
    } catch (error) {
        console.log(error);
    }
}

const getOne = async (id) => {
    try {
        const data = await fetch(`${url}/${id}`);
        const ruta = await data.json();
        return ruta;
    } catch (error) {
        console.log(error);
    }
}

/* const updateNoticia = async (datosA) => {
    try {
        await fetch(`${url}/${datosA._id}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datosA)
        }).then(response => response.json()).then(updatedDatos => {
            console.log('Datos actualizados:', updatedDatos);
        }); window.location.reload()
    } catch (error) {
        console.error(error);
    }
} */

/* const notic = document.querySelector('.formaa')
document.addEventListener('DOMContentLoaded', mostrarNoticiasAdminId);
async function mostrarNoticiasAdminId() {
    const noticiasId = await getOneID();
    noticiasId.forEach(ruta => {
        const { _id, titulo, descripcion, imagen, resumen, fecha, autor } = ruta;
        let fechaa = fecha.substring(0, 10)
        notic.innerHTML += `
        <form action="" class="formulario row formaa">
            <div class="">
            <label class="form-label">Titulo del articulo</label>
            <input type="text" class="form-control tituloo" value="">${titulo}
            </div>
            <div class="">
            <label class="form-label">Descripcion</label>
            <textarea class="descripcion form-control" id="exampleFormControlTextarea1"
            rows="3"></textarea>
            </div>
            <div class="">
            <label class="form-label">Imagen</label>
            <input type="text" class="form-control imagen">
            </div>
            <div class="">
            <label class="form-label">Resumen</label>
            <input type="text" class="form-control resumen">
            </div>
            <div class="">
            <label class="form-label">Fecha</label>
            <input type="date" class="form-control fecha">
            </div>
            <div class="">
            <label class="form-label">Autor</label>
            <input type="text" class="form-control autor">
            </div>
            <button type="submit" class="btn btn-primary bata">Enviar</button>
        </form>
        `
    })
} */

export { getNoticia, newNoticia, borrarNoticia, getOne }