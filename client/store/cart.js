import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART';
const ADD_TO_CART = 'ADD_TO_CART';

/**
 * ACTION CREATORS
 */
const getCart = cart => ({type: GET_CART, cart});
const addToCart = (userId, productId, qty) => ({
  type: ADD_TO_CART,
  userId,
  productId,
  qty
});

export const getCartThunk = id => async dispatch => {
  try {
    const res = await axios.get(`/api/users/${id}`);
    dispatch(getCart(res.data));
  } catch (err) {
    console.error(err);
  }
};

export const addToCartThunk = (userId, productId, qty) => async dispatch => {
  try {
    const res = await axios.put(`/api/users/${userId}`, {
      userId,
      productId,
      quantity: qty
    });
    dispatch(addToCart(userId, productId, qty));
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart;
    default:
      return state;
  }
}
