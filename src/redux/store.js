import { applyMiddleware, compose, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import apiInstance from "../services";
import reducers from "./reducer";

const store = createStore(
  reducers,
  process.env.NODE_ENV === "production"
    ? compose(applyMiddleware(thunk.withExtraArgument(apiInstance)))
    : composeWithDevTools(applyMiddleware(thunk.withExtraArgument(apiInstance)))
);

export default store;
