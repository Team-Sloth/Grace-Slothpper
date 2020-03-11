import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

const AdminNav = ({isAdmin}) => (
  <Fragment>
    {!isAdmin ? (
      <Redirect to="/" />
    ) : (
      <div>
        <ul>
          <li>
            <Link to="/users">Users</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/admin/orders">Orders</Link>
          </li>
        </ul>
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
