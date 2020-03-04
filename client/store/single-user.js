import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */

const GOT_SINGLE_USER = 'GOT_SINGLE_USER';
const UPDATED_SINGLE_USER = 'UPDATE_SINGLE_USER';

/**
 * INITIAL STATE
 */
const defaultUser = {};

/**
 * ACTION CREATORS
 */

const gotSingleUser = user => ({type: GOT_SINGLE_USER, user});
const updatedSingleUser = user => ({type: UPDATED_SINGLE_USER, user});

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

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GOT_SINGLE_USER:
      return action.user;
    case UPDATED_SINGLE_USER:
      return action.user;
    default:
      return state;
  }
}
