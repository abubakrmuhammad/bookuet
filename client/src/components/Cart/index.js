import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faFrown, faCreditCard } from '@fortawesome/fontawesome-free-solid';
import UserLayout from '../../hoc/UserLayout';
import Items from './Items';
import { getCartItems, clearCartItems, removeFromCart } from '../../actions/user_actions';

class Cart extends Component {
  state = {
    loading: true,
    total: 0,
    showTotal: false
  };

  componentDidMount() {
    if (this.props.user.userData.cart) {
      if (this.props.user.userData.cart.length > 0) {
        const cartItems = this.props.user.userData.cart.map(item => item.id);

        this.props.dispatch(getCartItems(cartItems, this.props.user.userData.cart)).then(() => {
          this.setState({ loading: false });
          if (this.props.user.cart.length > 0) this.calculateTotlaPrice(this.props.user.cart);
        });
      }
    }
  }

  componentWillUnmount() {
    this.props.dispatch(clearCartItems());
  }

  calculateTotlaPrice = cart => {
    const total = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

    this.setState({ total, showTotal: true });
  };

  removeItemHandler = id => {
    this.props.dispatch(removeFromCart(id)).then(() => {
      if (this.props.user.cart.length <= 0) this.setState({ showTotal: false });
      else this.calculateTotlaPrice(this.props.user.cart);
    });
  };

  render() {
    return (
      <UserLayout>
        <div>
          <h1>My Cart</h1>
          <div className='user_cart'>
            <div>
              <Items cart={this.props.user.cart} removeItem={id => this.removeItemHandler(id)} />
              {this.state.showTotal ? (
                <div>
                  <div className='user_cart_sum'>
                    <div>Total Amount: &nbsp; $ {this.state.total}</div>
                  </div>
                </div>
              ) : (
                <div className='cart_no_items'>
                  <FontAwesomeIcon icon={faFrown} />
                  <div style={{ marginTop: '16px' }}>You have no items in your cart</div>
                </div>
              )}
            </div>
          </div>
          {this.state.showTotal ? (
            <div className='paypal_button_container'>
              <Link to='/user/cart/checkout'>
                <div className='checkout-btn'>
                  <FontAwesomeIcon icon={faCreditCard} />
                  Checkout
                </div>
              </Link>
            </div>
          ) : null}
        </div>
      </UserLayout>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Cart);
