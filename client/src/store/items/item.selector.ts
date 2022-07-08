import { createSelector } from "reselect";
import { IItemState } from "./item.reducer";
import { AppState } from "../root-reducer";

export const selectItemReducer = (state: AppState) : IItemState => state.item

export const selectAdjustedItems = createSelector(
   [selectItemReducer],
   (item) => item.items?.map(item => {
      return {...item, ...item.optionalFields, optionalFields: null}
   })
)

// export const selectAdjustedItems = createSelector(
//    [selectItemReducer],
//    (item) => console.log("seelctor", item.items)
// )