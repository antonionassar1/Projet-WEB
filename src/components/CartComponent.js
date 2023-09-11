import React, { Component, useState } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { CARTS } from '../shared/carts'
import { ITEMS } from '../shared/items'
import { CART_ITEMS } from '../shared/cart_Items'
import { connect } from 'react-redux';
import { Loading } from './LoadingComponent';
//import { checkout } from '../redux/ActionCreators';

// function useForceUpdate(){
//     const [value, setValue] = useState(0); // integer state
//     return () => setValue(value => value + 1); // update the state to force render
// }

function RenderCartItem({parentCallback, item_in_cart, item, remove_all, cart, add_to_cart, remove_1_from_cart }) {
    // const forceUpdate = useForceUpdate();

    return (
        <div className="row product">
            <div className="col-md-2">
                <img src={item.image} alt={item.name} height="100" />
            </div>
            <div className="col-md-4 product-detail">
                <h5>{item.name} (x{item_in_cart.quantity})  </h5>
                {item_in_cart.quantity * item.price + 'L.L'}
            </div>
            <div className="col-md-3 product-detail">
                <div className="row">
                    <Button data-v-cea7ffda="" id="minus" color='warning' onClick={() => {remove_1_from_cart(item.id, cart); parentCallback();}}>
                        -
                    </Button>
                    <Label>{item_in_cart.quantity}</Label>
                    <Button data-v-cea7ffda="" id="plus" color='warning' onClick={() => {add_to_cart(item.id, cart); parentCallback();}}>
                        +
                    </Button>
                </div>
            </div>
            <div>
                <Button data-v-cea7ffda="" id="rv" class="col-md-2" color='black' onClick={() => {remove_all(item_in_cart.id_cartItem, cart); parentCallback();}} >
                    Remove from cart
                    <span className="fa fa-shopping-cart fa-lg" ></span>
                </Button>
            </div>
            {/* <div className="col-md-2 cart-product-count">
                <h5>{item.quantity}</h5>
            </div> */}

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

class Cart extends Component {
    constructor(props) {
        super(props);
        console.log("props");
        console.log(props);

    }

    callback = () => {
        console.log("in callback");
        this.forceUpdate();
        this.props.parentCallback();
    }
    remove_after_checkout = (cart_items,cart)=>{
        for (let i=0;i<cart_items.length;++i){
            this.props.remove_all_from_cart(cart_items[i].id_cartItem,cart);
        }
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
            const cart_items_user = this.props.cart_items.filter((cart_item) => cart_item.id_cart === this.props.cart.id_cart)
            const cart_items_user_final = cart_items_user.map(
                (cart_item) => {
                    return (
                        {
                            item_in_cart: cart_item,
                            item: (ITEMS.filter((item) => item.id === cart_item.id_item))[0]
                        }
                    );
                });
            

            const render_cart_items = cart_items_user_final.map((cart_item) => {
                
                const add_1 = (itemId, cart) => {console.log("add1");this.props.add_to_cart(itemId, cart); this.forceUpdate();}
                const remove_1 = (itemId, cart) => {this.props.remove_1_from_cart(itemId, cart); this.forceUpdate();}
                return (
                    <div key={cart_item.item.id} className="col-12">
                        <RenderCartItem parentCallback={this.callback} item_in_cart= {cart_item.item_in_cart} item={cart_item.item} remove_all={this.props.remove_all_from_cart} cart={this.props.cart} add_to_cart={add_1} remove_1_from_cart={remove_1}/>
                    </div>
                )
            })


            if (this.props.cart.total_qty == 0) {
                return (
                    <div className="container">
                        <div className="row">
                            <div className="col-12">

                                <h3>Your Cart is Empty !</h3>
                                <hr />

                                <Link to={`/menu`} >
                                    {/* <button data-v-cea7ffda="" id="go" class="has-background-blue" >Start Shopping  
                             <span className="fa fa-shopping-cart fa-lg" ></span>
                             </button> */}
                                    <Button data-v-cea7ffda="" id="go" class="has-background-blue" color='black'>Start Shopping
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
                // const checkout = (cart) => {
                //     console.log("checkout before return"); 
                //     console.log(cart);
                //     this.forceUpdate();
                // }
                let total=0;
                for (let i=0;i<cart_items_user.length;++i){
                    total+=cart_items_user[i].quantity*ITEMS[cart_items_user[i].id_item].price;
                }

                let sub_tot=0;
                for (let i=0;i<cart_items_user.length;++i){
                    sub_tot+=1
                }

                
                return (
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                {/* <h1> {this.props.items.items[0]}</h1> */}
                                <h3>My Cart               
                                

                                </h3>
                                
                                <hr />
                                <div>



                                {render_cart_items}
                                <div class="border border-dinputBorder px-6 py-4 rounded">
                                <h1 class=" font-semibold text-xl text-dblack mb-4">Order Summary</h1>
                                <div class="flex justify-between items-center text-dgrey1 font-light mt-1">
                                <div class="flex items-center justify-between mb-1 text-dblack">
                                            <span> Total:   {this.props.cart.total_qty} Item(s)</span>
                                            </div>
                                    </div>
                                    <p>Sub-Total: {sub_tot} Item(s)</p>
                                    
                                    <h2 class="mt-4 mb-2 font-semibold text-lg">Order Totals</h2>
                                    <div>

                                            <div class="flex items-center justify-between mb-1 text-dblack">
                                                <span>Total </span><span>{total} L.L</span>
                                                </div>
                                                <Button data-v-cea7ffda="" id="go" class="has-background-blue" color='black'  onClick={() => {this.props.checkout(this.props.cart_items);this.remove_after_checkout(this.props.cart_items,this.props.cart);this.callback();}}>Check Out
                                                    <span className="fa fa-shopping-cart fa-lg" ></span>
                                                </Button>
                                                </div>
                                                <a class="block text-center bg-dblue text-white rounded w-full py-3 mt-4 hover:bg-dbluedark" href="/checkout">CHECKOUT NOW</a>
         
                            </div>
                               
                                </div>

                                <hr />
                            </div>

                        </div>
                    </div>
                );
            }
        }
    }
}

export default connect(mapStateToProps)(Cart);