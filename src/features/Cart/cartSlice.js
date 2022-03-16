import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        showMiniCart: false,
        cartItems: [],
    },
    reducers: {
        showMiniCart(state, action) {
            return (state.showMiniCart = true);
        },
        hideMiniCart(state, action) {
            return (state.showMiniCart = false);
        },
        addToCart(state, action) {
            const newItem = action.payload;
            //check if product is availabel in cart
            const index = state.cartItems.findIndex((x) => x.id === newItem.id);
            if (index >= 0) {
                state.cartItems[index].quantity += newItem.quantity;
            } else {
                state.cartItems.push(newItem);
            }
        },
        setQuantity(state, action) {
            const { id, quantity } = action.payload;
            //check if product is availabel in cart
            const index = state.cartItems.findIndex((x) => x.id === id);
            if (index >= 0) {
                state.cartItems[index].quantity = quantity;
            }
        },
        removeFromCart(state, action) {
            const idNeedToRemove = action.payload;
            return state.cartItems.filter((item) => item.id !== idNeedToRemove);
        },
    },
});

const { actions, reducer } = cartSlice;

export const { showMiniCart, hideMiniCart, addToCart, setQuantity, removeFromCart } = actions; //name export
export default reducer; //default export