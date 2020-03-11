import axios from 'axios';
import history from '../history';
import Swal from 'sweetalert2';

/**
 * ACTION TYPES
 */
const GOT_CART = 'GOT_CART';
const ADDED_TO_CART = 'ADDED_TO_CART';
const CHECKED_OUT = 'CHECKED_OUT';
const DELETED_LINE_ITEM = 'DELETED_LINE_ITEM';

/**
 * ACTION CREATORS
 */
const gotCart = cart => ({type: GOT_CART, cart});

const addedToCart = (userId, lineItem) => ({
  type: ADDED_TO_CART,
  userId,
  lineItem
});

const deletedLineItem = (userId, productId) => ({
  type: DELETED_LINE_ITEM,
  userId,
  productId
});

const checkedOut = userId => ({
  type: CHECKED_OUT,
  userId
});

/**
 * THUNK
 */

export const getCart = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/orders/cart/${userId}`);
    dispatch(gotCart(res.data));
  } catch (err) {
    console.error(err);
  }
};

export const addToCart = (userId, productId, quantity) => async dispatch => {
  try {
    quantity = Number(quantity);

    if (quantity === -1)
      Swal.fire({
        title: 'Product Removed',
        text: `Removed:${quantity}`,
        icon: 'warning',
        timer: 1000,
        timerProgressBar: true,
        toast: true,
        position: 'top-end'
      });

    if (quantity > 0)
      Swal.fire({
        title: 'Product Added',
        text: `Added:${quantity}`,
        icon: 'success',
        timer: 1000,
        timerProgressBar: true,
        toast: true,
        position: 'top-end'
      });

    const res = await axios.put(`/api/orders/cart/${userId}`, {
      productId,
      quantity
    });
    dispatch(addedToCart(userId, res.data));
  } catch (err) {
    console.error(err);
  }
};

export const checkOut = userId => async dispatch => {
  console.log('THUNK trying to check out');
  try {
    const {data} = await axios.delete(`/api/orders/cart/${userId}`);
    dispatch(checkedOut(userId));
  } catch (err) {
    const checkOutErr = new Error(
      err.response.data + ' Please adjust your order.'
    );
    return Promise.reject(checkOutErr);
  }
};

export const deleteLineItem = (userId, productId) => async dispatch => {
  try {
    const {data} = await axios.delete(
      `/api/orders/cart/${userId}/${productId}`
    );
    dispatch(deletedLineItem(userId, productId));
  } catch (err) {
    console.log(err);
  }
};

/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case GOT_CART:
      return action.cart;
    case CHECKED_OUT:
      return [];
    case DELETED_LINE_ITEM:
      return state.filter(item => item.id !== action.productId);
    case ADDED_TO_CART: {
      const stateCopy = [...state];
      const product = stateCopy.find(p => p.id === action.lineItem.productId);
      if (product) {
        if (action.lineItem.quantity <= product.stock) {
          product.hasIssue = false;
          product.issueText = null;
          console.log('reducer ', product);
        } else {
          product.hasIssue = true;
          product.issueText =
            'Desired amount greater than stock.  Please update order';
        }

        product.lineItem = action.lineItem;
      }
      return stateCopy;
    }
    default:
      return state;
  }
}
