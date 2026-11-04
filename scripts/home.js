import products from './products.js';
import { addToCart, getCartCount } from './cartService.js';
import { showToast } from './toast.js';

const cards = document.querySelectorAll('.bestsellers .product-card');

function updateCartBadge() {
    const count = getCartCount();

    document.querySelectorAll('[data-cart-count]').forEach(badge => {
        badge.textContent = count;
        badge.hidden = count === 0;
    });
}

cards.forEach((card, index) => {
    const id = String(index + 1);
    const product = products[id];

    if (!product) return;

    card.dataset.id = id;

    const image = card.querySelector('.product-card__image');
    const title = card.querySelector('.product-card__title');
    const price = card.querySelector('.product-card__price');

    if (image) {
        image.src = product.image;
        image.alt = product.name;
    }

    if (title) {
        title.textContent = product.name;
    }

    if (price) {
        price.textContent = `$${product.price.toFixed(2)}`;
    }

    card.addEventListener('click', event => {
        const button = event.target.closest('.product-card__button');

        if (button) {
            event.preventDefault();
            event.stopPropagation();

            addToCart(id);

            updateCartBadge();

            showToast(`${product.name} added to cart`);

            return;
        }

        window.location.href = `product.html?id=${id}`;
    });
});

updateCartBadge();
