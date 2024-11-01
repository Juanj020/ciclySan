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

const getNoticiaVisibles = async () => {
    try {
        const noticia = await fetch(`${url}/visibles`);
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

const updateNoticia = async (id, datosA) => {
    try {
        await fetch(`${url}/${id}`, {
            method: "PUT",
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosA)
        })
        /* .then(response => response.json()).then(updatedDatos => {
            console.log('Datos actualizados:', updatedDatos);
        }); */
    } catch (error) {
        console.error(error);
    }
} 

export { getNoticia, newNoticia, borrarNoticia, updateNoticia, getOne, getNoticiaVisibles }