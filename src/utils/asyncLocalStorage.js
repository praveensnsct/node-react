export const asyncLocalStorage = {
    setItem: async function (key, value) {
        await null;
        return localStorage.setItem(key, value);
    },
    getItem: function (key) {
        return localStorage.getItem(key);
    }
};