import { AnyAction, createReducer } from "@reduxjs/toolkit";
import { IItem, ILatestItem, setLatestItems, setItem, setItems } from "./index";

export interface IItemState {
   isLoading: boolean;
   items: IItem[] | null;
   item: IItem | null;
   latestItems: ILatestItem[] | null;
}

const initialState: IItemState = {
   isLoading: false,
   item: null,
   items: null,
   latestItems: [],
};

const isActionItemStartType = (action: AnyAction) => {
   const regex = new RegExp(`(item).*(start?$)`, "i");
   return regex.test(action.type)
};

const itemReducer = createReducer(initialState, (builder) => {
   builder
      .addCase(setLatestItems, (state, action) => {
         state.latestItems = action.payload,
         state.isLoading = false
      })
      .addCase(setItems, (state, action) => {
         state.items = action.payload
         state.isLoading = false
      })
      .addCase(setItem, (state, action) => {
         state.item = action.payload
         state.isLoading = false
      })
      .addMatcher(isActionItemStartType, (state) => {
         state.isLoading = true
      })
})
export default itemReducer