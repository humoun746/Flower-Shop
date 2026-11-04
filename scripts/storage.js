export function getStorage(key, defaultValue = null) {
    try {
        const data = localStorage.getItem(key);

        return data ? JSON.parse(data) : defaultValue;

    } catch (error) {
        console.error(`Error reading ${key}:`, error);

        return defaultValue;
    }
}

export function setStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));

    } catch (error) {
        console.error(`Error saving ${key}:`, error);
    }
}

export function removeStorage(key) {
    localStorage.removeItem(key);
}
