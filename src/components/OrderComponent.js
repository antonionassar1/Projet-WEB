import React, { Component, useState } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { ITEMS } from '../shared/items'
import { connect } from 'react-redux';
import { Loading } from './LoadingComponent';

function RenderOrderItem({ item_in_order, item, status_order}) {

    return (
        <div className="row product">
            <div className="col-md-2">
                <img src={item.image} alt={item.name} height="100" />
            </div>
            <div className="col-md-4 product-detail">
                <h5>{item.name} (x{item_in_order.quantity}) </h5>
               
                { item_in_order.quantity * item.price + 'L.L'}
            </div>
            <div className="col-md-4 product-detail">
            
            <h5>Date Ordered :</h5>
            { status_order.date_ordered.substring(0,10) }
           </div>
           <div>
            <h5>Order Status :  </h5>
            {  status_order.status +"\n" } 
           
            </div>

        </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user,
        cart_items: state.cart_items,
        order_items: state.order_items
    }
}

class MyOrders extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        
        if (this.props.items.isLoading) {
            return (
                <Loading />
            );

        } else if (this.props.items.errMess) {
            return (
                <h4>{this.props.items.errMess}</h4>
            );
        }
        else {
            const ITEMS = this.props.items.items
            const ORDERS = this.props.orders
            for (let i=0;i<ORDERS.length;++i){
                console.log(" orderssss")
                console.log(ORDERS[i])
            }
            const order= this.props.order_items
            //&& order[i].total_price!=0
            const items_ordered=[]
            for (let i=0;i<order.length;++i){
                for (let j=0;j<ITEMS.length;++j){
                    if (order[i].id_item ===ITEMS[j].id ){
                        items_ordered.push(ITEMS[j])
                    }

                }
            }
            // items_ordered.pop();
             const order_items_user_final = order.map(
                 (order_item) => {
                     return (
                         {
                             item_in_order: order_item,
                             item: items_ordered.filter((item) => item.id === order_item.id_item)[0],
                             status_order:ORDERS.filter((order)=> order.id_order === order_item.id_order)[0]
                         }
                     );
                 });
                //  console.log("order_items_final length")
                //  console.log(order_items_user_final[1])
            
                 for (let i=0;i<order_items_user_final.length;++i){
                    console.log("items detail order")
                    console.log(order_items_user_final[i])
                }
                 const render_ordered_items = order_items_user_final.map((order_item) => {
                    return (
                        <div key={order_item.item.id} className="col-12">
                            <RenderOrderItem item_in_order= {order_item.item_in_order} item={order_item.item} status_order={order_item.status_order}  />
                        </div>
                    )
                })
         

            if (items_ordered.length == 0) {
                return (
                    <div className="container">
                        <div className="row">
                            <div className="col-12">

                                <h3>No Order has been placed yet</h3>
                                <hr />

                                <Link to={`/menu`} >
                                    <Button data-v-cea7ffda="" id="go" class="has-background-blue" color='black'>Go Shop
                                        <span className="fa fa-shopping-cart fa-lg" ></span>
                                    </Button>
                                </Link>

                                <hr />
                            </div>
                        </div>
                    </div>
                );
            }
            else {
                  
                return (
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <h3>My Orders               
                                

                                </h3>
                                
                                <hr />
                                <div>



                                {render_ordered_items}
                        </div>
                        </div>
                        </div>

                    </div>
                );
            }
        }
    }
}

export default connect(mapStateToProps)(MyOrders);