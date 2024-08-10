import { login } from "./ApiAu.js";

const formulario = document.querySelector('.formulario');

formulario.addEventListener('submit', async (e) => {
    e.preventDefault();

    const correo = document.querySelector('.correo').value;
    const password = document.querySelector('.password').value;

    const info = {
        correo,
        password
    };

    try {
        const data = await login(info);

        if (data.success) {
            // Guarda el token y el nombre del usuario en localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.userId); // Guarda el ID del usuario
            localStorage.setItem('userName', data.nombre); // Guarda el nombre del usuario

            // Redirige según el rol
            if (data.rol === 'ADMIN') {
                window.location.href = '../admin/rutas.html'; 
                window.location.href = '../admin/envios.html'; 
                window.location.href = '../admin/facturas.html'; 
                window.location.href = '../admin/noticias.html'; 
                window.location.href = '../admin/usuarios.html'; 
            } else if (data.rol === 'USER') {
                window.location.href = '../index.html'; // Redirige a la página para usuarios
            }
        } else {
            // Manejo de errores, si el login falla
            alert('Credenciales inválidas');
        }
    } catch (error) {
        console.log(error);
    }
});
