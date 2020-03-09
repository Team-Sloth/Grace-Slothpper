import axios from 'axios';

/**
 * ACTION TYPES
 */
const GOT_ORDER_HISTORY = 'GOT_ORDER_HISTORY';

/**
 * ACTION CREATORS
 */
const gotOrders = orders => ({type: GOT_ORDER_HISTORY, orders});

/**
 * THUNK CREATORS
 */
export const getOrderHistory = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/orders/${userId}`);
    dispatch(gotOrders(data));
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case GOT_ORDER_HISTORY:
      return action.orders;
    default:
      return state;
  }
}
