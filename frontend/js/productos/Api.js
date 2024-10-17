const url = "http://localhost:4005/api/productos";

const getProductoTotal = async () => {
    try {
        const productos = await fetch(`${url}/total`);
        const datosPrductos = await productos.json();
        return datosPrductos;
    } catch (error) {
        console.log(error);
    }
}

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

const facturaUrl = "http://localhost:4005/api/facturas";

const newFactura = async (factura) => {
    try {
        console.log('Factura a enviar:', factura); // Verifica los datos de la factura
        const response = await fetch(facturaUrl, {
            method: 'POST',
            body: JSON.stringify(factura),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            // Obtén el mensaje de error del servidor
            const error = await response.json();
            console.error('Error al enviar la factura:', error);
            return;
        }

        const data = await response.json();
        console.log('Factura creada:', data);
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
};

const enviarFactura = async (facturaData) => {
    try {
        const response = await fetch('http://localhost:4005/api/facturas', {
            method: 'POST',
            headers: {
                'Content-Type': 'applicationa/json'
            },
            body: JSON.stringify(facturaData)
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('Error al crear la factura:', error);
            return null; // Retorna null si hay error
        }

        const factura = await response.json();
        return factura._id; // Retorna el ID de la factura generada
    } catch (error) {
        console.error('Error al crear la factura:', error);
        return null;
    }
};

const borrarFactura = async (facturaId) => {
    try {
        await fetch(`${facturaUrl}/${facturaId}`, {
            method: 'DELETE'
        });
        window.location.reload();
    } catch (error) {
        console.log(error);
    }
}

const getFacturas = async () => {
    try {
        const facturas = await fetch(facturaUrl);
        const datosFactura = await facturas.json();
        return datosFactura;
    } catch (error) {
        console.log(error);
    }
}

const getFacturaById = async (id) => {
    try {
        const data = await fetch(`${facturaUrl}/${id}`);
        const factura = await data.json();
        return factura;
    } catch (error) {
        console.log(error);
    }
}

const updateFactura = async (id, datos) =>{
    try {
      await fetch (`${facturaUrl}/${id}`,{
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

const envioUrl = "http://localhost:4005/api/envios";

const newEnvio = async (envio) => {
    try {
        await fetch(envioUrl, {
            method: 'POST',
            body: JSON.stringify(envio),
            headers:{
                'Content-Type': 'application/json'
            }
        });
        window.location.reload();
    } catch (error) {
        console.log(error);
    }
}

export { getProductoTotal, getPrducto, newProducto, borrarProducto, getOne, updateProducto, getPrductoRuta, getPrductoAcces, newFactura, getFacturas, borrarFactura, updateFactura, getFacturaById, newEnvio, enviarFactura}