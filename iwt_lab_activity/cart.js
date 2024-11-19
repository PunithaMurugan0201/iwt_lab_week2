document.addEventListener('DOMContentLoaded', () => {
    function displayCart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartTableBody = document.getElementById('cart-items');
        const totalPriceElement = document.getElementById('total-price');

        let total = 0;
        cartTableBody.innerHTML = '';

        cart.forEach((item, index) => {
            const row = document.createElement('tr');

            // Image Cell
            const imageCell = document.createElement('td');
            const image = document.createElement('img');
            image.src = item.imageUrl;
            image.alt = item.title;
            image.style.width = '100px'; // Adjust the width as needed
            imageCell.appendChild(image);
            row.appendChild(imageCell);

            // Book Name Cell
            const bookNameCell = document.createElement('td');
            bookNameCell.textContent = item.title;
            row.appendChild(bookNameCell);

            // Price Cell
            const priceCell = document.createElement('td');
            priceCell.textContent = `₹${item.price.toFixed(2)}`;
            row.appendChild(priceCell);

            // Quantity Cell
            const quantityCell = document.createElement('td');
            quantityCell.textContent = item.quantity;
            row.appendChild(quantityCell);

            // Amount Cell
            const amountCell = document.createElement('td');
            const amount = item.price * item.quantity;
            amountCell.textContent = `₹${amount.toFixed(2)}`;
            row.appendChild(amountCell);

            // Action Cell
            const actionCell = document.createElement('td');
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.className = 'remove-button';
            removeButton.addEventListener('click', () => {
                removeFromCart(index);
            });
            actionCell.appendChild(removeButton);
            row.appendChild(actionCell);

            cartTableBody.appendChild(row);

            total += amount;
        });

        totalPriceElement.textContent = total.toFixed(2);
    }

    function removeFromCart(index) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    }

    displayCart();
});
