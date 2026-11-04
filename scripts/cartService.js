import products from './products.js';
import { getStorage, setStorage } from './storage.js';

const CART_KEY = 'cart';

export function getCart() {
    return getStorage(CART_KEY, {});
}

function saveCart(cart) {
    setStorage(CART_KEY, cart);
}

export function addToCart(productId) {
    const id = String(productId);

    if (!products[id]) {
        console.error('Product not found:', id);
        return;
    }

    const cart = getCart();

    cart[id] = (cart[id] || 0) + 1;

    saveCart(cart);
}

export function removeFromCart(productId) {
    const cart = getCart();

    delete cart[String(productId)];

    saveCart(cart);
}

export function updateQuantity(productId, quantity) {
    const id = String(productId);
    const cart = getCart();

    if (!cart[id]) return;

    if (quantity <= 0) {
        delete cart[id];
    } else {
        cart[id] = quantity;
    }

    saveCart(cart);
}

export function getCartItems() {
    const cart = getCart();

    return Object.entries(cart)
        .map(([id, quantity]) => {
            const product = products[id];

            if (!product) return null;

            return {
                id,
                ...product,
                quantity,
                subtotal: product.price * quantity
            };
        })
        .filter(Boolean);
}

export function getCartCount() {
    const cart = getCart();

    return Object.values(cart).reduce(
        (total, quantity) => total + quantity,
        0
    );
}

export function getCartTotal() {
    return getCartItems().reduce(
        (total, item) => total + item.subtotal,
        0
    );
}

export function clearCart() {
    saveCart({});
}
