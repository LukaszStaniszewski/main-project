import { createSelector } from "reselect";
import { IItemState } from "./item.reducer";
import { AppState } from "../root-reducer";

export const selectItemReducer = (state: AppState) : IItemState => state.item

export const selectAdjustedItems = createSelector(
   [selectItemReducer],
   (state) => state.items?.map(item => {
      return {...item, ...item.optionalFields, optionalFields: undefined}
   })
)

export const selectItem = createSelector(
   [selectItemReducer],
   (state) => state.item
)

export const selectLatestItems = createSelector(
   [selectItemReducer],
   (state) => state.latestItems
)