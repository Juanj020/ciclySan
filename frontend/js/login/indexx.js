document.addEventListener('DOMContentLoaded', () => {
    const userInfo = document.getElementById('user-info');

    // Verifica si hay un token en localStorage
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');

    if (token && userName) {
        // Muestra el nombre del usuario y un botón para cerrar sesión
        userInfo.innerHTML = `
            <span>Bienvenido, ${userName}</span>
            <a href="#" id="logout"><img width="50px" src="../img/puerta-abierta.png" alt="Alo xd"></a> 
        `;

        // Manejo de cierre de sesión
        document.getElementById('logout').addEventListener('click', () => {
            localStorage.removeItem('token');
            localStorage.removeItem('userName');
            window.location.reload(); // Recarga la página para actualizar el estado de inicio de sesión
        });
    } else {
        // Muestra el enlace para iniciar sesión
        userInfo.innerHTML = '<a href="login/login.html">Iniciar sesión</a>';
    }
});