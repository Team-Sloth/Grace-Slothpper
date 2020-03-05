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
      name: this.props.product.name,
      description: this.props.product.description,
      price: this.props.product.price,
      stock: this.props.product.stock
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // async componentDidMount() {
  //   await this.props.getSingleProduct(this.props.match.params.id);
  //   this.setState({
  //     name: this.props.product.name,
  //     description: this.props.product.description,
  //   });
  // }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    const id = this.props.product.id;
    event.preventDefault();
    this.props.updateSingleProduct(id, this.state);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.props.product && (
          <div>
            <h4>Update This Product:</h4>
            <h3>{this.props.product.name} THIS WORKS!!!</h3>
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
const mapState = state => {
  return {
    product: state.product
  };
};

const mapDispatch = dispatch => {
  return {
    getSingleProduct: id => dispatch(getSingleProduct(id)),
    updateSingleProduct: (id, product) =>
      dispatch(updateSingleProduct(id, product))
  };
};

export default connect(mapState, mapDispatch)(EditSingleProduct);
