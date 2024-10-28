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
        const calificacionExistente = await obtenerCalificacionUsuario(calificacion.rutaId);

        if (calificacionExistente) {
            // Actualizar calificación existente
            await fetch(`${calificacionesUrl}/calificacion/${calificacionExistente._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ rating: calificacion.rating })
            });
        } else {
            // Crear nueva calificación
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
};

const obtenerCalificacionUsuario = async (rutaId) => {
    try {
        const response = await fetch(`${calificacionesUrl}/ruta/${rutaId}/usuario`, {
            headers: {
                'Authorization': `Bearer ${token}` // Incluye el token para autenticar al usuario
            }
        });
        if (response.ok) {
            return await response.json();
        } else if (response.status === 404) {
            return null; // No hay calificación para este usuario
        }
    } catch (error) {
        console.log('Error en obtenerCalificacionUsuario:', error);
    }
};

const actualizarCalificacion = async (calificacionId, calificacion) => {
    try {
        await fetch(`http://localhost:4005/api/calificacion/calificaciones/${calificacionId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ rating: calificacion.rating })
        });
    } catch (error) {
        console.log('Error en actualizarCalificacion:', error);
    }
};

export { getRuta, newRuta, borrarRuta, getOne, updateRuta, calificarRuta, obtenerCalificacionUsuario, actualizarCalificacion }
