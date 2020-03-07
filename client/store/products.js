import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GOT_PRODUCTS = 'GOT_PRODUCTS';
const ADDED_PRODUCT = 'ADDED_PRODUCT';

/**
 * INITIAL STATE
 */
const defaultProducts = [];

/**
 * ACTION CREATORS
 */
const gotProducts = products => ({type: GOT_PRODUCTS, products});
const addedProduct = product => ({type: ADDED_PRODUCT, product});

/**
 * THUNK CREATORS
 */
export const getProducts = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/products');
    dispatch(gotProducts(data));
  } catch (err) {
    console.error(err);
  }
};

export const addProduct = product => async (dispatch, getState) => {
  try {
    const {data} = await axios.post('/api/products', product);
    dispatch(addedProduct(data));
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function(state = defaultProducts, action) {
  switch (action.type) {
    case GOT_PRODUCTS:
      return action.products;
    case ADDED_PRODUCT:
      return [...state, action.product];
    default:
      return state;
  }
}
