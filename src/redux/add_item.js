
import * as ActionTypes from './ActionTypes';
import { ITEMS } from '../shared/items';
import { CATEGORIES } from '../shared/categories';

export const add_product = (state = ITEMS, action) => {
    
    switch (action.type) {

        case ActionTypes.ADD_ITEM:
            console.log("Item ADDED ");

            var item_name=action.payload.item_name;
            var category=action.payload.categ;
            var path= action.payload.path;
            var price=action.payload.price;

            var id=ITEMS.length;

            let will_be_added = {
                id: 0,
                name:'',
                image: '',
                id_category: 0,
                label:'',
                price: 0,
                description:'',
                featured: true
                }

            will_be_added.id=id;
            will_be_added.name=item_name;
            will_be_added.image=path;
            will_be_added.price=price;
            for (let i =0 ; i<CATEGORIES.length;++i){
                if (CATEGORIES[i].name==category){
                    will_be_added.id_category=CATEGORIES[i].id_category
                }
            }

            
            state.push(will_be_added);
            console.log(state);

            return state;

        
        default:
          return state;
      }
};