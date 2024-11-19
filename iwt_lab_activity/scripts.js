function addToCart(title, price, quantity) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => item.title === title);
    if (itemIndex > -1) {
        cart[itemIndex].quantity = parseInt(cart[itemIndex].quantity) + parseInt(quantity);
    } else {
        cart.push({ title, price, quantity });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = 'cart.html';
}

function loadCart() {
    const cartItems = document.getElementById('cartItems');
    const totalPrice = document.getElementById('totalPrice');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;

    cartItems.innerHTML = '';
    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<img src="path/to/image" alt="${item.title}" style="width:50px;height:50px;"> ${item.title} - ₹${item.price} x ${item.quantity} <button onclick="removeFromCart('${item.title}')">Remove</button>`;
        cartItems.appendChild(li);
        total += item.price * item.quantity;
    });

    totalPrice.textContent = total.toFixed(2);
}

function removeFromCart(title) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.title !== title);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

function clearCart() {
    localStorage.removeItem('cart');
    loadCart();
}

window.onload = function() {
    if (document.getElementById('cartItems')) {
        loadCart();
    }
};
