import { combineReducers } from "redux";
import rootReducer from "./rootReducer";
import userReducer from "./userReducer";
import eventReducer from "./eventReducer";
import adminReducer from "./adminReducer";
import adminByEventReducer from "./adminByEventReducer";

const reducers = {
  rootReducer,
  userReducer,
  eventReducer,
  adminReducer,
  adminByEventReducer,
};
export default combineReducers(reducers);
