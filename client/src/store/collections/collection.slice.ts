import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICollection, ICollectionWithoutItems, ILargestCollection } from "./collection.types";


export interface ICollectionState {
   collection: ICollection | null;
   collections: ICollection[];
   collectionsWihoutItems: ICollectionWithoutItems[];
   largestCollections: ILargestCollection[] | null;
   autocomplete: [];
   collectionFetch: boolean;
   successMessage: string | null;
}

const initialState: ICollectionState = {
   collection: null,
   collections: [],
   collectionsWihoutItems: [],
   largestCollections: null,
   autocomplete: [],
   collectionFetch: false,
   successMessage: null,
};

const collectionSlice = createSlice({
   name:"collection",
   initialState,
   reducers: {
      startLoading: (state) => {
         state.collectionFetch = true
      },
      setLargestCollections: (state, action: PayloadAction<ILargestCollection[]>) => {
         state.collectionFetch = false,
         state.largestCollections = action.payload
      },
      setCollection: (state, action: PayloadAction<ICollection>) => {
         state.collectionFetch = false,
         state.collection = action.payload
      },
      setCollectionsWihoutItems: (state, action: PayloadAction<ICollectionWithoutItems[]>)=> {
         state.collectionFetch = false,
         state.collectionsWihoutItems = action.payload
      },
      deleteCollectionSuccess: (state, action: PayloadAction<string>) =>{
         state.collectionFetch = false,
         state.successMessage = action.payload
      },
      autocompleteSuccess: (state, action) => {
         state.collectionFetch = false,
         state.autocomplete = action.payload
      }
      
   }
})

export const {startLoading, setLargestCollections, setCollection, setCollectionsWihoutItems, deleteCollectionSuccess, autocompleteSuccess} = collectionSlice.actions

export default collectionSlice.reducer