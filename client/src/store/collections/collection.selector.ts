import {createSelector} from "reselect"
import { ICollectionState } from "./collection.reducer"
import { AppState } from "../root-reducer"

export const selectCollectionReducer = (state: AppState) : ICollectionState => state.collection

export const selectCollection = createSelector(
   selectCollectionReducer,
  (state) => state.collection
)

export const selectCollections = createSelector(
   selectCollectionReducer,
  (state) => state.collections
)

export const selectCollectionsWithoutItems = createSelector(
   selectCollectionReducer,
  (state) => state.collectionsWihoutItems
)

