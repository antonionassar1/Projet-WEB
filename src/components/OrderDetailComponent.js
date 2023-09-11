import React, { Component, useState, useEffect } from "react";
import {
    Card, CardImg, CardBody, CardText, Button, Modal, ModalHeader, ModalBody,
    Label, Row, Col, CardTitle, Breadcrumb, BreadcrumbItem
} from "reactstrap";
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';

// function RenderItem({ item }) {

//     return (
//         <Card>
//             <CardImg width="100%" src={item.image} alt={item.name} />
//             <CardBody>
//                 <CardTitle> {item.name}</CardTitle>
//                 <CardText> {item.description} </CardText>
//             </CardBody>
//         </Card>
//     )

// }

function RenderOrderItem({ item, order }) {

    return (
        <div className="row product">
            <div className="col-md-2">
                <img src={item.item.image} alt={item.item.name} height="100" />
            </div>
            <div className="col-md-4 product-detail">
                <h5>{item.item.name} (x{item.item_in_order.quantity})  </h5>
                {item.item_in_order.quantity * item.item.price + 'L.L'}
            </div>
            <div className="col-md-3 product-detail">
                <div className="row">
                <Button data-v-cea7ffda="" id="minus"  color='warning' onClick={() => alert()}>
                    -
                </Button>
                <Label>{item.item_in_order.quantity}</Label>
                <Button data-v-cea7ffda="" id="plus" color='warning' onClick={() => alert()}>
                    +
                </Button>
                </div>
            </div>
            <div>
                <Button data-v-cea7ffda="" id="rv" class="col-md-2" color='black' onClick={() => alert()} >
                    Remove from order
                    <span className="fa fa-shopping-order fa-lg" ></span>
                </Button>
            </div>
            {/* <div className="col-md-2 order-product-count">
                <h5>{item.quantity}</h5>
            </div> */}

        </div>
    )
}

const OrderDetail = (props) => {
    const order = props.order

    console.log(order);

    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>);
    }
    else {
        const order_items_user = props.order_items.filter((order_item) => order_item.id_order === props.order.id_order)
        const order_items_user_final = order_items_user.map(
            (order_item) => {
                return (
                    {
                        item_in_order: order_item,
                        item: (props.items.filter((item) => item.id === order_item.id_item))[0]
                    }
                );
            });

        const render_order_items = order_items_user_final.map((order_item) => {
            return (
                <div key={order_item.item.id} className="col-12">
                    <RenderOrderItem item={order_item} order={props.order} />
                </div>
            )
        })
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/admin/orders">Orders</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.order.id_order}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.order.id_order}</h3>
                        <hr />
                    </div>
                </div>
                <div className="col-12">
                    {render_order_items}
                </div>
            </div>
        );
    }
}

export default OrderDetail;