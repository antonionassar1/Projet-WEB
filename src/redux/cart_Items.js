import { CART_ITEMS } from '../shared/cart_Items';
import * as ActionTypes from './ActionTypes';

export const Cart_items = (state = CART_ITEMS, action) => {
    switch (action.type) {
        case ActionTypes.ADD_TO_CART:
            var cart_item = action.payload.cart_item;
            for (let i = 0; i < state.length; ++i) {
                if (state[i].id_item == cart_item.id_item && state[i].id_cart == cart_item.id_cart) {
                    state[i].quantity += 1;
                    action.payload.cart.total_qty += 1
                    alert("Item successfully added to cart!")
                    return state;
                }
            }

            cart_item.id_cartItem = state.length;
            cart_item.quantity = 1;
            console.log("Cart_item: ", cart_item);
            action.payload.cart.total_qty += 1
            alert("Item successfully added to cart!")
            return state.concat(cart_item);

        case ActionTypes.REMOVE_ALL_FROM_CART:
            let id_toRemove = action.payload.id_cartItem;
            let cart = action.payload.cart;
            let qty_to_rv = 0;
            qty_to_rv = state.filter(elt => elt.id_cartItem == id_toRemove)[0].quantity;
            cart.total_qty -= qty_to_rv;
            return state.filter(elt => elt.id_cartItem != id_toRemove);

        case ActionTypes.REMOVE_1_FROM_CART:
            let cart_item1 = action.payload.cart_item;
            let cart1 = action.payload.cart;
            for (let i = 0; i < state.length; ++i) {
                if (state[i].id_item == cart_item1.id_item && state[i].id_cart == cart_item1.id_cart) {
                    state[i].quantity -= 1
                    cart1.total_qty -= 1
                    alert("Successfully removed 1 from cart!")
                    if (state[i].quantity == 0) {
                        return state.filter(elt => elt.id_item != cart_item1.id_item || elt.id_cart != cart_item1.id_cart);
                    }
                    return state;
                }
            }

        default:
            return state;
    }
};