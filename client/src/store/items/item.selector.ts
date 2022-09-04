import { createSelector } from "reselect";
import { IItemState } from "./item.slice";
import { AppState } from "../root-reducer";

export type AdjustedItems = {
   optionalFields: undefined;
   _id: string;
   createdAt: string;
   updatedAt: string;
   collectionId: string;
   id: string;
   name: string;
   tags: string[];
   topic: string;
}[];

export const selectItemReducer = (state: AppState): IItemState => state.item;

export const selectAdjustedItems = createSelector([selectItemReducer], (state) =>
   state.items?.map((item) => {
      return { ...item, ...item.optionalFields, optionalFields: undefined };
   })
);

export const selectItem = createSelector([selectItemReducer], (state) => state.item);

export const selectLatestItems = createSelector(
   [selectItemReducer],
   (state) => state.latestItems
);
export const selectItemLoading = createSelector(
   [selectItemReducer],
   (state) => state.isLoading
);
