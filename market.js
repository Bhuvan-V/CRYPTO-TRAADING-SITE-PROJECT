
// Cart functionality
const cart = [];

// Sample crypto data
const cryptoData = {
    "BTC": { name: "Bitcoin", priceUsd: 50000, priceInr: 4150000, image: "bitcoin.png" },
    "ETH": { name: "Ethereum", priceUsd: 3000, priceInr: 249000, image: "etherium.png" },
    "BNB": { name: "Binance Coin", priceUsd: 400, priceInr: 33200, image: "bnb.png" },
    "XRP": { name: "Ripple", priceUsd: 0.5, priceInr: 41.5, image: "bnb.png" },
    "USDT": { name: "Tether", priceUsd: 1, priceInr: 83, image: "tether.png" },
    "SOL": { name: "Solana", priceUsd: 100, priceInr: 8300, image: "solana.png" }
};

// Add to cart functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const card = this.closest('.card');
        const coinId = card.getAttribute('data-coin');
        const coinData = cryptoData[coinId];
        
        // Check if item already in cart
        const existingItem = cart.find(item => item.id === coinId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: coinId,
                name: coinData.name,
                price: coinData.priceUsd,
                image: coinData.image,
                quantity: 1
            });
        }
        
        // Update cart button
        updateCartButton();
        
        // Show feedback
        showFeedback(`${coinData.name} added to cart!`);
    });
});

// Update cart button with item count
function updateCartButton() {
    const cartButton = document.querySelector('.animated-button .text');
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    
    cartButton.textContent = itemCount > 0 ? `CART (${itemCount})` : 'CART';
}

// Show feedback message
function showFeedback(message) {
    // Remove existing feedback if any
    const existingFeedback = document.querySelector('.feedback');
    if (existingFeedback) {
        existingFeedback.remove();
    }
    
    const feedback = document.createElement('div');
    feedback.className = 'feedback';
    feedback.textContent = message;
    document.body.appendChild(feedback);
    
    // Remove after animation
    setTimeout(() => {
        feedback.remove();
    }, 3000);
}

// View cart functionality
document.querySelector('.animated-button').addEventListener('click', function() {
    showCartModal();
});

// Show cart modal
function showCartModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    const title = document.createElement('h2');
    title.className = 'modal-title';
    title.textContent = 'Your Shopping Cart';
    modalContent.appendChild(title);
    
    if (cart.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.className = 'empty-cart';
        emptyMessage.textContent = 'Your cart is empty.';
        modalContent.appendChild(emptyMessage);
    } else {
        // Add cart items
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            
            const itemImage = document.createElement('img');
            itemImage.src = item.image;
            itemImage.alt = item.name;
            itemImage.style.width = '40px';
            itemImage.style.height = '40px';
            itemImage.style.marginRight = '10px';
            
            const itemName = document.createElement('span');
            itemName.className = 'cart-item-name';
            itemName.textContent = `${item.name} (${item.id})`;
            
            const itemQuantity = document.createElement('span');
            itemQuantity.style.color = 'gold';
            itemQuantity.textContent = `× ${item.quantity}`;
            
            const itemPrice = document.createElement('span');
            itemPrice.className = 'cart-item-price';
            itemPrice.textContent = `$${(item.price * item.quantity).toFixed(2)}`;
            
            itemElement.appendChild(itemImage);
            itemElement.appendChild(itemName);
            itemElement.appendChild(itemQuantity);
            itemElement.appendChild(itemPrice);
            
            modalContent.appendChild(itemElement);
        });
        
        // Calculate total
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const totalElement = document.createElement('div');
        totalElement.className = 'cart-total';
        totalElement.textContent = `Total: $${total.toFixed(2)}`;
        modalContent.appendChild(totalElement);
        
        // Add buttons
        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'modal-buttons';
        
        const checkoutBtn = document.createElement('button');
        checkoutBtn.className = 'modal-btn checkout-btn';
        checkoutBtn.textContent = 'Checkout';
        checkoutBtn.addEventListener('click', () => {
            showFeedback('Checkout Successful!!')
        });
        
        const closeBtn = document.createElement('button');
        closeBtn.className = 'modal-btn close-btn';
        closeBtn.textContent = 'Close';
        closeBtn.addEventListener('click', () => {
            modal.remove();
        });
        
        buttonsContainer.appendChild(checkoutBtn);
        buttonsContainer.appendChild(closeBtn);
        modalContent.appendChild(buttonsContainer);
    }
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    updateCartButton();
});