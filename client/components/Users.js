import React from 'react';
import {connect} from 'react-redux';
import {getUsers} from '../store';
import {Link} from 'react-router-dom';

class Users extends React.Component {
  componentDidMount() {
    this.props.getUsers();
  }
  render() {
    const {users} = this.props;
    return (
      <div>
        {users.map(user => (
          <Link to={`/products/${user.id}`} key={user.id}>
            <div>
              <h4>{user.name}</h4>
              <p>{`${user.firstName} ${user.lastName}`}</p>
              <p>{user.email}</p>
            </div>
          </Link>
        ))}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    users: state.users
  };
};

const mapDispatch = dispatch => {
  return {
    getUsers: () => dispatch(getUsers())
  };
};

export default connect(mapState, mapDispatch)(Users);
