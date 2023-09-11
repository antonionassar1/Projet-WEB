import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { ITEMS } from '../shared/items';
import OrdersPage from './OrdersComponent';
import { connect } from 'react-redux';
import { useHistory, withRouter, Route } from 'react-router-dom';
import { useState } from 'react';



function RenderAvailableItems({ item }) {

    return (
        <div className="row product">
            <div className="col-md-2">
                <img src={item.image} alt={item.name} height="100" />
            </div>
            <div className="col-md-6 product-detail">
                <h5>{item.name}  </h5>
                {item.price + "L.L"}


            </div>
            <div>
                <Button data-v-cea7ffda="" id="go" class="col-md-2" color='black'>Edit Item

                </Button>
            </div>
            {/* <div className="col-md-2 cart-product-count">
                <h5>{item.quantity}</h5>
            </div> */}

        </div>
    )
}

class Admin extends Component {
    constructor(props) {
        super(props);

        // this.state = {
        //     items: ITEMS

        // }
    }
    goToAddItem(path) {
          
            this.props.history.push(path);
              
            
        }
    



    render() {

        const render_available_items = this.props.items.items.map((item) => {
            return (
                <div key={item.id} className="col-12">
                    <RenderAvailableItems item={item} />
                </div>
            )
        })
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-6">
                                <h3>View Orders:</h3>
                            </div>
                            <div className="col-6">
                                <Link to='/admin/orders' >
                                    <Button data-v-cea7ffda="" id="see_orders" class="col-md-2" color='black' >
                                        See orders
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-8">
                                <h3>Available items</h3>
                            </div>
                            <div className="col-4">
                                <Button data-v-cea7ffda="" id="add_item" class="col-md-2" color='black' onClick={() => this.goToAddItem('/additem')}>
                                    Add Item
                                </Button>
                            </div>
                        </div>
                        <hr />

                        {render_available_items}

                        <hr />
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Admin);