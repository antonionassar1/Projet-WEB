import { ORDERS } from '../shared/orders';
import {ITEMS} from '../shared/items';
import * as ActionTypes from './ActionTypes';

export const Orders = (state = ORDERS, action) => {
    switch (action.type) {

        case ActionTypes.CHECKOUT:
            var order_item = action.payload;
            var add_order ={
                id_order: 0,
                id_user: 0,
                date_ordered:"2022-10-16T17:57:28.556094Z",
                address_destination: "Beirut",
                status: "To be Delivered",
                total_price: 0
            }
            var today = new Date();
            var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            add_order.id_order=state.length;
            add_order.date_ordered=date;
            var price_total=0;
            for (let i = 0; i < action.payload.length; ++i) {
                var price=0
                for (let j=0 ; j < ITEMS.length;++j){
                    if (ITEMS[j].id==order_item[i].id_item){
                        
                        price+=order_item[i].quantity*ITEMS[j].price
                    }
                 
                }
                // console.log(price_total);
                price_total+=price;
            }
            add_order.total_price=price_total
            state.push(add_order);
            console.log("order is now");
            console.log(state);

        default:
          return state;
      }
};