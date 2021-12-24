import { combineReducers } from 'redux';
import productsReducer from './products';
import categoriesReducer from './categories';
import assetsReducer from './assets';
import ordersReducer from './orders';
import usersReducer from './users';
import shippingMethodsReducer from './shippingMethods';

export default combineReducers({
  products: productsReducer,
  categories: categoriesReducer,
  assets: assetsReducer,
  orders: ordersReducer,
  users: usersReducer,
  shippingMethods: shippingMethodsReducer,
});
