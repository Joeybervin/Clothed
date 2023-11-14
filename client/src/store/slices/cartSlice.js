import { createSlice } from '@reduxjs/toolkit';

/* if I found data in my local storage */
const persistedState = localStorage.getItem('persist:root');



const initialState = persistedState ? JSON.parse(persistedState) : [];

const cartSlice = createSlice({
    name : "cart",
    initialState,
    reducers : {
        addToCart(state, action) {

            const productToAdd = action.payload
            const alreadyInTheCart = state.find(product => product.ref === productToAdd.ref)

            if (alreadyInTheCart !== undefined) {
                state.map( product => {

                    if(product.ref === productToAdd.ref ) {
                        product.quantity += 1
                    }
                    return product
                })
            }
            else {
                state.push(action.payload)
            }
            
        },
        removeFromCart(state, action) {
            state.splice(action.payload, 1)
        },
        clearCart(state) {
            state.splice(0, state.length)
        },
        updateCart(state, action) {
            const index = action.payload.index;
            const event = action.payload.event;
            const productQuantity = action.payload.productQuantity;

            if (event === "plus") {
                state[index].quantity += 1
            }
            else if (productQuantity === 1) {
                state.splice(index, 1)
            }
            else {
                state[index].quantity -= 1
                
            }
        },
    }
})

export const {addToCart, removeFromCart, clearCart, updateCart} = cartSlice.actions;

export default cartSlice.reducer