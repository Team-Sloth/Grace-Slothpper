import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getSingleProduct, addToCart} from '../store';
import UpdateProductForm from './update-single-product';
import {Link} from 'react-router-dom';

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
          <ul className="cards">
            <li className="cards__item">
              <div className="card">
                <div className="card__content">
                  <div className="card__title">
                    {product.name} &mdash; ${product.price / 100}
                  </div>
                  <div className="card__image">
                    <img src={product.imageUrl} />
                  </div>
                  <p className="card__text">{product.description}</p>
                  <div className="card__text">In Stock: {product.stock}</div>
                  <div className="add-item-container">
                    <button
                      type="button"
                      onClick={e => this.handleDecrement(e)}
                    >
                      -
                    </button>
                    <select
                      value={itemQuantity}
                      onChange={e => this.handleSelect(e)}
                    >
                      {productStockArr.map(el => (
                        <option key={el} value={el}>
                          {el}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={e => this.handleIncrement(e)}
                    >
                      +
                    </button>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="card_btn--block card_btn"
                      onClick={() =>
                        this.props.addToCart(user.id, product.id, itemQuantity)
                      }
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            </li>
          </ul>
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
