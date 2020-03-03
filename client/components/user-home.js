import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {user} = props;
  console.log(props);
  return (
    <div>
      <h3>Welcome, {user.email}</h3>
      {user.cart.map(p => (
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
      ))}
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user
  };
};

export default connect(mapState)(UserHome);
