import { legacy_createStore, applyMiddleware } from "redux"
import logger from "redux-logger";
import createSagaMiddleware from "@redux-saga/core";

import rootReducer from "./root-reducer"
import rootSaga from "./root-saga";

const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware, logger];

export const store = legacy_createStore(rootReducer, applyMiddleware(...middlewares))

sagaMiddleware.run(rootSaga)