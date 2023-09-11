import { ORDER_ITEMS } from '../shared/order_Items';
import * as ActionTypes from './ActionTypes';
import {remove_all_from_cart}  from './ActionCreators';
import { ORDERS } from '../shared/orders';
import { ITEMS } from '../shared/items';

export const Order_items = (state = ORDER_ITEMS, action) => {

    console.log("inside ORDER_ITEMS:" + action.type);
    
    switch (action.type) {

        case ActionTypes.CHECKOUT:
            alert("Items in your cart are successfully ordered ");
            
            //debugger;
            var order_item = action.payload;

            var order_num = ORDERS.length
            
            for (let i = 0; i < order_item.length; ++i) {
                var to_be_added = {
                    id_orderItem: 0,
                    id_order: 0,
                    id_item: 0,
                    quantity: 0,
                    total_price:0
                }
                to_be_added.id_orderItem=state.length
                to_be_added.id_order=order_num-1
                to_be_added.id_item=order_item[i].id_item
                to_be_added.quantity=order_item[i].quantity
                var price_total=0
                for (let j=0 ; j < ITEMS.length;++j){
                    if (ITEMS[j].id==order_item[i].id_item){
                        // alert("In if ");
                        price_total+=order_item[i].quantity*ITEMS[j].price
                    }
                    // alert("out if ");
                }
                to_be_added.total_price=price_total;

                state.push(to_be_added);
               
                console.log("order_items is now");
                console.log(state);

           }

            return state;

        
        default:
          return state;
      }
};