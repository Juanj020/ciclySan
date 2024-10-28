const url = "http://localhost:4005/api/usuarios";

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
};

const newUsuario = async (usu) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(usu),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.msg || 'Error al registrar el usuario');
        }

        return await response.json();
    } catch (error) {
        console.error(error.message);
        return { success: false, msg: error.message };
    }
};

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
        const usuarios = await fetch(url, {
            headers: getHeaders() // Usar headers con el token
        });
        const datosUsuario = await usuarios.json();
        return datosUsuario;
    } catch (error) {
        console.log(error);
    }
};

const getOne = async (id) => {
    try {
        const data = await fetch(`${url}/${id}`);
        const ruta = await data.json();
        return ruta;
    } catch (error) {
        console.log(error);
    }
}

const updateUSuar = async (id, datos) =>{
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
export {newUsuario, getUsuario, borrarUsuario, updateUSuar, getOne}