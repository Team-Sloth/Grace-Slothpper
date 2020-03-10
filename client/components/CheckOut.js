import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getCart, checkOut, deleteLineItem, addToCart} from '../store';
import StripeButton from './StripeCheckout';

class CheckOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderError: ''
    };
    this.handlePlaceOrder = this.handlePlaceOrder.bind(this);
  }

  componentDidMount() {
    this.props.getCart(this.props.user.id);
  }

  async handlePlaceOrder(userId) {
    try {
      await this.props.checkOut(userId);
      console.log('Successfully placed order!');
    } catch (error) {
      this.setState(state => {
        return {orderError: error.message};
      });
    }
  }

  render() {
    const {cart, user, deleteLineItem, addToCart} = this.props;
    const round = numb => Number(Math.round(numb + 'e' + 2) + 'e-' + 2);
    const orderTotal = cart.reduce((sum, item) => {
      return sum + item.lineItem.quantity * item.price;
    }, 0);
    const itemsTotal = cart.reduce((count, item) => {
      return count + item.lineItem.quantity;
    }, 0);
    const hasError =
      this.props.cart.filter(item => {
        if (!!item.issueText && item.issueText.length) {
          return item;
        }
      }).length > 0;

    return (
      <div>
        <div>
          <h4>{this.state.orderError.length ? this.state.orderError : ''}</h4>
        </div>
        <section className="checkout-container">
          <div>
            <h5>Cart items</h5>
            <div className="cart-items-container">
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
          </div>
          <div>
            <h3>Order Summary</h3>
            <div className="order-summary-line">
              <h5># Items:</h5>
              <span>{itemsTotal}</span>
            </div>
            <div className="order-summary-line">
              <h5>Order Total:</h5>
              <span>{orderTotal / 100}</span>
            </div>
            <StripeButton
              disabled={hasError}
              userId={user.id}
              handleOrder={() => this.handlePlaceOrder(user.id)}
              name="Grace Slothpper"
              description="Place your order"
              amount={orderTotal}
            />
          </div>
        </section>
      </div>
    );
  }
}

const CartItemMenu = props => {
  const {item, deleteLineItem, addToCart, user} = props;
  const disableAdd = item.hasIssue;
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
        {item.hasIssue ? (
          <h5 className="order-confirmation-error-message">{item.issueText}</h5>
        ) : null}
        <p>
          Price: ${item.price / 100} * {item.lineItem.quantity} = $
          {item.price / 100 * item.lineItem.quantity}
        </p>
        <button type="button" onClick={() => deleteLineItem(user.id, item.id)}>
          DELETE PRODUCT X
        </button>
        <button
          type="button"
          disabled={disableAdd}
          onClick={() => addToCart(user.id, item.id, 1)}
        >
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
