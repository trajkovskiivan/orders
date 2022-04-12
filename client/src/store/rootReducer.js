import { combineReducers } from "redux";
import order_reducer from "./orders/order_reducer";

export default combineReducers({
  orders: order_reducer,
});
