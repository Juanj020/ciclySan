const url = "http://localhost:4005/api/envios";

const newEnvio = async (envio) =>{
    try {
        await fetch(url, {
            method: 'POST',
            body: JSON.stringify(envio),
            headers:{
                'Content-Type' : 'Application/json'
            }
        })
    } catch (error) {
        console.log(error);
    }
}

const borrarEnvio = async (envio) => {
    try {
        await fetch(`${url}/${envio}`, {
            method: 'DELETE'
        }); window.location.reload()
    } catch (error) {
        console.log(error);
    }
}

const getEnvio = async () => {
    try {
        const envio = await fetch(url);
        const datosEnvio = await envio.json();
        return datosEnvio;
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

const updateEnvio = async (id, datos) =>{
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
export {newEnvio, getEnvio, borrarEnvio, updateEnvio, getOne}