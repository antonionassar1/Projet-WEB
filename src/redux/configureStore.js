import {createStore, combineReducers, applyMiddleware } from 'redux';
import { createForms } from 'react-redux-form';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Items } from './items';
import { Comments } from './comments';
import { Promotions } from './promotions';
import { Leaders } from './leaders';
import { Carts } from './carts';
import { User } from './user';
import { InitialFeedback } from './forms';
import { Cart_items } from './cart_Items';
import { Orders } from './orders';
import { Order_items } from './order_Items';
import { Users } from './users';
import { add_product } from './add_item';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            items: Items,
            comments: Comments,
            promotions: Promotions,
            carts: Carts,
            leaders: Leaders,
            user: User,
            users: Users,
            cart_items: Cart_items,
            orders: Orders,
            order_items: Order_items,
            add_item:add_product,
            

            ...createForms({
                feedback: InitialFeedback
            })
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}
