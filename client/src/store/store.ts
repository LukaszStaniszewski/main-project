import { legacy_createStore } from "redux"
import { rootReducer } from "./root-reducer"

export const store = legacy_createStore(rootReducer)