import { combineReducers } from 'redux';
import entitiesReducer from './entities';
import authReducer from './auth';
import cartReducer from './cart';
import directoryReducer from './directory/directory.reducer';
import checkoutReducer from './checkout';

export default combineReducers({
  entities: entitiesReducer,
  auth: authReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
  directory: directoryReducer,
});
