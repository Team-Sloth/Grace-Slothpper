import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getSingleProduct, addToCart} from '../store';
import UpdateProductForm from './update-single-product';

/**
 * COMPONENT
 */
class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.getSingleProduct(this.props.match.params.id);
  }
  render() {
    const {product} = this.props;

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
        <button
          onClick={() =>
            this.props.addToCart(this.props.user.id, product.id, 1)
          }
        >
          Add 1 to Cart!
        </button>

        {/* { product.id && <UpdateProductForm product={product} />} */}
        {<UpdateProductForm />}
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
