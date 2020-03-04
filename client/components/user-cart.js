import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getCart, checkOut} from '../store';

/**
 * COMPONENT
 */
class UserCart extends React.Component {
  componentDidMount() {
    this.props.getCart(this.props.user.id);
  }
  render() {
    const {cart} = this.props;
    return (
      <div>
        <h3>{this.props.user.firstName}'s Cart:</h3>
        {cart
          ? cart.map(p => (
              <div key={p.id}>
                <img src={p.imageUrl} height="200px" />
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
        <button onClick={() => this.props.checkOut(this.props.user.id)}>
          Check Out
        </button>
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
    checkOut: userId => dispatch(checkOut(userId))
  };
};

export default connect(mapState, mapDispatch)(UserCart);
