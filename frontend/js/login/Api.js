const url = "http://localhost:4005/api/usuarios";

const newUsuario = async (usuarios) =>{
    try {
        await fetch(url, {
            method: 'POST',
            body: JSON.stringify(usuarios),
            headers:{
                'Content-Type' : 'Application/json'
            }
        })
    } catch (error) {
        console.log(error);
    }
}

const borrarUsuario = async (usuarios) => {
    try {
        await fetch(`${url}/${usuarios}`, {
            method: 'DELETE'
        }); window.location.reload()
    } catch (error) {
        console.log(error);
    }
}

const getUsuario = async () => {
    try {
        const usuarios = await fetch(url);
        const datosUsuario = await usuarios.json();
        return datosUsuario;
    } catch (error) {
        console.log(error);
    }
}
export {newUsuario, getUsuario, borrarUsuario}