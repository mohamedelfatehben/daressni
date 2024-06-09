// store.js
import { applyMiddleware, combineReducers, createStore } from "redux";
import logger from "redux-logger";
import { thunk } from "redux-thunk";
import authReducer from "./user";
import walletReducer from "./wallet";

const store = createStore(
  combineReducers({ authReducer, walletReducer }),
  applyMiddleware(logger, thunk)
);

export default store;
