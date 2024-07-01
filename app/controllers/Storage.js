const message = 'no se pudo realizar la accion';

export const getStore = (key, store = localStorage,) =>
    store.getItem(key) ?? message
export const setStore = (key,value, store = localStorage,) =>
    store.setItem(key,value)
export const delStore = (key, store = localStorage,) =>
    store.removeItem(key) ?? message