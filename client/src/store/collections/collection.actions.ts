 import { AxiosError } from "axios"

import { ICreateCollection } from "../../routes/create-collection/create-collection"
import { ICollection, COLLECTION_ACTION_TYPES } from "./collection.types"
import { IError } from "../user/user.reducer"
import * as give from "./collection.types"

export const createCollectionStart = (collectionData : ICreateCollection): give.CreateCollectionStart => ({
   type: COLLECTION_ACTION_TYPES.CREATE_COLLECTION_START,
   payload: collectionData
})

export const createCollectionSuccess = (collection: ICollection): give.CreateCollectionSuccess => ({
   type: COLLECTION_ACTION_TYPES.CREATE_COLLECTION_SUCCESS,
   payload: collection
})

export const createCollectionFailure = (error: AxiosError): give.CreateCollectionFailure => ({
   type: COLLECTION_ACTION_TYPES.CREATE_COLLECTION_FAILURE,
   payload: error
})

export const deleteCollectionStart = (collectionId : ICollection["_id"]): give.DeleteCollectionStart => ({
   type: COLLECTION_ACTION_TYPES.DELETE_COLLECTION_START,
   payload: collectionId
})

export const deleteCollectionSuccess = (successMessage: IError): give.DeleteCollectionSuccess => ({
   type: COLLECTION_ACTION_TYPES.DELETE_COLLECTION_SUCCESS,
   payload: successMessage
})

export const deleteColletionFailure = (error : AxiosError): give.DeleteCollectionFailure => ({
   type: COLLECTION_ACTION_TYPES.DELETE_COLLECTION_FAILURE,
   payload: error
})

export const createCollectionWithItemsStart = (itemsCollection: {collectionWithItems: ICreateCollection, image: File}): give.CreateCollectionWithItemsStart => ({
   type: COLLECTION_ACTION_TYPES.CREATE_COLLECTION_WITH_ITEMS_START,
   payload: itemsCollection
})

export const createCollectionWithItemsSuccess = (itemsCollection: ICollection): give.CreateCollectionWithItemsSuccess => ({
   type: COLLECTION_ACTION_TYPES.CREATE_COLLECTION_WITH_ITEMS_SUCCESS,
   payload: itemsCollection
})

export const createCollectionWithItemsFailure = (error: AxiosError): give.CreateCollectionWithItemsFailure => ({
   type: COLLECTION_ACTION_TYPES.CREATE_COLLECTION_WITH_ITEMS_FAILURE,
   payload: error
})