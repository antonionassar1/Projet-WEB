import React, { Component } from 'react';
import Menu from './MenuComponent';
import  MyOrders from  './OrderComponent'
import Additem from './AdditemComponent';
import ItemDetail from './ItemDetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Admin from './AdminComponent'
import SearchResults from './SearchResults'
import { connect } from 'react-redux';
import { addComment, fetchItems, fetchComments, add_to_cart, remove_all_from_cart, remove_1_from_cart, checkout , addItem} from '../redux/ActionCreators';
import Cart from './CartComponent';
import { actions } from 'react-redux-form';
import OrdersPage from './OrdersComponent';
import OrderDetail from './OrderDetailComponent';
//import Additem from './AdditemComponent';


const mapStateToProps = state => {
  return {
    items: state.items,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
    carts: state.carts,
    user: state.user,
    users: state.users,
    cart_user: state.carts.filter((cart) => cart.id_user === parseInt(state.user.id_user, 10))[0],
    orders: state.orders,
    order_items: state.order_items
  }
}

const mapDispatchToProps = dispatch => ({

  addComment: (itemId, rating, author, comment) => 
      dispatch( addComment(itemId, rating, author, comment)),
  fetchItems: () => { dispatch(fetchItems())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  add_to_cart: (id_item, cart) =>
      dispatch( add_to_cart(id_item, cart)),
  checkout: (cart) => {
      console.log("Before dispatching cart");
      console.log(cart);
      dispatch( checkout(cart))
  },
  addItem: (item_name,categ,path,price) => {
    console.log("Before dispatching add item");
    dispatch( addItem(item_name,categ,path,price))
},
  remove_all_from_cart: (id_cartItem, cart) =>
      dispatch( remove_all_from_cart(id_cartItem, cart)),
  remove_1_from_cart: (id_item, cart) =>
      dispatch( remove_1_from_cart(id_item, cart))
}) 


class Main extends Component {


  componentDidMount() {
    this.props.fetchItems();
  }
  
  callback = () => {
    console.log("in main callback");
    this.forceUpdate();
}

  render() {
    const HomePage = () => {
      return (
        <Home
          item={this.props.items.items.filter((item) => item.featured)[0]}
          itemsLoading={this.props.items.isLoading}
          itemsErrMess={this.props.items.errMess}
          promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
          leader={this.props.leaders.filter((leader) => leader.featured)[0]}
        />
      );
    }

    const ItemWithId = ({ match }) => {
      return (
        <ItemDetail item={this.props.items.items.filter((item) => item.id === parseInt(match.params.itemId, 10))[0]}
          isLoading={this.props.items.isLoading}
          errMess={this.props.items.errMess}
          comments={this.props.comments.filter((comment) => comment.itemId === parseInt(match.params.itemId, 10))}
          addComment={this.props.addComment}
          cart={this.props.cart_user}
          add_to_cart={this.props.add_to_cart}
          callback={this.callback} />
      );
    };
    
    const OrderWithId = ({ match }) => {
      return (
        <OrderDetail order={this.props.orders.filter((order) => order.id_order === parseInt(match.params.orderId, 10))[0]}
          user={this.props.users.filter((user) => user.id_user === parseInt(match.params.userId, 10))[0]}
          order_items={this.props.order_items}
          items={this.props.items.items}
          isLoading={this.props.items.isLoading}
          errMess={this.props.items.errMess} />
      );
    };

    const renderCartOfUser = () => {
      return (
        <Cart parentCallback={this.callback} remove_all_from_cart={this.props.remove_all_from_cart} items={this.props.items} cart={this.props.cart_user} add_to_cart={this.props.add_to_cart} remove_1_from_cart={this.props.remove_1_from_cart} checkout={this.props.checkout}/>
      );
    };
    const renderOrderOfUser = ()=> {

      return (
        <MyOrders parentCallback={this.callback} items={this.props.items} orders={this.props.orders} />
        

      )
    }

    const addproduct =()=>{

      return (
        <Additem additem={this.props.addItem} />
      )
    }

    return (
      <div>
        <Header cart={this.props.cart_user}/>
        <div>
          <Switch>
            <Route path='/home' component={HomePage} />
            <Route exact path='/menu' component={() => <Menu items={this.props.items} add_to_cart={this.props.add_to_cart} cart={this.props.cart_user} />} />
            <Route path='/menu/:itemId' component={ItemWithId} />
            <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
            <Route exact path='/aboutus' component={() => <About leaders={this.props.leaders} />} />
            <Route exact path='/admin' component={() => <Admin users={this.props.users} items={this.props.items} />} />
            <Route exact path='/results/:res' component={() => <SearchResults />} />
            <Route exact path='/additem' component={addproduct} />
            <Route exact path='/cart' component={renderCartOfUser} />
            <Route exact path='/myorders' component={ renderOrderOfUser} />
            <Route exact path='/admin/orders' component={() => <OrdersPage users={this.props.users} orders={this.props.orders} />} />
            <Route exact path='/admin/orders/:userId/:orderId' component={OrderWithId} />
            <Redirect to="/home" />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main))