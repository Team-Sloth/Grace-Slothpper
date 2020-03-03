import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getSingleProduct} from '../store';

/**
 * COMPONENT
 */
class SingleProduct extends React.Component {
  componentDidMount() {
    getSingleProduct(this.props.match.params.id);
  }
  render() {
    const {product} = this.props;
    return (
      <div>
        <div>
          <h3>
            {product.name} &mdash; ${product.price}
          </h3>
          <img src={product.imageUrl} />
          <p>{product.description}</p>
          <p>Qty: {product.quantity}</p>
        </div>
        <button>Add 1 to Cart!</button>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    product: state.product
  };
};

export default connect(mapState)(SingleProduct);
