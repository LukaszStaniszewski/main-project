import { AnyAction, createReducer } from "@reduxjs/toolkit";
import { 
   ICollection, 
   ICollectionWithoutItems, 
   ILargestCollection,
   setCollection,
   setLargestCollections,
   setCollectionsWihoutItems,
   deleteCollectionSuccess,
   autocompleteSuccess
 } from "./index";

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
   largestCollections: [],
   autocomplete: [],
   collectionFetch: false,
   successMessage: null,
};


const isActionCollectionStartType = (action: AnyAction) => {
   const regex = new RegExp(`(collection).*(start?$)`, "i");
   return regex.test(action.type)
};

const collectionReducer = createReducer(initialState,(builder) =>{
   builder
      .addCase(setLargestCollections, (state, action) => {
         state.collectionFetch = false,
         state.largestCollections = action.payload
      })
      .addCase(setCollection, (state, action) => {
         state.collectionFetch = false,
         state.collection = action.payload
      })
      .addCase(setCollectionsWihoutItems, (state, action) => {
         state.collectionFetch = false,
         state.collectionsWihoutItems = action.payload
      })
      .addCase(deleteCollectionSuccess, (state, action) => {
         state.collectionFetch = false,
         state.successMessage = action.payload
      })
      .addCase(autocompleteSuccess, (state, action) => {
         state.collectionFetch = false
         state.autocomplete = action.payload
      })
      .addMatcher(isActionCollectionStartType, (state) => {
         state.collectionFetch = true
      })
})

export default collectionReducer