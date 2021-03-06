 import { AxiosError } from "axios"

import { ICreateCollection } from "../../pages/create-collection/create-collection"
import { ICollection, COLLECTION_ACTION_TYPES, ILargestCollection } from "./collection.types"
import { IError } from "../user/user.reducer"
import * as give from "./collection.types"
import { ICurrentUser } from "../user/user.types"



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

export const createCollectionWithItemsStart = (itemsCollection: {collectionWithItems: ICreateCollection, image?: File}): give.CreateCollectionWithItemsStart => ({
   type: COLLECTION_ACTION_TYPES.CREATE_COLLECTION_WITH_ITEMS_START,
   payload: itemsCollection
})

export const createCollectionWithItemsSuccess = (): give.CreateCollectionWithItemsSuccess => ({
   type: COLLECTION_ACTION_TYPES.CREATE_COLLECTION_WITH_ITEMS_SUCCESS
})

export const createCollectionWithItemsFailure = (error: AxiosError): give.CreateCollectionWithItemsFailure => ({
   type: COLLECTION_ACTION_TYPES.CREATE_COLLECTION_WITH_ITEMS_FAILURE,
   payload: error
})

export const getCollectionWithItemsStart = (collectionId: ICollection["_id"]): give.GetCollectionWithItemsStart => ({
   type: COLLECTION_ACTION_TYPES.GET_COLLECTION_WITH_ITEMS_START,
   payload: collectionId
})

export const getCollectionWithItemsSuccess = (itemsCollections: ICollection): give.GetCollectionWithItemsSuccess =>({
   type: COLLECTION_ACTION_TYPES.GET_COLLECTION_WITH_ITEMS_SUCCESS,
   payload: itemsCollections
})

export const getCollectionWithItemsFailure = (error: AxiosError): give.GetCollectionWithItemsFailure => ({
   type: COLLECTION_ACTION_TYPES.GET_COLLECTION_WITH_ITEMS_FAILURE,
   payload: error
})

export const getCollectionsWithoutItemsStart = (userName: ICurrentUser["name"]) : give.GetCollectionsWithoutItemsStart => ({
   type: COLLECTION_ACTION_TYPES.GET_COLLECTIONS_WIHOUT_ITEMS_START,
   payload: userName
})

export const getCollectionsWihoutItemsSuccess = (collections: give.ICollectionWithoutItems) : give.GetCollectionsWithoutItemsSuccess => ({
   type: COLLECTION_ACTION_TYPES.GET_COLLECTIONS_WIHOUT_ITEMS_SUCCESS,
   payload: collections,
})

export const getCollectionsWihoutItemsFailure = (error: AxiosError) : give.GetCollectionsWithoutItemsFailure => ({
   type: COLLECTION_ACTION_TYPES.GET_COLLECTIONS_WIHOUT_ITEMS_FAILURE,
   payload: error,
})

export const setCollection = (collection: any):give.SetCollection => ({
   type: COLLECTION_ACTION_TYPES.SET_COLLECTION,
   payload: collection
})

export const getLargestCollectionsStart = () :give.GetLargestCollectionsStart =>({
   type: COLLECTION_ACTION_TYPES.GET_LARGEST_COLLECTIONS_START
})

export const getLargestCollectionsSuccess = (collections: ILargestCollection[]) :give.GetLargestCollectionsSuccess=>({
   type: COLLECTION_ACTION_TYPES.GET_LARGEST_COLLECTIONS_SUCCESS,
   payload: collections
})

export const getLargestCollectionsFailure = (error: AxiosError ) :give.GetLargestCollectionsFailure =>({
   type: COLLECTION_ACTION_TYPES.GET_LARGEST_COLLECTIONS_FAILURE,
   payload: error
})

export const autocompleteStart = (query: {query: string}): give.AutocompleteStart => ({
   type: COLLECTION_ACTION_TYPES.AUTOCOMPLETE_START,
   payload: query
})

export const autocompleteSuccess = (result: any): give.AutocompleteSuccess => ({
   type: COLLECTION_ACTION_TYPES.AUTOCOMPLETE_SUCCESS,
   payload: result
})

export const autocompeleteFailure = (error: AxiosError):give.AutoCompleteFailure => ({
   type: COLLECTION_ACTION_TYPES.AUTOCOMPLETE_FAILURE,
   payload: error
})

