import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

const AdminNav = ({isAdmin}) => (
  <Fragment>
    {!isAdmin ? (
      <Redirect to="/" />
    ) : (
      <div>
        <Link to="/users">Users</Link>
        <Link to="/products">Products</Link>
        <Link to="/orders">Orders</Link>
      </div>
    )}
  </Fragment>
);

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isAdmin: state.user.isAdmin
  };
};

export default connect(mapState)(AdminNav);
