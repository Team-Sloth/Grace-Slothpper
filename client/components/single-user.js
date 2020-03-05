import React from 'react';
import {connect} from 'react-redux';
import {getSingleUser, updateSingleUser} from '../store';
import SingleUserCartTable from './SingleUserCartTable';
/**
 * COMPONENT
 */
class SingleUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    await this.props.getSingleUser(this.props.match.params.id);
    this.setState({
      firstName: this.props.singleUser.firstName,
      lastName: this.props.singleUser.lastName,
      email: this.props.singleUser.email
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    const id = this.props.match.params.id;
    event.preventDefault();
    this.props.updateSingleUser(id, this.state);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.props.singleUser && (
          <div>
            <h4>Update This User:</h4>
            <h3>{this.props.singleUser.firstName}</h3>
            <div>
              <label>
                New User Name:
                <input
                  type="text"
                  name="firstName"
                  onChange={this.handleChange}
                  value={this.state.firstName}
                />
              </label>
            </div>

            <div>
              <label>
                User Email:
                <input
                  type="text"
                  name="email"
                  onChange={this.handleChange}
                  value={this.state.email}
                />
              </label>
            </div>
            <SingleUserCartTable cart={this.props.singleUser.cart} />
            <button type="submit">Update This User</button>
          </div>
        )}
      </form>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    singleUser: state.singleUser
  };
};

const mapDispatch = dispatch => {
  return {
    getSingleUser: id => dispatch(getSingleUser(id)),
    updateSingleUser: (id, user) => dispatch(updateSingleUser(id, user))
  };
};

export default connect(mapState, mapDispatch)(SingleUser);
