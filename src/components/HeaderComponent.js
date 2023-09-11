import React, { Component } from 'react';
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, Jumbotron,
Button, Modal, ModalHeader, ModalBody,
Form, FormGroup, Input, Label } from 'reactstrap';
import { Link, NavLink } from 'react-router-dom';
import { Switch, Redirect,  } from 'react-router-dom';
import Admin from './AdminComponent'
import { useHistory, withRouter, Route } from 'react-router-dom';
import { CART } from "../shared/carts";
import SearchForm from './SearchForm';




class Header extends Component {
    
    constructor(props) {
        super(props);

        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.state = {
          isNavOpen: false,
          isModalOpen: false,
          isAdmin: false
        };
      }

      toggleNav() {
        this.setState({
          isNavOpen: !this.state.isNavOpen
        });
      }



      
      toggleModal() {
          this.setState({
              isModalOpen: !this.state.isModalOpen
          });
      }
      UpdateUserState(){
          this.setState({
              isAdmin:true
          });
      }




      handleLogin(path) {
        if (this.username.value === 'admin' && this.password.value === 'admin') {
            this.UpdateUserState()
            alert("Username: " + this.username.value + " Password: " + this.password.value
                + " Remember: " + this.remember.checked + "is admin" + this.state.isAdmin );  
            this.props.history.push(path);
        }
        else{
            this.setState({
             isAdmin: false
      })
        }
    }


  render() {
    return(
            <div>
                <Navbar dark expand="md">
                    <div className="container">

                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="justify-content-center" href="/"><img src='assets/images/chubadaklogo.png' height="30" width="41" alt='Chou Badak' /></NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                            {/* <NavItem>
                                <NavLink className="nav-link"  to='/home'><span className="fa fa-home fa-lg"></span> Home</NavLink>
                            </NavItem> */}
                            {/* <NavItem>
                                <NavLink className="nav-link" to='/aboutus'><span className="fa fa-info fa-lg"></span> About Us</NavLink>
                            </NavItem> */}
                            <NavItem>
                                <NavLink className="nav-link"  to='/menu'><span className="fa fa-list fa-lg"></span> CHOU BADAK? </NavLink>
                            </NavItem>
                            {/* <NavItem>
                                <NavLink className="nav-link" to='/contactus'><span className="fa fa-address-card fa-lg"></span> Contact Us</NavLink>
                            </NavItem> */}
                            </Nav>
                        </Collapse>
                    </div>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Button outline onClick={this.toggleModal}>
                                <span className="fa fa-sign-in fa-lg"></span> LogIn
                            </Button>
                        </NavItem>
                        
                    </Nav>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                        <NavLink className="nav-link" to='/cart'> Cart <span className="fa fa-shopping-cart fa-lg" ></span>
                        <span data-v-10b1f9cc="" id="cart-total" class="has-background-ishtari-blue is-paddingless">{this.props.cart.total_qty}</span>
                        
                         </NavLink> 

                         
                            
                           
                        </NavItem>
                        <NavItem>
                        <NavLink className="nav-link" to='/myorders'> My Orders <span  ></span>
                        <span data-v-10b1f9cc="" id="cart-total" class="has-background-ishtari-blue is-paddingless"></span>
                        
                         </NavLink> 

                         
                            
                           
                        </NavItem>
                    </Nav>
                </Navbar>
                {/* <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>Chou Badak</h1>
                                <p>We take inspiration from the World's best products, and create a unique experience.</p>
                            </div>
                        </div>
                    </div>
                </Jumbotron> */}
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                    <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username"
                                    innerRef={(input) => this.username = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                    innerRef={(input) => this.password = input}  />
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="remember"
                                    innerRef={(input) => this.remember = input}  />
                                    Remember me
                                </Label>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary" onClick={() => this.handleLogin('/admin')}>Login
                            </Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default withRouter(Header);