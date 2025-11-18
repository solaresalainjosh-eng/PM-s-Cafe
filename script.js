document.addEventListener("DOMContentLoaded", () => {
  // === FADE-UP INTERSECTION OBSERVER ===
  const fadeElements = document.querySelectorAll(".fade-up");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  }, { threshold: 0.2 });

  fadeElements.forEach(el => observer.observe(el));
});

// ======= CART FUNCTIONALITY =======
const cart = [];
const cartPanel = document.getElementById('cart-panel');
const cartItemsContainer = document.getElementById('cart-items');
const totalPriceEl = document.getElementById('total-price');
const checkoutBtn = document.getElementById('checkout-btn');

// ===== ADD TO CART =====
const addToCartButtons = document.querySelectorAll('.product-card button');

addToCartButtons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const card = e.target.closest('.product-card');
    const name = card.querySelector('h3').textContent;
    const priceText = card.querySelector('p').textContent;
    const sizeSelect = card.querySelector('.size-select');
    const size = sizeSelect.value;
    const imgSrc = card.querySelector('img').src; // <-- get product image

    // Determine price based on size
    let price = 0;

    if (size === 'solo') {
      const match = priceText.match(/Solo:\s*₱(\d+)/);
      if (match) price = parseInt(match[1]);
    } else if (size === 'grande') {
      const match = priceText.match(/Grande:\s*₱(\d+)/);
      if (match) price = parseInt(match[1]);
    } else if (size === 'small') {
      const match = priceText.match(/₱(\d+)\s*\/\s*₱(\d+)\s*\/\s*₱(\d+)/);
      if (match) price = parseInt(match[1]);
    } else if (size === 'medium') {
      const match = priceText.match(/₱(\d+)\s*\/\s*₱(\d+)\s*\/\s*₱(\d+)/);
      if (match) price = parseInt(match[2]);
    } else if (size === 'large') {
      const match = priceText.match(/₱(\d+)\s*\/\s*₱(\d+)\s*\/\s*₱(\d+)/);
      if (match) price = parseInt(match[3]);
    }

    // Add item to cart including image
    cart.push({ name, size, price, image: imgSrc });
    renderCart();
  });
});

// ===== RENDER CART =====
function renderCart() {
  cartItemsContainer.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-img">
      <span>${item.name} (${item.size})</span>
      <span>₱${item.price}</span>
      <button class="remove-btn" data-index="${index}">Remove</button>
    `;
    cartItemsContainer.appendChild(cartItem);
    total += item.price;
  });

  totalPriceEl.textContent = total;

  // Remove button
  const removeBtns = document.querySelectorAll('.remove-btn');
  removeBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const index = e.target.dataset.index;
      cart.splice(index, 1);
      renderCart();
    });
  });
}

// ===== CHECKOUT =====
checkoutBtn.addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Your cart is empty!');
  } else {
    alert('Thank you for your order!\nTotal: ₱' + totalPriceEl.textContent);
    cart.length = 0;
    renderCart();
  }
});
