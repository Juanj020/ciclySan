const url = "http://localhost:4005/api/auth";

const login = async (info) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(info),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.msg || 'Error en el servidor');
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return { success: false, msg: error.message }; // Retorna un objeto con el mensaje de error
    }
};

export { login };