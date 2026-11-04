export function showToast(message) {
    let container = document.querySelector('.toast-container');

    if (!container) {
        container = document.createElement('div');

        container.className = 'toast-container';
        container.setAttribute('aria-live', 'polite');

        document.body.append(container);
    }

    const toast = document.createElement('div');

    toast.className = 'toast';
    toast.textContent = message;

    container.append(toast);

    requestAnimationFrame(() => {
        toast.classList.add('toast--visible');
    });

    setTimeout(() => {
        toast.classList.remove('toast--visible');
        toast.classList.add('toast--hide');

        setTimeout(() => {
            toast.remove();
        }, 300);

    }, 2000);
}
