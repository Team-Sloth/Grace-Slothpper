import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GOT_SINGLE_PRODUCT = 'GOT_SINGLE_PRODUCT';
const UPDATED_SINGLE_PRODUCT = 'UPDATE_SINGLE_PRODUCT';

/**
 * INITIAL STATE
 */
const defaultState = {};

/**
 * ACTION CREATORS
 */
const gotSingleProduct = product => ({type: GOT_SINGLE_PRODUCT, product});
const updatedSingleProduct = product => ({
  type: UPDATED_SINGLE_PRODUCT,
  product
});

/**
 * THUNK CREATORS
 */
export const getSingleProduct = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/products/${id}`);
    dispatch(gotSingleProduct(data));
  } catch (err) {
    console.error(err);
  }
};

export const updateSingleProduct = product => async dispatch => {
  try {
    const {data} = await axios.put(`/api/products/${product.id}`, product);
    console.log('the new item data is ', data);
    dispatch(updatedSingleProduct(data));
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function(state = defaultState, action) {
  switch (action.type) {
    case GOT_SINGLE_PRODUCT:
      return action.product;
    case UPDATED_SINGLE_PRODUCT:
      return action.product;
    default:
      return state;
  }
}
