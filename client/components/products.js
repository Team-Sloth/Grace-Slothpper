import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getProducts} from '../store';
import {Link} from 'react-router-dom';
import AddProductForm from '../components/add-product.js';

/**
 * COMPONENT
 */
class Products extends React.Component {
  componentDidMount() {
    this.props.getProducts();
  }
  render() {
    const {products} = this.props;

    return (
      <div>
        <div>
          {this.props.isAdmin && (
            <div>
              <AddProductForm />
            </div>
          )}
        </div>
        <div className="product-list">
          {products.map(p => (
            <div className="product-list-item" key={p.id}>
              <Link to={`/products/${p.id}`}>
                <h3>
                  {p.name} &mdash; ${p.price / 100}
                </h3>
                <img src={p.imageUrl} width="100%" />
                <p>{p.description}</p>
                <p>In Stock: {p.stock}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    products: state.products,
    isAdmin: state.user.isAdmin
  };
};
const mapDispatch = dispatch => {
  return {
    getProducts: () => dispatch(getProducts())
  };
};

export default connect(mapState, mapDispatch)(Products);
