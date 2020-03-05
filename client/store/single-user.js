import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */

const GOT_SINGLE_USER = 'GOT_SINGLE_USER';
const UPDATED_SINGLE_USER = 'UPDATE_SINGLE_USER';
const UPDATED_USER_LINE_ITEM = 'UPDATED_USER_LINE_ITEM';
/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */

const gotSingleUser = user => ({type: GOT_SINGLE_USER, user});
const updatedSingleUser = user => ({type: UPDATED_SINGLE_USER, user});
const updatedUserLineItem = lineItem => ({
  type: UPDATED_USER_LINE_ITEM,
  lineItem
});
/**
 * THUNK CREATORS
 */

export const getSingleUser = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/users/${id}`);
    dispatch(gotSingleUser(data));
  } catch (err) {
    console.error(err);
  }
};

export const updateSingleUser = (id, user) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/users/${id}`, user);
    dispatch(updatedSingleUser(data));
  } catch (err) {
    console.error(err);
  }
};

export const updateUserLineItem = (
  userId,
  productId,
  lineItem
) => async dispatch => {
  try {
    const url = `/api/users/${userId}/${productId}`;
    const {data} = await axios.put(url, lineItem);
    dispatch(updatedUserLineItem(data));
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GOT_SINGLE_USER:
      return action.user;
    case UPDATED_SINGLE_USER:
      return action.user;
    case UPDATED_USER_LINE_ITEM: {
      const updatedCart = state.cart.map(item => {
        if (item.id === action.lineItem.id) {
          const updatedItem = item;
          updatedItem.quantity = action.lineItem.quantity;
          return updatedItem;
        }
        return item;
      });
      const updatedUser = {...state};
      updatedUser.cart = updatedCart;
      return updatedUser;
    }
    default:
      return state;
  }
}
