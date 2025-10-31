// Carrito de compras - JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Elementos del mini-cart
    const cartToggle = document.getElementById('cart-toggle');
    const miniCart = document.getElementById('mini-cart');
    const closeMiniCart = document.getElementById('close-mini-cart');

    // Abrir/cerrar mini-cart
    if (cartToggle) {
        cartToggle.addEventListener('click', function() {
            miniCart.style.display = miniCart.style.display === 'block' ? 'none' : 'block';
        });
    }

    if (closeMiniCart) {
        closeMiniCart.addEventListener('click', function() {
            miniCart.style.display = 'none';
        });
    }

    // Cerrar mini-cart al hacer clic fuera
    document.addEventListener('click', function(event) {
        if (!miniCart.contains(event.target) && !cartToggle.contains(event.target)) {
            miniCart.style.display = 'none';
        }
    });

    // Agregar al carrito desde botones
    document.querySelectorAll('.add-button').forEach(btn => {
        btn.addEventListener('click', function() {
            const productItem = this.closest('.product-item');
            const img = productItem.querySelector('img').src;
            const name = productItem.querySelector('h3').textContent;
            const price = productItem.querySelector('p').textContent;

            addToMiniCart(img, name, price);
            showToast('Agregado al carrito');

            // Actualizar contador
            updateCartCount();
        });
    });

    // Función para agregar ítem al mini-cart
    function addToMiniCart(img, name, price) {
        const miniCartItems = document.querySelector('.mini-cart-items');
        if (miniCartItems.querySelector('p')) {
            miniCartItems.innerHTML = ''; // Remover mensaje vacío
        }

        const itemHTML = `
            <div class="mini-cart-item">
                <img src="${img}" alt="${name}">
                <div class="mini-cart-details">
                    <p>${name}</p>
                    <p>${price}</p>
                    <div class="mini-cart-controls">
                        <button class="qty-btn">-</button>
                        <span>1</span>
                        <button class="qty-btn">+</button>
                    </div>
                </div>
                <button class="remove-item">&times;</button>
            </div>
        `;
        miniCartItems.insertAdjacentHTML('beforeend', itemHTML);

        // Agregar eventos a los nuevos botones
        const newItem = miniCartItems.lastElementChild;
        addItemEvents(newItem);
        updateSubtotal();
    }

    // Agregar eventos a ítems del mini-cart
    function addItemEvents(item) {
        const qtyBtns = item.querySelectorAll('.qty-btn');
        const removeBtn = item.querySelector('.remove-item');

        qtyBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const qtySpan = this.parentElement.querySelector('span');
                let qty = parseInt(qtySpan.textContent);
                if (this.textContent === '+') {
                    qty++;
                } else if (qty > 1) {
                    qty--;
                }
                qtySpan.textContent = qty;
                updateSubtotal();
            });
        });

        removeBtn.addEventListener('click', function() {
            item.remove();
            updateSubtotal();
            updateCartCount();
            if (document.querySelectorAll('.mini-cart-item').length === 0) {
                document.querySelector('.mini-cart-items').innerHTML = '<p>Tu carrito está vacío</p>';
            }
        });
    }

    // Agregar eventos a ítems existentes en carrito.html
    document.querySelectorAll('.mini-cart-item').forEach(addItemEvents);

    // Actualizar subtotal
    function updateSubtotal() {
        let subtotal = 0;
        document.querySelectorAll('.mini-cart-item').forEach(item => {
            const price = parseFloat(item.querySelector('.mini-cart-details p:nth-child(2)').textContent.replace('$', ''));
            const qty = parseInt(item.querySelector('.mini-cart-controls span').textContent);
            subtotal += price * qty;
        });
        document.querySelector('.mini-cart-footer p:first-child').textContent = `Subtotal: $${subtotal.toFixed(2)}`;
    }

    // Actualizar contador del carrito
    function updateCartCount() {
        const count = document.querySelectorAll('.mini-cart-item').length;
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            cartCount.textContent = count;
            cartCount.style.display = count > 0 ? 'block' : 'none';
        }
    }

    // Toast de notificación
    function showToast(message) {
        const toast = document.createElement('div');
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--primary-color);
            color: white;
            padding: 1rem;
            border-radius: 6px;
            z-index: 1002;
            animation: fadeIn 0.3s ease;
        `;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    }

    // Animaciones para toast
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeOut { from { opacity: 1; transform: translateY(0); } to { opacity: 0; transform: translateY(-20px); } }
    `;
    document.head.appendChild(style);

    // Inicializar
    updateCartCount();
    updateSubtotal();
});