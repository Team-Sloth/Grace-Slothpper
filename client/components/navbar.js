import React from 'react';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../store';
import SubMenu from './sub-menu';

const Navbar = ({handleClick, isLoggedIn, user}) => (
  <div>
    <div className="siteHeader">
      <div className="siteHeader__section">
        <div className="siteHeader__logo">
          <Link to="/home">
            <img src="/img/sloth-md.gif" width={80} />
          </Link>
        </div>
        <div className="siteHeader__logo">
          <Link to="/home">Slothpper</Link>
        </div>
      </div>
      {isLoggedIn ? (
        <div className="siteHeader__section">
          {/* The navbar will show these links after you log in */}
          <div className="siteHeader__item siteHeaderButton">
            <Link to="/cart">
              <ShoppingCartIcon color="disabled" />(0)
            </Link>
          </div>
          <div className="siteHeader__item siteHeaderButton">
            <Link to={`/orders/${user.id}`}>My Orders</Link>
          </div>
          <div className="siteHeader__item siteHeaderButton">
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
          {user !== undefined && user.isAdmin ? (
            <div className="siteHeader__item siteHeaderButton">
              <Link to="/admin">Admin Page</Link>
            </div>
          ) : null}
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <div className="siteHeader__section">
            <div className="siteHeader__item siteHeaderButton">
              <Link to="/cart">CART(0)</Link>
            </div>
            <div className="siteHeader__item siteHeaderButton">
              <Link to="/signup">Sign Up</Link>
            </div>
            <div className="siteHeader__item siteHeaderButton">
              <Link to="/login">Login</Link>
            </div>
          </div>
        </div>
      )}
    </div>
    <SubMenu />
  </div>
);

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    }
  };
};

export default connect(mapState, mapDispatch)(Navbar);

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
