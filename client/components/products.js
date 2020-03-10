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
    // <div className="card__image"><img src={p.imageUrl} /></div>
    return (
      <div>
        <div>
          {this.props.isAdmin && (
            <div>
              <AddProductForm />
            </div>
          )}
        </div>
        <div>
          <ul className="cards">
            {filteredProducts.map(p => (
              <li className="cards__item" key={p.id}>
                <Link to={`/products/${p.id}`}>
                  <div className="card">
                    <div className="card__image">
                      <img src={p.imageUrl} />
                    </div>
                    <div className="card__content">
                      <div className="card__title">
                        {p.name} &mdash; ${p.price / 100}
                      </div>
                      <p className="card__text">{p.description}</p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
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
