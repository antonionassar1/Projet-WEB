import React, {Component} from "react"
import { Link } from 'react-router-dom';
import { Card, CardImg, CardBody, CardText, CardSubtitle, CardFooter, CardDeck, CardImgOverlay, CardTitle, CardGroup, Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';

function ItemCard ({item}) { 

        return(


        <div className="col-md-3 mb-5">
            <div className="card card-body bg-yellow text-center h-100">
            <img className="w-100 mb-2" src={item.image} alt={item.name} />
            <h5 className="text card-title">
            {item.name} - {item.price}
            </h5>
            <Link className="btn btn-primary" color="" to={`/menu/${item.id}`}>
                Item Details
            <i className="" />
          </Link>
          </div>
        </div>
        )



    }
export default ItemCard