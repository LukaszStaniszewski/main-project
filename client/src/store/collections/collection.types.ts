import { AxiosError } from "axios";

import { Action, ActionWithPayload } from "../../utils/store.utils";
import { ICreateCollection } from "../../pages/create-collection/create-collection";
import { IError } from "../user/user.reducer";
import { IItem } from "../items/item.types";
import { ICurrentUser } from "../user/user.types";
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

   GET_LARGEST_COLLECTIONS_START = "GET_LARGEST_COLLECTIONS_START",
   GET_LARGEST_COLLECTIONS_SUCCESS = "GET_LARGEST_COLLECTIONS_SUCCESS",
   GET_LARGEST_COLLECTIONS_FAILURE = "GET_LARGEST_COLLECTIONS_FAILURE",

   AUTOCOMPLETE_START = "AUTOCOMPLETE_START",
   AUTOCOMPLETE_SUCCESS = "AUTOCOMPLETE_SUCCESS",
   AUTOCOMPLETE_FAILURE = "AUTOCOMPLETE_FAILURE",

   SET_COLLECTION = "SET_COLLECTION",
}

export interface ICollection extends Omit<ICreateCollection, "image" | "items"> {
   createdAt: string;
   updatedAt: string;
   _id: string;
   image?: {
      url: string;
      imageId: string;
   };
   items?: IItem[];
}

export interface ICollectionWithoutItems extends Omit<ICollection, "items"> {}

export interface ILargestCollection extends ICollectionWithoutItems {
   itemCount: number;
}

export type CollectionActions =
   | CreateCollectionStart
   | CreateCollectionSuccess
   | CreateCollectionFailure
   | DeleteCollectionStart
   | DeleteCollectionSuccess
   | DeleteCollectionFailure
   | CreateCollectionWithItemsStart
   | CreateCollectionWithItemsSuccess
   | CreateCollectionWithItemsFailure
   | GetCollectionWithItemsStart
   | GetCollectionWithItemsSuccess
   | GetCollectionWithItemsFailure
   | GetCollectionsWithoutItemsStart
   | GetCollectionsWithoutItemsSuccess
   | GetCollectionsWithoutItemsFailure
   | GetLargestCollectionsStart
   | GetLargestCollectionsSuccess
   | GetLargestCollectionsFailure
   | AutocompleteStart
   | AutocompleteSuccess
   | AutoCompleteFailure
   | SetCollection;

export type CreateCollectionStart = ActionWithPayload<
   COLLECTION_ACTION_TYPES.CREATE_COLLECTION_START,
   ICreateCollection
>;
export type CreateCollectionSuccess = ActionWithPayload<
   COLLECTION_ACTION_TYPES.CREATE_COLLECTION_SUCCESS,
   ICollection
>;
export type CreateCollectionFailure = ActionWithPayload<
   COLLECTION_ACTION_TYPES.CREATE_COLLECTION_FAILURE,
   AxiosError
>;

export type DeleteCollectionStart = ActionWithPayload<
   COLLECTION_ACTION_TYPES.DELETE_COLLECTION_START,
   ICollection["_id"]
>;
export type DeleteCollectionSuccess = ActionWithPayload<
   COLLECTION_ACTION_TYPES.DELETE_COLLECTION_SUCCESS,
   IError
>;
export type DeleteCollectionFailure = ActionWithPayload<
   COLLECTION_ACTION_TYPES.DELETE_COLLECTION_FAILURE,
   AxiosError
>;

export type CreateCollectionWithItemsStart = ActionWithPayload<
   COLLECTION_ACTION_TYPES.CREATE_COLLECTION_WITH_ITEMS_START,
   { collectionWithItems: ICreateCollection; image?: File }
>;
export type CreateCollectionWithItemsSuccess =
   Action<COLLECTION_ACTION_TYPES.CREATE_COLLECTION_WITH_ITEMS_SUCCESS>;
export type CreateCollectionWithItemsFailure = ActionWithPayload<
   COLLECTION_ACTION_TYPES.CREATE_COLLECTION_WITH_ITEMS_FAILURE,
   AxiosError
>;

export type GetCollectionWithItemsStart = ActionWithPayload<
   COLLECTION_ACTION_TYPES.GET_COLLECTION_WITH_ITEMS_START,
   ICollection["_id"]
>;
export type GetCollectionWithItemsSuccess = ActionWithPayload<
   COLLECTION_ACTION_TYPES.GET_COLLECTION_WITH_ITEMS_SUCCESS,
   ICollection
>;
export type GetCollectionWithItemsFailure = ActionWithPayload<
   COLLECTION_ACTION_TYPES.GET_COLLECTION_WITH_ITEMS_FAILURE,
   AxiosError
>;

export type GetCollectionsWithoutItemsStart = ActionWithPayload<
   COLLECTION_ACTION_TYPES.GET_COLLECTIONS_WIHOUT_ITEMS_START,
   ICurrentUser["name"]
>;
export type GetCollectionsWithoutItemsSuccess = ActionWithPayload<
   COLLECTION_ACTION_TYPES.GET_COLLECTIONS_WIHOUT_ITEMS_SUCCESS,
   ICollectionWithoutItems
>;
export type GetCollectionsWithoutItemsFailure = ActionWithPayload<
   COLLECTION_ACTION_TYPES.GET_COLLECTIONS_WIHOUT_ITEMS_FAILURE,
   AxiosError
>;

export type GetLargestCollectionsStart = ActionWithPayload<
   COLLECTION_ACTION_TYPES.GET_LARGEST_COLLECTIONS_START,
   number
>;
export type GetLargestCollectionsSuccess = ActionWithPayload<
   COLLECTION_ACTION_TYPES.GET_LARGEST_COLLECTIONS_SUCCESS,
   ILargestCollection[]
>;
export type GetLargestCollectionsFailure = ActionWithPayload<
   COLLECTION_ACTION_TYPES.GET_LARGEST_COLLECTIONS_FAILURE,
   AxiosError
>;

export type AutocompleteStart = ActionWithPayload<
   COLLECTION_ACTION_TYPES.AUTOCOMPLETE_START,
   { query: string }
>;
export type AutocompleteSuccess = ActionWithPayload<
   COLLECTION_ACTION_TYPES.AUTOCOMPLETE_SUCCESS,
   any
>;
export type AutoCompleteFailure = ActionWithPayload<
   COLLECTION_ACTION_TYPES.AUTOCOMPLETE_FAILURE,
   AxiosError
>;

export type SetCollection = ActionWithPayload<
   COLLECTION_ACTION_TYPES.SET_COLLECTION,
   any
>;
