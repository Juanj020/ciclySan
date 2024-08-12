const facturaUrl = "http://localhost:4005/api/facturas";

const newFactura = async (factura) => {
    try {
        await fetch(facturaUrl, {
            method: 'POST',
            body: JSON.stringify(factura),
            headers:{
                'Content-Type' : 'application/json'
            }
        });
    } catch (error) {
        console.log(error);
    }
}

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

export { newFactura, getFacturas, borrarFactura, updateFactura, getFacturaById }
