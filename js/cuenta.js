// /js/cuenta.js
// Importamos el cliente que acabamos de crear
import { supabase } from './supabaseClient.js'; 

document.addEventListener('DOMContentLoaded', () => {
    // ... (aquí van tus selectores de formularios: loginForm, registerForm, etc.) ...

    // --- MANEJO DEL REGISTRO ---
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const errorP = document.getElementById('register-error');

        try {
            // ¡MÁGIA DE SUPABASE!
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
            });

            if (error) throw error;

            // Si desactivaste la confirmación, el 'user' vendrá en 'data'
            // Si la tienes activada, 'data.user' será null hasta que confirme
            alert('¡Registro exitoso! Revisa tu email para confirmar (si está activado).');
            // ... (lógica para cambiar al formulario de login) ...

        } catch (err) {
            errorP.textContent = err.message;
        }
    });

    // --- MANEJO DEL LOGIN ---
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const errorP = document.getElementById('login-error');

        try {
            // ¡MÁGIA DE SUPABASE!
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (error) throw error;

            // ¡ÉXITO! Supabase maneja la sesión automáticamente
            // data.session y data.user tienen toda la info
            authContainer.style.display = 'none';
            accountDashboard.style.display = 'block';

        } catch (err) {
            errorP.textContent = err.message;
        }
    });

    // --- MANEJO DE LOGOUT ---
    logoutButton.addEventListener('click', async () => {
        await supabase.auth.signOut();
        authContainer.style.display = 'block';
        accountDashboard.style.display = 'none';
    });

    // ... (tu lógica para comprobar la sesión al cargar la página) ...
    // (Puedes usar supabase.auth.getSession())
});