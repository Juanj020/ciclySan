const url = "http://localhost:4005/api/auth"

const login = async (info) => {
    try {
        const response = await fetch(url,{
            method: 'POST',
            body: JSON.stringify(info),
            headers: {
                'Content-Type' : 'Application/json'
            }
        })

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'error');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

export { login }