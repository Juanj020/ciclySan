const url = "http://localhost:4005/api/productos";

const getPrducto = async () => {
    try {
        const productos = await fetch(url);
        const datosPrductos = await productos.json();
        return datosPrductos;
    } catch (error) {
        console.log(error);
    }
}
const getPrductoRuta = async () => {
    try {
        const productos = await fetch(`${url}/ruta`);
        const datosPrductos = await productos.json();
        return datosPrductos;
    } catch (error) {
        console.log(error);
    }
}
const getPrductoAcces = async () => {
    try {
        const productos = await fetch(`${url}/accesorio`);
        const datosPrductos = await productos.json();
        return datosPrductos;
    } catch (error) {
        console.log(error);
    }
}

const newProducto = async (productos) => {
    try {
        await fetch(url, {
            method: 'POST',
            body: JSON.stringify(productos),
            headers: {
                'Content-Type': 'Application/json'
            }
        })
    } catch (error) {
        console.log(error);
    }
}

const borrarProducto = async (productos) => {
    try {
        await fetch(`${url}/${productos}`, {
            method: 'DELETE'
        }); window.location.reload()
    } catch (error) {
        console.log(error);
    }
}

const getOne = async (id) => {
    try {
        const data = await fetch(`${url}/${id}`);
        const producto = await data.json();
        return producto;
    } catch (error) {
        console.log(error);
    }
}

const updateProducto = async (id, datos) =>{
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

export { getPrducto, newProducto, borrarProducto, getOne, updateProducto, getPrductoRuta, getPrductoAcces }