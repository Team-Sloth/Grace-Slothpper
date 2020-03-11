import axios from 'axios';

/**
 * ACTION TYPES
 */
const GOT_ORDER_DATA = 'GOT_ORDER_DATA';

/**
 * ACTION CREATORS
 */
const gotOrderData = orders => ({type: GOT_ORDER_DATA, orders});

/**
 * THUNK CREATORS
 */
export const getOrderData = () => async dispatch => {
  try {
    const {data} = await axios.get(`/api/orders`);
    dispatch(gotOrderData(data));
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case GOT_ORDER_DATA:
      return action.orders;
    default:
      return state;
  }
}
