import { createSlice } from '@reduxjs/toolkit';

/* if I found data in my local storage */
const persistedState = localStorage.getItem('persist:root');



const initialState = persistedState ? JSON.parse(persistedState) : [];

const cartSlice = createSlice({
    name : "cart",
    initialState,
    reducers : {
        addToCart() {},
        removeFromCart() {},
        clearCart() {},
        updateCart() {},
    }
})

export const {addToCart, removeFromCart, clearCart, updateCart} = cartSlice.actions;

export default cartSlice.reducer