// Get item from local storage
export function retrieveFromStorage (key) {
    const item = localStorage.getItem(key);

    if (item === null) {
        return [];
    } else {
        return JSON.parse(item);
    }
}

// Saving to local storage
export function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// removing item from local storage
export function removeItem(key) {
    window.localStorage.removeItem(key);
}
