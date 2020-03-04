import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getCart} from '../store';

/**
 * COMPONENT
 */
class UserCart extends React.Component {
  componentDidMount() {
    console.log(this.props.user);
    this.props.getCart(this.props.user.id);
  }
  render() {
    const {cart} = this.props;
    return (
      <div>
        <h3>Welcome, {this.props.user.email}</h3>
        {cart
          ? cart.map(p => (
              <div key={p.productId}>
                <img src={p.imageUrl} />
                <h3>
                  {p.name} &mdash; x{p.lineItem.quantity}
                </h3>
                <p>
                  Price: ${p.price / 100} * {p.lineItem.quantity} = ${p.price /
                    100 *
                    p.lineItem.quantity}
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
    cart: state.order
  };
};

const mapDispatch = dispatch => {
  return {
    getCart: userId => dispatch(getCart(userId))
  };
};

export default connect(mapState, mapDispatch)(UserCart);
