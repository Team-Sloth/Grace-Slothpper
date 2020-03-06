import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addProduct} from '../store/products';

class AddProductForm extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: '',
      imageUrl: '',
      price: 0,
      quantity: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.addProduct(this.state);
    this.setState({
      name: '',
      description: '',
      imageUrl: '',
      price: 0,
      quantity: 0
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h4>Add A New Product!</h4>

        <div>
          <label>
            Product Name
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
            Product Description:
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
            Product Image:
            <input
              type="text"
              name="imageUrl"
              onChange={this.handleChange}
              value={this.state.imageUrl}
            />
          </label>
        </div>

        <div>
          <label>
            Product Price:
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
            Product Quantity:
            <input
              type="number"
              name="quantity"
              onChange={this.handleChange}
              value={this.state.quantity}
            />
          </label>
        </div>

        <button type="submit">Add This Product</button>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addProduct: product => dispatch(addProduct(product))
});

export default connect(null, mapDispatchToProps)(AddProductForm);
