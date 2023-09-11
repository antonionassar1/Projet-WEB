import React from 'react';
import { Card, CardImg, CardBody, CardText, CardSubtitle, CardFooter, CardDeck, CardImgOverlay, CardTitle, CardGroup, Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import Carousel from 'react-elastic-carousel';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../shared/categories';
import { Loading } from './LoadingComponent';
import {connect} from 'react-redux';
import SearchForm from './SearchForm';
import {useState} from 'react';
import ItemCard from './ItemCard';
import { ITEMS } from '../shared/items';

 

function RenderMenuItem({ item, add_to_cart, cart }) {

  return (
    // <Card>
    //   <Link to={`/menu/${item.id}`} >
    //     <CardImg width="100%" src={item.image} alt={item.name} />
    //     <CardImgOverlay>
    //       <CardTitle>{item.name}</CardTitle>
    //     </CardImgOverlay>
    //   </Link>
    // </Card>

    <div className="single-product">
         
      <div className="product-img">
        <Link to={`/menu/${item.id}`} >
          <img className="default-img" src={item.image} alt={item.name} height="550" width="750" />
          <img className="hover-img" src={item.image} alt={item.name} height="550" width="750" />
          <span className="out-of-stock">Hot</span>
        </Link>
        <div className="button-head">
          {/* <div className="product-action">
            <a data-toggle="modal" data-target="#exampleModal" title="Quick View" href="#"><i className=" ti-eye"></i><span>Quick Shop</span></a>
            <a title="Wishlist" href="#"><i className=" ti-heart "></i><span>Add to Wishlist</span></a>
            <a title="Compare" href="#"><i className="ti-bar-chart-alt"></i><span>Add to Compare</span></a>
          </div> */}
          <div className="product-action-2">
            {/* <a title="Add to cart" href="#">Add to cart</a> */}
            <Button type="addtocart" value="addtocart" onClick={()=>{add_to_cart(item.id, cart) }} color="primary" >Add To Cart</Button>
          </div>
        </div>
      </div>
      <div className="product-content">
        <h3><a href="#">{item.name}</a></h3>
        <div className="product-price">
          <span className="old">{item.price}</span>
          <span>{item.price}</span>
        </div>
      </div>
    </div>



    // <div className="col-lg-3 col-md-6" style={{ maxWidth: '33rem' }}>
    //   <Card style={{ width: '22rem' }} >
    //     <Link to={`/menu/${item.id}`} >
    //       <CardImg className="card-menu" variant="top" src={item.image} />
    //       <CardBody>
    //         <CardTitle>{item.name}</CardTitle>
    //         <CardText>
    //           {item.description}
    //         </CardText>
    //       </CardBody>
    //       <CardFooter>
    //         <small className="text-muted">{item.price}</small>
    //       </CardFooter>
    //     </Link>
    //   </Card>
    // </div>


    // {/* <div className="col-lg-3 col-md-6" style={{ maxWidth: '22rem' }}>
    // <Card className="card-style" style={{flex: 1}}>
    //   <Link to={`/menu/${item.id}`} >
    //   <CardImg top width="100%" src={item.image} alt="Card image cap" />
    //   <CardBody>
    //     <CardTitle >{item.name}</CardTitle>
    //     <CardSubtitle>${item.price}</CardSubtitle>
    //     <CardText>{item.description}</CardText>
    //   </CardBody>
    //   </Link>
    // </Card>
    // </div> */}

  )
}

const Menu = (props) => {
  const menu = props.items.items.map((item) => {
    return (
      <div key={item.id}>
        <RenderMenuItem item={item} add_to_cart={props.add_to_cart} cart={props.cart} />
      </div>
    );
  });

  const items_by_categ = []; // Array of json {categ: .., items_of_that_categ: []}
  for (let i = 0; i < CATEGORIES.length; ++i) {
    items_by_categ.push({categ: CATEGORIES[i],
      items_of_that_categ: props.items.items.filter((item) => item.id_category === CATEGORIES[i].id_category)})

  }


  const breakPoints = [
    { width: 100, itemsToShow: 1, itemsToScroll: 1 },
    { width: 400, itemsToShow: 2, itemsToScroll: 1 },
    { width: 768, itemsToShow: 3, itemsToScroll: 1 },
    { width: 1100, itemsToShow: 7, itemsToScroll: 1 },
  ];

  const menu2 = items_by_categ.map((items) => {
    
    const i = items.items_of_that_categ.map((item) => {
      return (
        <div key={item.id}>
          <RenderMenuItem item={item} add_to_cart={props.add_to_cart} cart={props.cart} />
        </div>
      )
    })



    return (
      <div>
        
        <div className="row">
          <div className="col-12">
            <div className="section-title">

              {/* <h2> {categ_items.name}</h2> */}
              {/* <h2> {items[0].id_category}</h2> */}
              <h2> {items.categ.name} </h2>

            </div>
          </div>
        </div>
        <Carousel breakPoints={breakPoints}>
          {i}
        </Carousel>
        <hr />
      </div>
    )
  })

  if (props.items.isLoading) {
    return(
        <div className="container">
            <div className="row">            
                <Loading />
               
            </div>
            </div>
        );
    }
    else if (props.items.errMess) {
        return(
            <div className="container">
                <div className="row"> 
                    <div className="col-12">
                        <h4>{props.items.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }
    else{


        return (
          <div className="container">
             
                <SearchForm />
                {/* <ItemsContainer/> */}
               
              
              
            <div className="row">
           
              <Breadcrumb>
                <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                <BreadcrumbItem active>Menu</BreadcrumbItem>
              </Breadcrumb>
              <div className="col-12">
             
                <h3>Menu</h3>
                <hr />
              </div>
            </div>
            {/* <div className="row">
              <CardDeck style={{ display: 'flex', flexDirection: 'row' }} justifyContent center>
                {menu}
              </CardDeck> */}
            <div className="container">
           
              <div className="row">
                <div className="col-12">
                  <div className="section-title">
                    <h2>Hot Items</h2>
                  </div>
                </div>
              </div>
      
              <div className="row">
                <div className="col-12">
              
                  {/* <div className="owl-carousel popular-slider"> */}
                  <Carousel breakPoints={breakPoints}>
                    {menu}
                  </Carousel>
                  <hr />
                  {menu2}
                  {/* </div> */}
                </div>
              </div>
      
      
            </div>
            {/* </div> */}
          </div>

        )}
    
    }
//}

export default Menu;