import { AxiosError } from "axios"

import { Action, ActionWithPayload } from "../../utils/store.utils"
import { ICreateCollection } from "../../routes/create-collection/create-collection"
import { IError } from "../user/user.reducer"
import { IItem } from "../items/item.types"
import { ICurrentUser } from "../user/user.types"
export enum COLLECTION_ACTION_TYPES {
   CREATE_COLLECTION_START = "CREATE_COLLECTION_START",
   CREATE_COLLECTION_SUCCESS = "CREATE_COLLECTION_SUCCESS",
   CREATE_COLLECTION_FAILURE = "CREATE_COLLECTION_FAILURE",

   DELETE_COLLECTION_START = "DELETE_COLLECTION_START",
   DELETE_COLLECTION_SUCCESS = "DELETE_COLLECTION_SUCCESS",
   DELETE_COLLECTION_FAILURE = "DELETE_COLLECTION_STFAILURE",
   
   CREATE_COLLECTION_WITH_ITEMS_START = "CREATE_COLLECTION_WITH_ITEMS_START",
   CREATE_COLLECTION_WITH_ITEMS_SUCCESS = "CREATE_COLLECTION_WITH_ITEMS_SUCCESS",
   CREATE_COLLECTION_WITH_ITEMS_FAILURE = "CREATE_COLLECTION_WITH_ITEMS_FAILURE",

   GET_COLLECTION_WITH_ITEMS_START = "GET_COLLECTION_WITH_ITEMS_START",
   GET_COLLECTION_WITH_ITEMS_SUCCESS = "GET_COLLECTION_WITH_ITEMS_SUCCESS",
   GET_COLLECTION_WITH_ITEMS_FAILURE = "GET_COLLECTION_WITH_ITEMS_FAILURE",

   GET_COLLECTIONS_WIHOUT_ITEMS_START = "GET_COLLECTIONS_WIHOUT_ITEMS_START",
   GET_COLLECTIONS_WIHOUT_ITEMS_SUCCESS = "GET_COLLECTIONS_WIHOUT_ITEMS_SUCCESS",
   GET_COLLECTIONS_WIHOUT_ITEMS_FAILURE = "GET_COLLECTIONS_WIHOUT_ITEMS_FAILURE",
   
}

export interface ICollection extends Omit<ICreateCollection, "image"| "items">{
   createdAt: string,
   updatedAt: string,
   _id: string,
   image?: {
      url: string,
      imageId: string
   }
   items?: IItem[]
}

export interface ICollectionWithoutItems extends Exclude<ICollection, "items"> {}


export type CollectionActions = 
CreateCollectionStart | CreateCollectionSuccess | CreateCollectionFailure |
DeleteCollectionStart | DeleteCollectionSuccess | DeleteCollectionFailure |
CreateCollectionWithItemsStart | CreateCollectionWithItemsSuccess | CreateCollectionWithItemsFailure |
GetCollectionWithItemsStart | GetCollectionWithItemsSuccess | GetCollectionWithItemsFailure |
GetCollectionsWithoutItemsStart | GetCollectionsWithoutItemsSuccess | GetCollectionsWithoutItemsFailure


export type CreateCollectionStart = ActionWithPayload<COLLECTION_ACTION_TYPES.CREATE_COLLECTION_START, ICreateCollection>
export type CreateCollectionSuccess = ActionWithPayload<COLLECTION_ACTION_TYPES.CREATE_COLLECTION_SUCCESS, ICollection>
export type CreateCollectionFailure = ActionWithPayload<COLLECTION_ACTION_TYPES.CREATE_COLLECTION_FAILURE, AxiosError>

export type DeleteCollectionStart = ActionWithPayload<COLLECTION_ACTION_TYPES.DELETE_COLLECTION_START, ICollection["_id"]>
export type DeleteCollectionSuccess = ActionWithPayload<COLLECTION_ACTION_TYPES.DELETE_COLLECTION_SUCCESS, IError>
export type DeleteCollectionFailure = ActionWithPayload<COLLECTION_ACTION_TYPES.DELETE_COLLECTION_FAILURE, AxiosError>;

export type CreateCollectionWithItemsStart = ActionWithPayload<COLLECTION_ACTION_TYPES.CREATE_COLLECTION_WITH_ITEMS_START, {collectionWithItems: ICreateCollection, image?: File}>
export type CreateCollectionWithItemsSuccess = ActionWithPayload<COLLECTION_ACTION_TYPES.CREATE_COLLECTION_WITH_ITEMS_SUCCESS, ICollection>
export type CreateCollectionWithItemsFailure = ActionWithPayload<COLLECTION_ACTION_TYPES.CREATE_COLLECTION_WITH_ITEMS_FAILURE, AxiosError>

export type GetCollectionWithItemsStart = ActionWithPayload<COLLECTION_ACTION_TYPES.GET_COLLECTION_WITH_ITEMS_START, ICollection["_id"]>
export type GetCollectionWithItemsSuccess = ActionWithPayload<COLLECTION_ACTION_TYPES.GET_COLLECTION_WITH_ITEMS_SUCCESS, ICollection>
export type GetCollectionWithItemsFailure = ActionWithPayload<COLLECTION_ACTION_TYPES.GET_COLLECTION_WITH_ITEMS_FAILURE, AxiosError>

export type GetCollectionsWithoutItemsStart = ActionWithPayload<COLLECTION_ACTION_TYPES.GET_COLLECTIONS_WIHOUT_ITEMS_START, ICurrentUser["name"]>
export type GetCollectionsWithoutItemsSuccess = ActionWithPayload<COLLECTION_ACTION_TYPES.GET_COLLECTIONS_WIHOUT_ITEMS_SUCCESS, ICollectionWithoutItems>
export type GetCollectionsWithoutItemsFailure = ActionWithPayload<COLLECTION_ACTION_TYPES.GET_COLLECTIONS_WIHOUT_ITEMS_FAILURE, AxiosError>