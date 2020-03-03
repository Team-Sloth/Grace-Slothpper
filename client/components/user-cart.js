import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getCartThunk} from '../store';

/**
 * COMPONENT
 */
export class UserCart extends React.Component {
  componentDidMount() {
    this.props.getCart(this.props.user.id);
  }
  render() {
    const {cart} = this.props;
    return (
      <div>
        <h3>Welcome, {this.props.user.email}</h3>
        {cart.cart
          ? cart.cart.map(p => (
              <div key={p.productId}>
                <img src={p.product.imageUrl} />
                <h3>
                  {p.product.name} &mdash; x{p.quantity}
                </h3>
                <p>
                  Price: ${p.product.price} * {p.quantity} = ${p.product.price *
                    p.quantity}
                </p>
              </div>
            ))
          : ''}
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
    cart: state.cart
  };
};

const mapDispatch = dispatch => {
  return {
    getCart: id => dispatch(getCartThunk(id))
  };
};

export default connect(mapState, mapDispatch)(UserCart);
