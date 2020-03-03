import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getProducts} from '../store';
import {Link} from 'react-router-dom';

/**
 * COMPONENT
 */
class Products extends React.Component {
  componentDidMount() {
    getProducts();
  }
  render() {
    const {products} = this.props;
    return (
      <div>
        {products.map(p => (
          <Link to={`/products/${p.id}`} key={p.id}>
            <div>
              <h3>
                {p.name} &mdash; ${p.price}
              </h3>
              <img src={p.imageUrl} />
              <p>{p.description}</p>
              <p>Qty: {p.quantity}</p>
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
    products: state.products
  };
};

export default connect(mapState)(Products);
