import { createSelector } from '@reduxjs/toolkit';

const cartItemsSelector = (state) => state.cart.cartItems; // đi từ root

//count number of products in cart
export const cartItemsCountSelector = createSelector(
    cartItemsSelector, //phụ thuộc khi cái này thay đổi
    (cartItems) =>
        cartItems.reduce(function (count, item) {
            return count + item.quantity;
        }, 0)
);

//caculator total of cart
export const cartItemsTotalSelector = createSelector(
    cartItemsSelector, //phụ thuộc khi cái này thay đổi
    (cartItems) =>
        cartItems.reduce(function (total, item) {
            return total + item.product.salePrice * item.quantity;
        }, 0)
);
