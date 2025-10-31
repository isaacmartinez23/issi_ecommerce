// /js/cuenta.js
document.addEventListener('DOMContentLoaded', () => {

    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const authContainer = document.getElementById('auth-container');
    const accountDashboard = document.getElementById('account-dashboard');
    const logoutButton = document.getElementById('logout-button');

    const showRegisterLink = document.getElementById('show-register');
    const showLoginLink = document.getElementById('show-login');

    // Lógica para mostrar/ocultar formularios
    showRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    });

    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    });

    // --- MANEJO DEL LOGIN ---
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const errorP = document.getElementById('login-error');

        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Error al iniciar sesión');
            }

            // ¡ÉXITO! Guarda el token y muestra el panel
            localStorage.setItem('issi_token', data.token);
            authContainer.style.display = 'none';
            accountDashboard.style.display = 'block';
            errorP.textContent = '';

        } catch (err) {
            errorP.textContent = err.message;
        }
    });

    // --- MANEJO DEL REGISTRO ---
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        // (Similar al login, pero llama a /api/register)
        // ... (implementar lógica) ...
        // Tras registro exitoso, puedes mostrar un mensaje: "¡Registro exitoso! Por favor, inicia sesión."
    });

    // --- MANEJO DE LOGOUT ---
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('issi_token');
        authContainer.style.display = 'block';
        accountDashboard.style.display = 'none';
    });

    // --- COMPROBAR ESTADO AL CARGAR LA PÁGINA ---
    const token = localStorage.getItem('issi_token');
    if (token) {
        // (Aquí podrías verificar si el token sigue siendo válido con otra API)
        authContainer.style.display = 'none';
        accountDashboard.style.display = 'block';
    }
});