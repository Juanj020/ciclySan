const url = "http://localhost:4005/api/rutas";

const getRuta = async () => {
    try {
        const ruta = await fetch(url);
        const datosRutas = await ruta.json();
        return datosRutas;
    } catch (error) {
        console.log(error);
    }
}

const newRuta = async (noticias) => {
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

const borrarRuta = async (rutas) => {
    try {
        await fetch(`${url}/${rutas}`, {
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

const updateRuta = async (id, datos) =>{
    try {
      await fetch (`${url}/${id}`,{
        method:'PUT',
        headers:{
          "Content-Type" : "application/json"
        },
        body:JSON.stringify(datos),
      }) 
    } catch (error) {
      console.log(error);
    }
};

export { getRuta, newRuta, borrarRuta, getOne, updateRuta }