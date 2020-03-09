import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getCart, checkOut, deleteLineItem, addToCart} from '../store';

class CheckOut extends React.Component {
  componentDidMount() {
    this.props.getCart(this.props.user.id);
  }
  render() {
    const {cart, user, deleteLineItem, addToCart} = this.props;
    return (
      <section className="checkout-container">
        <div>
          <h4>Shipping Details</h4>
          <li>address info...</li>
          <li>address info...</li>
          <li>address info...</li>
        </div>
        <div>
          <h4>Billing Details</h4>
          <li>billing info...</li>
          <li>billing info...</li>
          <li>billing info...</li>
        </div>
        <div>
          <h5>Cart items</h5>
          {cart.map(item => (
            <CartItemMenu
              key={item.id}
              user={user}
              item={item}
              deleteLineItem={deleteLineItem}
              addToCart={addToCart}
            />
          ))}
        </div>
      </section>
    );
  }
}

const CartItemMenu = props => {
  const {item, deleteLineItem, addToCart, user} = props;
  console.log(
    'item has issue ',
    item.name,
    item.hasIssue,
    item.issueDescription
  );
  return (
    <div key={item.id} className="checkout-cart-container">
      <div>
        <img src={item.imageUrl} height="200px" />
      </div>
      <div>
        <h3>{item.name}</h3>
        <h5>Quantity: {item.lineItem.quantity}</h5>
      </div>
      <div>
        {item.hasIssue ? <h5>{item.issueText}</h5> : null}
        <p>
          Price: ${item.price / 100} * {item.lineItem.quantity} = $
          {item.price / 100 * item.lineItem.quantity}
        </p>
        <button type="button" onClick={() => deleteLineItem(user.id, item.id)}>
          DELETE PRODUCT X
        </button>
        <button type="button" onClick={() => addToCart(user.id, item.id, 1)}>
          +1
        </button>
        <button type="button" onClick={() => addToCart(user.id, item.id, -1)}>
          -1
        </button>
      </div>
    </div>
  );
};

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

export default connect(mapState, mapDispatch)(CheckOut);
