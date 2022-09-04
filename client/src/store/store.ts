import { legacy_createStore as createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./root-reducer";
import rootSaga from "./root-saga";
import userReducer from "./user/user.slice";

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, logger];

export const store = configureStore({
   reducer: rootReducer,
   middleware: middlewares,
});
// const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

export default store;
