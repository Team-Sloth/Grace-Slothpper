import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getProducts} from '../store';
import {Link} from 'react-router-dom';
import AddProductForm from '../components/add-product.js';
import queryString from 'query-string';

/**
 * COMPONENT
 */
class Products extends React.Component {
  componentDidMount() {
    this.props.getProducts();
  }
  render() {
    const {products, location} = this.props;
    let qs = {};
    if (location && location.search) {
      qs = queryString.parse(location.search);
    }
    let category = qs.category;
    let filteredProducts = products;
    if (category) {
      filteredProducts = products.filter(
        p => p.category && p.category.name === category
      );
    }

    return (
      <div>
        <div>
          {this.props.isAdmin && (
            <div>
              <AddProductForm />
            </div>
          )}
        </div>
        <Link to="/products">
          <button>Show All</button>
        </Link>
        <Link to="/products?category=Sloth">
          <button>Filter Sloth Only</button>
        </Link>
        <Link to="/products?category=Coronavirus">
          <button>Filter Coronavirus Only</button>
        </Link>

        <div className="product-list">
          {filteredProducts.map(p => (
            <div className="product-list-item" key={p.id}>
              <Link to={`/products/${p.id}`} key={p.id}>
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
