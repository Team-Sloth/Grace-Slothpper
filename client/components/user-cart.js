import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import StripeButton from './StripeCheckout';
import {getCart, checkOut, deleteLineItem, addToCart} from '../store';

/**
 * COMPONENT
 */
class UserCart extends React.Component {
  componentDidMount() {
    this.props.getCart(this.props.user.id);
  }
  render() {
    const {cart, user} = this.props;
    return (
      <div>
        <h3>{user.firstName ? user.firstName : 'Guest'}'s Cart:</h3>
        {cart && cart.length > 0
          ? cart.map(p => (
              <div key={p.id}>
                <img src={p.imageUrl} height="200px" />
                <h3>
                  {p.name} &mdash; x{p.lineItem.quantity}
                </h3>
                <p>
                  Price: ${p.price / 100} * {p.lineItem.quantity} = $
                  {p.price / 100 * p.lineItem.quantity}
                </p>
                <button
                  type="button"
                  onClick={() => this.props.deleteLineItem(user.id, p.id)}
                >
                  DELETE PRODUCT X
                </button>
                <div>
                  <button
                    type="button"
                    onClick={() => this.props.addToCart(user.id, p.id, 1)}
                  >
                    ADD +1
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => this.props.addToCart(user.id, p.id, -1)}
                  >
                    REMOVE -1
                  </button>
                </div>
              </div>
            ))
          : ''}
        <Link to="/checkout">Review Your Order</Link>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user,
    cart: state.order
  };
};

const mapDispatch = dispatch => {
  return {
    getCart: userId => dispatch(getCart(userId)),
    checkOut: userId => dispatch(checkOut(userId)),
    deleteLineItem: (userId, productId) =>
      dispatch(deleteLineItem(userId, productId)),
    addToCart: (userId, productId, qty) =>
      dispatch(addToCart(userId, productId, qty))
  };
};

export default connect(mapState, mapDispatch)(UserCart);
