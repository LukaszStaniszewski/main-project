import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IItem, ILatestItem } from "./item.types";

export interface IItemState {
   isLoading: boolean;
   error: string | null;
   items: IItem[] | null;
   item: IItem | null;
   latestItems: ILatestItem[] | null;
}

const initialState: IItemState = {
   isLoading: false,
   error: null,
   item: null,
   items: null,
   latestItems: [],
};

const itemSlice = createSlice({
   name: "item",
   initialState,
   reducers: {
      startLoading: (state) => {
         state.isLoading = true
      },
      setLatestItems: (state, action: PayloadAction<ILatestItem[]>) => {
         state.latestItems = action.payload,
         state.isLoading = false
      },
      setItems: (state, action: PayloadAction<IItem[]>) => {
         state.items = action.payload
         state.isLoading = false
      },
      setItem: (state, action: PayloadAction<IItem>) =>{
         state.item = action.payload
         state.isLoading = false
      },
   }
}) 

export const {startLoading, setLatestItems, setItem, setItems} = itemSlice.actions
export default itemSlice.reducer