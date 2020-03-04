import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import user from './user';
import users from './users';
import products from './products';
import product from './single-product';
import cart from './cart';

const reducer = combineReducers({
  user,
  users,
  products,
  product,
  cart
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
);

const store = createStore(reducer, middleware);

export default store;
export * from './user';
export * from './products';
export * from './single-product';
export * from './cart';
export * from './users';
