import {createSelector} from "reselect"
import { ICollectionState } from "./collection.reducer"
import { AppState } from "../root-reducer"

export const selectCollectionReducer = (state: AppState) : ICollectionState => state.collection

export const selectCollection = createSelector(
   selectCollectionReducer,
  (state) => state.collection
)
