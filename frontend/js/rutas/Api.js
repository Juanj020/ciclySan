const url = "http://localhost:4005/api/rutas";

const getRuta = async () => {
    try {
        const response = await fetch(url);
        const datosRutas = await response.json();
        return datosRutas;
    } catch (error) {
        console.log('Error en getRuta:', error);
    }
}

async function newRuta(rut) {
    try {
        const response = await fetch('http://localhost:4005/api/rutas', { // Asegúrate de usar la URL correcta
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(rut)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al crear la ruta');
        }

        return await response.json();
    } catch (error) {
        console.error('Error en newRuta:', error);
        throw error; // Propagar el error para manejarlo en el llamador
    }
}

const borrarRuta = async (rutas) => {
    try {
        await fetch(`${url}/${rutas}`, {
            method: 'DELETE'
        });
        window.location.reload();
    } catch (error) {
        console.log('Error en borrarRuta:', error);
    }
}

const getOne = async (id) => {
    try {
        const response = await fetch(`${url}/${id}`);
        const ruta = await response.json();
        return ruta;
    } catch (error) {
        console.log('Error en getOne:', error);
    }
}

const updateRuta = async (id, datos) => {
    try {
        await fetch(`${url}/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datos),
        });
    } catch (error) {
        console.log('Error en updateRuta:', error);
    }
};

// Agregar funciones para calificaciones
const calificacionesUrl = "http://localhost:4005/api/calificacion";

const calificarRuta = async (calificacion) => {
    try {
        // Primero, verifica si el usuario ya ha calificado esta ruta
        const calificaciones = await obtenerCalificaciones(calificacion.rutaId);
        const calificacionExistente = calificaciones.find(c => c.userId === calificacion.userId);
        
        if (calificacionExistente) {
            // Si ya existe una calificación, actualízala
            await fetch(`${calificacionesUrl}/calificacion/${calificacionExistente._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(calificacion)
            });
        } else {
            // Si no existe, crea una nueva calificación
            await fetch(`${calificacionesUrl}/calificar-ruta`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(calificacion)
            });
        }
    } catch (error) {
        console.log('Error en calificarRuta:', error);
    }
}

const obtenerCalificaciones = async (rutaId) => {
    try {
        const response = await fetch(`${calificacionesUrl}/calificaciones/${rutaId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error en obtenerCalificaciones:', error);
    }
}

const updateCalificacion = async (id, calificacion) => {
    try {
        await fetch(`http://localhost:4005/api/calificacion/calificaciones/${id}`, { // Verifica esta URL
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(calificacion)
        });
    } catch (error) {
        console.log('Error en updateCalificacion:', error);
    }
}

export { getRuta, newRuta, borrarRuta, getOne, updateRuta, calificarRuta, obtenerCalificaciones, updateCalificacion }
