import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getSingleUser} from '../store';

/**
 * COMPONENT
 */
class SingleUser extends React.Component {
  componentDidMount() {
    this.props.getSingleUser(this.props.match.params.id);
  }
  render() {
    const {user} = this.props;
    return (
      <div>
        <div>
          <h3>{user.name}</h3>
          <p>{`${user.firstName} ${user.lastName}`}</p>
          <p>{user.email}</p>
        </div>
        {/* <button
          onClick={() =>
            this.props.addToCart(this.props.user.id, product.id, 1)
          }
        >
          Add 1 to Cart!
        </button> */}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user
  };
};
const mapDispatch = dispatch => {
  return {
    getSingleUser: id => dispatch(getSingleUser(id))
  };
};

export default connect(mapState, mapDispatch)(SingleUser);
