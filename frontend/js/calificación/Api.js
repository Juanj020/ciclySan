const url = "http://localhost:4005/api/calificacion";

const newCalificacion = async (calificacion) =>{
    try {
        await fetch(`${url}/calificar-ruta`, {
            method: 'POST',
            body: JSON.stringify(calificacion),
            headers:{
                'Content-Type' : 'Application/json'
            }
        })
    } catch (error) {
        console.log(error);
    }
}

const borrarCalificacion = async (calificacion) => {
    try {
        await fetch(`${url}/${calificacion}`, {
            method: 'DELETE'
        }); window.location.reload()
    } catch (error) {
        console.log(error);
    }
}

const getCalificacion = async () => {
    try {
        const calificacion = await fetch(url);
        const datosCalificacion = await calificacion.json();
        return datosCalificacion;
    } catch (error) {
        console.log(error);
    }
}

const getOne = async (_id) => {
    try {
        const data = await fetch(`${url}/${_id}`);
        const ruta = await data.json();
        return ruta;
    } catch (error) {
        console.log(error);
    }
}

const updateCalificacion = async (id, datos) =>{
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
export {newCalificacion, getCalificacion, borrarCalificacion, updateCalificacion, getOne}