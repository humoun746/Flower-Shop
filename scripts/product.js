import products from './products.js';
import { addToCart, getCartCount } from './cartService.js';
import { showToast } from './toast.js';

const params = new URLSearchParams(window.location.search);

const productId = params.get('id');
const product = products[productId];

const nameElement = document.querySelector('.product__name');
const descElement = document.querySelector('.product__desc');
const priceElement = document.querySelector('.product__price');
const imageElement = document.querySelector('.product__image');

const ratingElement = document.querySelector('.rating__value');
const reviewsElement = document.querySelector('.product__reviews-num');

const addButton = document.querySelector('.product__button');

function updateCartBadge() {
    const count = getCartCount();

    document.querySelectorAll('[data-cart-count]').forEach(badge => {
        badge.textContent = count;
        badge.hidden = count === 0;
    });
}

if (!product) {
    const content = document.querySelector('.product__content');

    if (content) {
        content.innerHTML = '<p class="product__error">Product not found.</p>';
    }

} else {
    if (nameElement) {
        nameElement.textContent = product.name;
    }

    if (descElement) {
        descElement.textContent = product.desc;
    }

    if (priceElement) {
        priceElement.textContent = `$${product.price.toFixed(2)} / each`;
    }

    if (imageElement) {
        imageElement.src = product.image;
        imageElement.alt = product.name;
    }

    if (ratingElement) {
        ratingElement.textContent = product.rating;
    }

    if (reviewsElement) {
        reviewsElement.textContent = `(${product.reviewsNum} people opinion)`;
    }

    if (addButton) {
        addButton.addEventListener('click', () => {
            addToCart(productId);

            updateCartBadge();

            showToast(`${product.name} added to cart`);
        });
    }
}

updateCartBadge();
