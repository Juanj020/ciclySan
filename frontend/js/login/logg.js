import { login } from "./ApiAu.js";

const formulario = document.querySelector('.formulario');

formulario.addEventListener('submit', async (e) => {
    e.preventDefault();

    const correo = document.querySelector('.correo').value;
    const password = document.querySelector('.password').value;

    const info = { correo, password };

    try {
        const data = await login(info);

        if (data && data.success) {
            // Guarda el token y el nombre del usuario en localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.userId); // Guarda el ID del usuario
            localStorage.setItem('userName', data.nombre); // Guarda el nombre del usuario

            // Redirige según el rol
            if (data.rol === 'ADMIN') {
                window.location.href = '../admin/rutas.html'; 
            } else if (data.rol === 'USER') {
                window.location.href = '../index.html'; // Redirige a la página para usuarios
            }
        } else {
            // Muestra el mensaje de error desde el backend
            alert(data.msg || 'Credenciales inválidas');
        }
    } catch (error) {
        console.log(error);
        alert('Creo invalido ó hubo un problema con el servidor. Inténtalo de nuevo más tarde.');
    }
});