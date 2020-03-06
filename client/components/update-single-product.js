import React from 'react';
import {connect} from 'react-redux';
import {getSingleProduct, updateSingleProduct} from '../store';

/**
 * COMPONENT
 */
class EditSingleProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      name: '',
      description: '',
      price: 0,
      stock: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({
      id: this.props.product.id,
      name: this.props.product.name,
      description: this.props.product.description,
      price: this.props.product.price,
      stock: this.props.product.stock
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.updateSingleProduct(this.state);
    this.setState({
      id: this.props.product.id,
      name: this.props.product.name,
      description: this.props.product.description,
      price: this.props.product.price,
      stock: this.props.product.stock
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.props.product && (
          <div>
            <h4>Update This Product:</h4>
            <h3>{this.props.product.name}</h3>
            <div>
              <label>
                New Product Name:
                <input
                  type="text"
                  name="name"
                  onChange={this.handleChange}
                  value={this.state.name}
                />
              </label>
            </div>

            <div>
              <label>
                New Product Description:
                <input
                  type="text"
                  name="description"
                  onChange={this.handleChange}
                  value={this.state.description}
                />
              </label>
            </div>

            <div>
              <label>
                New Product Price:
                <input
                  type="number"
                  name="price"
                  onChange={this.handleChange}
                  value={this.state.price}
                />
              </label>
            </div>

            <div>
              <label>
                New Product Stock:
                <input
                  type="number"
                  name="stock"
                  onChange={this.handleChange}
                  value={this.state.stock}
                />
              </label>
            </div>

            <button type="submit">Update This Product</button>
          </div>
        )}
      </form>
    );
  }
}

/**
 * CONTAINER
 */
// const mapState = state => {
//   return {
//     product: state.product
//   };
// };

const mapDispatch = dispatch => {
  return {
    // getSingleProduct: id => dispatch(getSingleProduct(id)),
    updateSingleProduct: product => dispatch(updateSingleProduct(product))
  };
};

export default connect(null, mapDispatch)(EditSingleProduct);
