import { getCartItems, getCartCount, getCartTotal, updateQuantity, removeFromCart, clearCart } from './cartService.js';
import { showToast } from './toast.js';

const itemsContainer = document.querySelector('.cart__items');
const emptyCart = document.querySelector('.empty-cart');
const filledCart = document.querySelector('.cart');
const checkoutPrice = document.querySelector('.checkout__price');
const checkoutButton = document.querySelector('.checkout__button');

function updateCartBadge() {
    const count = getCartCount();

    document.querySelectorAll('[data-cart-count]').forEach(badge => {
        badge.textContent = count;
        badge.hidden = count === 0;
    });
}

function renderCart() {
    if (!itemsContainer || !emptyCart || !filledCart) return;

    const items = getCartItems();

    itemsContainer.innerHTML = '';

    if (items.length === 0) {
        emptyCart.hidden = false;
        filledCart.hidden = true;

        if (checkoutPrice) {
            checkoutPrice.textContent = '$0.00';
        }

        updateCartBadge();

        return;
    }

    emptyCart.hidden = true;
    filledCart.hidden = false;


    items.forEach(item => {
        const article = document.createElement('article');

        article.className = 'item';
        article.dataset.id = item.id;

        article.innerHTML = `
            <img
                class="item__image"
                src="${item.image}"
                alt="${item.name}"
            >

            <div class="item__info">

                <div class="item__top">
                    <h3 class="item__name">
                        ${item.name}
                    </h3>

                    <button
                        class="item__delete-button"
                        type="button"
                        data-action="delete"
                        aria-label="Remove ${item.name}"
                    >
                        <img src="./images/trash.svg" alt="">
                    </button>
                </div>

                <span class="item__price">
                    $${item.price.toFixed(2)} / each
                </span>

                <div class="item__bottom">

                    <div class="quantity-counter">

                        <button
                            class="quantity-counter__subtract-button"
                            type="button"
                            data-action="subtract"
                            aria-label="Decrease quantity"
                        >−</button>

                        <span class="quantity-counter__num">
                            ${item.quantity}
                        </span>

                        <button
                            class="quantity-counter__add-button"
                            type="button"
                            data-action="add"
                            aria-label="Increase quantity"
                        >+</button>

                    </div>

                    <span class="item__subtotal">
                        $${item.subtotal.toFixed(2)}
                    </span>

                </div>

            </div>
        `;

        itemsContainer.append(article);
    });

    if (checkoutPrice) {
        checkoutPrice.textContent = `Total: $${getCartTotal().toFixed(2)}`;
    }

    updateCartBadge();
}

if (itemsContainer) {
    itemsContainer.addEventListener('click', event => {
        const button = event.target.closest('button[data-action]');

        if (!button) return;

        const item = button.closest('.item');

        if (!item) return;

        const id = item.dataset.id;
        const action = button.dataset.action;

        const currentItem = getCartItems().find(
            product => product.id === id
        );

        if (!currentItem) return;

        if (action === 'add') {
            updateQuantity(id, currentItem.quantity + 1);
        }

        if (action === 'subtract') {
            updateQuantity(id, currentItem.quantity - 1);
        }

        if (action === 'delete') {
            removeFromCart(id);

            showToast(`${currentItem.name} removed from cart`);
        }

        renderCart();
    });
}

if (checkoutButton) {
    checkoutButton.addEventListener('click', () => {
        const items = getCartItems();

        if (items.length === 0) return;

        showToast('Thank you! Your order has been placed.');

        clearCart();

        renderCart();
    });
}

renderCart();
