import logger from "redux-logger";
import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./root-reducer";
import rootSaga from "./root-saga";

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, logger];

export const store = configureStore({
   reducer: rootReducer,
   middleware: middlewares,
});

sagaMiddleware.run(rootSaga);

export default store;
