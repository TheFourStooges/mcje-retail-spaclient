import { combineReducers } from "redux";
import entitiesReducer from "./entities";
import authReducer from './auth';
import cartReducer from './cart';
import directoryReducer from "./directory/directory.reducer";

export default combineReducers({
  entities: entitiesReducer,
  auth: authReducer,
  cart: cartReducer,
  directory: directoryReducer,
});
