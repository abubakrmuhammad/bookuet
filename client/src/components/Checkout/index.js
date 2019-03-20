import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCreditCard, faSmile } from '@fortawesome/fontawesome-free-solid';
import UserLayout from '../../hoc/UserLayout';
import FormField from '../../utils/Form/FormField';
import { update, isFormValid } from '../../utils/Form/formActions';
import { getCartItems, clearCartItems, onPayment } from '../../actions/user_actions';

class Checkout extends Component {
  state = {
    total: 0,
    showSuccess: true,
    formError: false,
    formSuccess: false,
    formData: {
      address: {
        element: 'input',
        value: '',
        config: {
          label: 'Shipping Address',
          name: 'address',
          type: 'text',
          placeholder: 'Enter Shipping Address'
        },
        validation: { required: true },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      },
      email: {
        element: 'input',
        value: '',
        config: {
          label: 'Contact Email',
          name: 'email',
          type: 'email',
          placeholder: 'Enter Contact Email'
        },
        validation: { required: true, email: true },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true
      }
    }
  };

  componentDidMount() {
    if (this.props.user.userData.cart)
      if (this.props.user.userData.cart.length > 0) {
        const cartItems = this.props.user.userData.cart.map(item => item.id);

        this.props.dispatch(getCartItems(cartItems, this.props.user.userData.cart)).then(() => {
          if (this.props.user.cart.length > 0) {
            this.setState({ showSuccess: false });
            this.calculateTotlaPrice(this.props.user.cart);
          }
        });
      }
  }

  componentWillUnmount() {
    this.props.dispatch(clearCartItems());
  }

  renderCartItems = cartItems => {
    if (cartItems)
      return cartItems.map((item, i) => (
        <tr key={item._id}>
          <td>{i + 1}.</td>
          <td>{item.title}</td>
          <td>$ {item.price}</td>
          <td>{item.quantity}</td>
          <td>$ {(item.price * item.quantity).toFixed(2)}</td>
        </tr>
      ));
  };

  calculateTotlaPrice = cart => {
    const total = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

    this.setState({ total });
  };

  formUpdateHandler = element => {
    const newFormData = update(element, this.state.formData, 'books');

    this.setState({ formData: newFormData });
  };

  formSubmitHandler = event => {
    event.preventDefault();

    let isValid = isFormValid(this.state.formData, 'books');

    if (!isValid) this.setState({ formError: true });
    else {
      this.props.dispatch(onPayment({ cartItems: this.props.user.cart })).then(() => {
        if (this.props.user.paymentSuccess) this.setState({ showSuccess: true, formError: false });
      });
    }
  };

  render() {
    return (
      <UserLayout>
        {this.state.showSuccess ? (
          <div className='cart_success' style={{ marginTop: '32px' }}>
            <FontAwesomeIcon icon={faSmile} />
            <div style={{ marginTop: '16px' }}>ALL YOUR ORDERS ARE COMPLETE</div>
          </div>
        ) : (
          <div>
            <form onSubmit={this.formSubmitHandler}>
              <h2>Customer Details</h2>
              <FormField
                id='address'
                fieldData={this.state.formData.address}
                changed={element => this.formUpdateHandler(element)}
              />
              <FormField
                id='email'
                fieldData={this.state.formData.email}
                changed={element => this.formUpdateHandler(element)}
              />
              <h2>Order Details</h2>
              <table>
                <thead>
                  <tr>
                    <th>Sr #</th>
                    <th>Book Title</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                  </tr>
                </thead>
                <tbody>{this.renderCartItems(this.props.user.cart)}</tbody>
              </table>
              <div className='item' style={{ fontSize: '20px', margin: '32px 0' }}>
                <strong>Total Amount: </strong> $ {this.state.total}
              </div>
              {this.state.formError ? <div className='error_label'>Please check your data</div> : null}
              <div className='checkout-btn' onClick={this.formSubmitHandler}>
                <FontAwesomeIcon icon={faCreditCard} />
                Place Order
              </div>
            </form>
          </div>
        )}
      </UserLayout>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Checkout);
