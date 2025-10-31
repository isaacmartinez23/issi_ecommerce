// /js/checkout.js
import { supabase } from './supabaseClient.js'; 

document.addEventListener('DOMContentLoaded', async () => {
    
    // 1. Verificar si el usuario está logueado
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        // Si no hay sesión, redirigir a la página de cuenta para que inicie sesión
        alert('Debes iniciar sesión para continuar con el pago.');
        window.location.href = '/cuenta.html';
        return;
    }

    const userId = session.user.id;
    const shippingForm = document.getElementById('shipping-form');

    // (Opcional) 2. Cargar direcciones existentes
    // Aquí podrías hacer un 'select' a la tabla 'Direcciones'
    // y si el usuario ya tiene, en vez de un formulario, muestras una lista.

    // 3. Manejar el envío del formulario
    shippingForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const calle = document.getElementById('calle').value;
        const codigo_postal = document.getElementById('codigo_postal').value;
        const ciudad = document.getElementById('ciudad').value;
        const estado = document.getElementById('estado').value;
        const pais = document.getElementById('pais').value;

        try {
            // 4. Insertar la dirección en Supabase
            const { data, error } = await supabase
                .from('Direcciones')
                .insert([
                    { 
                        id_usuario: userId, 
                        calle: calle,
                        codigo_postal: codigo_postal,
                        ciudad: ciudad,
                        estado: estado,
                        pais: pais
                        // ... (completar con los demás campos del form)
                    }
                ]);

            if (error) throw error;

            // 5. ¡ÉXITO! La dirección está guardada.
            // Ahora puedes pasar al siguiente paso: La pasarela de pago.
            alert('Dirección guardada.');
            
            // Aquí llamarías a la función de la pasarela de pago (Punto 5)
            // ej. iniciarStripeCheckout(datosDeCarrito, data[0]);

        } catch (err) {
            document.getElementById('checkout-error').textContent = err.message;
        }
    });
});