import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getSingleProduct, addToCart} from '../store';
import UpdateProductForm from './update-single-product';

/**
 * COMPONENT
 */
class SingleProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemQuantity: 1
    };
    this.handleDecrement = this.handleDecrement.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    this.props.getSingleProduct(this.props.match.params.id);
  }

  handleSelect(e) {
    this.setState({
      itemQuantity: e.target.value
    });
  }

  handleDecrement(e) {
    e.preventDefault();
    if (this.state.itemQuantity <= 1) return;
    this.setState(state => {
      return {itemQuantity: state.itemQuantity - 1};
    });
  }

  handleIncrement(e) {
    e.preventDefault();
    if (this.state.itemQuantity >= this.props.product.stock) return;
    this.setState(state => {
      return {itemQuantity: state.itemQuantity + 1};
    });
  }

  render() {
    const {product, user} = this.props;
    const {itemQuantity} = this.state;
    const productStockArr = new Array(product.stock >= 10 ? 10 : product.stock)
      .fill(null)
      .map((el, i) => i + 1);

    return (
      <div>
        <div>
          <h3>
            {product.name} &mdash; ${product.price / 100}
          </h3>
          <img src={product.imageUrl} />
          <p>{product.description}</p>
          <p>In Stock: {product.stock}</p>
        </div>
        <div className="add-item-container">
          <button type="button" onClick={e => this.handleDecrement(e)}>
            -
          </button>
          <select value={itemQuantity} onChange={e => this.handleSelect(e)}>
            {productStockArr.map(el => (
              <option key={el} value={el}>
                {el}
              </option>
            ))}
          </select>
          <button type="button" onClick={e => this.handleIncrement(e)}>
            +
          </button>
          <button
            type="button"
            onClick={() =>
              this.props.addToCart(user.id, product.id, itemQuantity)
            }
          >
            Add to Cart!
          </button>
        </div>
        {user.isAdmin ? (
          <UpdateProductForm key={product.id} product={product} />
        ) : null}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    product: state.product,
    user: state.user
  };
};
const mapDispatch = dispatch => {
  return {
    getSingleProduct: id => dispatch(getSingleProduct(id)),
    addToCart: (userId, productId, qty) =>
      dispatch(addToCart(userId, productId, qty))
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
