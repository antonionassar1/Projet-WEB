/* eslint-disable react/jsx-pascal-case */
import React, { Component , useState , useEffect } from "react";
import { Card, CardImg, CardBody,CardText, Button, Modal, ModalHeader, ModalBody,
    Label, Row, Col, CardTitle, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { CART } from "../shared/carts";
import { CART_ITEM } from "../shared/cart_Items";
import { ADD_TO_CART } from "../redux/ActionTypes";
import { Add_toCart } from "../redux/ActionCreators";
import { Loading } from './LoadingComponent';

function RenderItem({item}) {

        return (
                <Card>
                    <CardImg width="100%" src={item.image} alt={item.name} />
                    <CardBody>
                        <CardTitle> {item.name}</CardTitle>
                        <CardText> {item.description} </CardText>
                    </CardBody>
                </Card> 
        )

}

function RenderComments({comments, addComment, itemId}) {
    const comnts = comments.map(comment => {
        return (
            <li key={comment.id}>
                <p>{comment.comment}</p>
                <p>-- {comment.author},
                &nbsp;
                {new Intl.DateTimeFormat('en-US', 
                { year: 'numeric', month: 'short', day: '2-digit'})
                .format(new Date(Date.parse(comment.date)))}
                </p>
            </li>
        )
    });
    if (comments == null) {
        return <div></div>
    }
    return (
        <div>
        <h3>Comments</h3>
        <ul className="list-unstyled">
            {comnts}
        </ul>
        <CommentForm itemId={itemId} addComment={addComment} />

        </div>
    );
}


const ItemDetail = (props) => {
    const item = props.item

    console.log(item);

  const [cart,SetCart] = useState([]);
  const Add_toCart =( item ) => {
      SetCart([...cart,item])
    //   alert("you now have: " + cart.forEach());
  }
    
  if (props.isLoading) {
    return(
        <div className="container">
            <div className="row">            
                <Loading />
            </div>
        </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{props.errMess}</h4>
                </div>
            </div> );
    }
    else{
    return (
        <div className="container">
        <div className="row">
            <Breadcrumb>

                <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                <BreadcrumbItem active>{props.item.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
                <h3>{props.item.name}</h3>
                <hr />
            </div>                
        </div>
        <div className="row">
            <div className="col-12 col-md-5 m-1">
                <RenderItem item={props.item} />
            </div>
            <div className="col-12 col-md-5 m-1">
                <h1> {props.item.name} </h1>
                <p>{props.item.description}</p>
                <p>Price= {props.item.price}</p>
                <Button type="addtocart" value="addtocart" onClick={()=>{props.add_to_cart(props.item.id, props.cart); }} color="primary" >Add To Cart</Button>
            </div>
        </div>
        <div className="row">
            <div className="col-12 col-md-5 m-1">
                <RenderComments comments={props.comments} 
                addComment={props.addComment}
                itemId={props.item.id} />
            </div>
        </div>
        </div>
    );
    }
}

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length < len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModelOpen: false
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModelOpen: !this.state.isModelOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.itemId, values.rating, values.author, values.comment);
        console.log('Current state is: ' + JSON.stringify(values));
    }

    render() {
        return(
            <div>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-edit fa-lg"></span> Submit Comment
                </Button>

                <Modal isOpen={this.state.isModelOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label for="rating" md={12}>rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" name="rating" className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md={12}>Your Name</Label>
                                <Col md={12}>
                                <Control.text model=".author" id="author" name="author" 
                                    placeholder="Author" 
                                    className="form-control" 
                                    validators={{
                                        required,
                                        minLength: minLength(3),
                                        maxLength: maxLength(15)
                                    }} 
                                />
                                <Errors className="text-danger" model=".author" show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Should have more than 3 Characters',
                                        maxLength: 'Should have 15 or less Characters'
                                    }}
                                />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="feedback" md={12}>Your feedback</Label>
                                <Col md={12}>
                                <Control.text model=".comment" id="comment" name="comment" 
                                    resize="none"
                                    rows="12" 
                                    className="form-control" 
                                    validators={{
                                        required,
                                        minLength: minLength(1)
                                    }} 
                                />
                                <Errors className="text-danger" model=".comment" show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Should not be empty!'
                                    }}
                                />
                                </Col>
                            </Row>
                            <Button type="submit" value="submit" color="primary">Submit</Button>                            
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>

        )
    }
}


export default ItemDetail; 