import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { ITEMS } from '../shared/items';


function RenderAvailableOrders({ order, users }) {
    const user = users.filter((user) => user.id_user == order.id_user)[0]


    return (
        <div>
            <div className="row product">
                <div className="col-md-2">
                    {/* <img src={item.image} alt={item.name} height="100" /> */}
                    <h2>{user.firstname[0].toUpperCase() + user.firstname.substring(1)} {user.lastname[0].toUpperCase() + user.lastname.substring(1)}</h2>
                </div>
                <div className="col-md-6 product-detail">
                    <div className="row">
                        <h5>
                            Status: {order.status}
                        </h5>
                    </div>
                    <div className="row">
                        <h5>
                            {order.total_price + "L.L"}
                        </h5>
                    </div>
                </div>
                <div>
                    <Link to={`/admin/orders/${order.id_user}/${order.id_order}`}>
                        <Button data-v-cea7ffda="" id="go" class="col-md-2" color='black'>
                            Check order
                        </Button>
                    </Link>
                </div>

            </div>
            <hr />
        </div>
    )
}

class OrdersPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: ITEMS
        }
    }

    render() {

        const render_available_orders = this.props.orders.map((order) => {
            return (
                <div key={order.id_order} className="col-12">
                    <RenderAvailableOrders order={order} users={this.props.users} />
                </div>
            )
        })
        return (
            <div className="container">
                {render_available_orders}
            </div>
        );
    }
}

export default OrdersPage;