document.addEventListener('DOMContentLoaded', () => {
    function addToCart(title, price, quantity, imageUrl) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItem = cart.find(item => item.title === title);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ title, price: parseFloat(price), quantity: quantity, imageUrl: imageUrl });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
            
        }
    }

    const addToCartButtons = document.querySelectorAll('.button');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const row = e.target.closest('tr');
            const title = row.querySelector('td:nth-child(2)').textContent.trim();
            const price = row.querySelector('td:nth-child(3)').textContent.replace('₹', '').replace(' INR', '').trim();
            const quantity = parseInt(row.querySelector('.quantity-input').value);
            const imageUrl = row.querySelector('img').src;

            addToCart(title, price, quantity, imageUrl);
        });
    });

    updateCartCount();
});
