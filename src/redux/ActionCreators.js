import * as ActionTypes from './ActionTypes';
import { ITEMS } from '../shared/items';

export const addComment = (itemId, rating, author, comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        itemId: itemId,
        rating: rating,
        author: author,
        comment: comment
    }
});

export const fetchItems = () => (dispatch) => {

    dispatch(itemsLoading(true));

    setTimeout(() => {
        dispatch(addItems(ITEMS));
    }, 2000);
}

export const itemsLoading = () => ({
    type: ActionTypes.ITEMS_LOADING
});

export const itemsFailed = (errmess) => ({
    type: ActionTypes.ITEMS_FAILED,
    payload: errmess
});

export const addItems = (items) => ({
    type: ActionTypes.ADD_ITEMS,
    payload: items
});


export const addItem = (item_name,categ,path ,price) => ({
    type: ActionTypes.ADD_ITEM,
    payload:{
        item_name:item_name,
        categ:categ,
        path:path,
        price:price,

    }
});

export const add_to_cart = (id_item, cart) => ({
    type: ActionTypes.ADD_TO_CART,
    payload: {
        cart: cart,
        cart_item: {
            id_item: id_item,
            id_cart: cart.id_cart
        }
    }
});

export const checkout = (cart) => ({
    type: ActionTypes.CHECKOUT,
    payload: cart
        // cart_item: {
        //     id_item: id_item,
        //     id_cart: cart.id_cart
        // }
    
});

export const searchItem = text => dispatch => {
    dispatch({
        type: ActionTypes.SEARCH_ITEM,
        payload: text

    })

};


export const fetchItem = item => dispatch => {

    dispatch({
        type: ActionTypes.FETCH_ITEM,
        payload: item
    })
};

export const remove_all_from_cart = (id_cartItem, cart) => ({
    type: ActionTypes.REMOVE_ALL_FROM_CART,
    payload: {
        id_cartItem: id_cartItem,
        cart: cart
    }
});

export const remove_1_from_cart = (id_item, cart) => ({
    type: ActionTypes.REMOVE_1_FROM_CART,
    payload: {
        cart: cart,
        cart_item: {
            id_item: id_item,
            id_cart: cart.id_cart
        }
    }
    // payload: {
    //     id_cartItem: id_cartItem,
    //     cart: cart
    // }
});