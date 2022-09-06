import {
   ICollection,
   COLLECTION_ACTION_TYPES,
   ICreateCollection,
   ILargestCollection,
   ICollectionWithoutItems,
} from "./collection.types";

import { ICurrentUser } from "../user/user.types";
import { createAction } from "@reduxjs/toolkit";


export const deleteCollectionStart = createAction<ICollection["_id"]>(COLLECTION_ACTION_TYPES.DELETE_COLLECTION_START)

export const createCollectionWithItemsStart = createAction<{collectionWithItems: ICreateCollection, image?: File}>(COLLECTION_ACTION_TYPES.CREATE_COLLECTION_WITH_ITEMS_START)

export const getCollectionWithItemsStart = createAction<ICollection["_id"]>(COLLECTION_ACTION_TYPES.GET_COLLECTION_WITH_ITEMS_START)

export const getCollectionsWithoutItemsStart = createAction<ICurrentUser["name"]>(COLLECTION_ACTION_TYPES.GET_COLLECTIONS_WIHOUT_ITEMS_START)

export const getLargestCollectionsStart = createAction<number>(COLLECTION_ACTION_TYPES.GET_LARGEST_COLLECTIONS_START)

export const autocompleteStart = createAction<{query: string}>(COLLECTION_ACTION_TYPES.AUTOCOMPLETE_START)

export const setLargestCollections = createAction<ILargestCollection[]>(COLLECTION_ACTION_TYPES.SET_LARGEST_COLLECTIONS)
export const setCollection = createAction<ICollection>(COLLECTION_ACTION_TYPES.SET_COLLECTION)
export const setCollectionsWihoutItems = createAction<ICollectionWithoutItems[]>(COLLECTION_ACTION_TYPES.SET_COLLECTIONS_WIHOUT_ITEMS)
export const deleteCollectionSuccess = createAction<string>(COLLECTION_ACTION_TYPES.DELETE_COLLECTION_SUCCESS)
export const autocompleteSuccess = createAction<any>(COLLECTION_ACTION_TYPES.AUTOCOMPLETE_SUCCESS)