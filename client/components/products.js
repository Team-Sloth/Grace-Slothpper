import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

/**
 * COMPONENT
 */
export const Products = props => {
  const {products} = props;

  return (
    <div>
      {products.map(p => (
        <div>
          <h3>
            {p.name} &mdash; ${p.price}
          </h3>
          <img src={p.imageUrl} />
          <p>{p.description}</p>
          <p>Qty: {p.quantity}</p>
        </div>
      ))}
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    products: state.products
  };
};

export default connect(mapState)(Products);
