import { AxiosError } from "axios";
import { ICreateItem } from "../../components/create-item/item-types/itemTypes";
import { Action, ActionWithPayload } from "../../utils/store.utils";
import { ICollection } from "../collections/collection.types";

export enum ITEM_TYPES {
   CREATE_ITEMS_START = "CREATE_ITEMS_START",
   CREATE_ITEMS_SUCCESS = "CREATE_ITEMS_SUCCESS",
   CREATE_ITEMS_FAILURE = "CREATE_ITEMS_FAILURE",
   SET_ITEMS = "SET_ITEMS",
   DELETE_ITEMS_START = "DELETE_ITEMS_START",
   DELETE_ITEMS_SUCCESS = "DELETE_ITEMS_SUCCESS",
   DELETE_ITEMS_FAILURE = "DELETE_ITEMS_FAILURE",
   GET_ITEM_START = "GET_ITEM_START",
   GET_ITEM_SUCCESS = "GET_ITEM_SUCCESS",
   GET_ITEM_FAILURE = "GET_ITEM_FAILURE",
   GET_LATEST_ITEMS_START = "GET_LATEST_ITEMS_START",
   GET_LATEST_ITEMS_SUCCESS = "GET_LATEST_ITEMS_SUCCESS",
   GET_LATEST_ITEMS_FAILURE = "GET_LATEST_ITEMS_FAILURE",
}

export interface IItem extends ICreateItem {
   _id: string;
   createdAt: string;
   updatedAt: string;
   collectionId: ICollection["_id"];
}

export interface ILatestItem {
   _id: string;
   name: string;
   tags: string[];
   collectionId: string;
   createdAt: string;
   collection: string;
   createdBy: string;
}

export type ItemActionTypes =
   | CreateItemsStart
   | CreateItemsSuccess
   | CreateItemsFailure
   | SetItems
   | DelteItemsStart
   | DelteItemsSuccess
   | DelteItemsFailure
   | GetItemStart
   | GetItemSuccess
   | GetItemFailure
   | GetLatestItemsStart
   | GetLatestItemsSuccess
   | GetLatestItemsFailure;

export type CreateItemsStart = ActionWithPayload<ITEM_TYPES.CREATE_ITEMS_START, ICreateItem[]>;
export type CreateItemsSuccess = ActionWithPayload<ITEM_TYPES.CREATE_ITEMS_SUCCESS, IItem[]>;
export type CreateItemsFailure = ActionWithPayload<ITEM_TYPES.CREATE_ITEMS_FAILURE, AxiosError>;

export type DelteItemsStart = ActionWithPayload<ITEM_TYPES.DELETE_ITEMS_START, { _id: string }[]>;
export type DelteItemsSuccess = Action<ITEM_TYPES.DELETE_ITEMS_SUCCESS>;
export type DelteItemsFailure = ActionWithPayload<ITEM_TYPES.DELETE_ITEMS_FAILURE, AxiosError>;

export type SetItems = ActionWithPayload<ITEM_TYPES.SET_ITEMS, IItem[]>;

export type GetItemStart = ActionWithPayload<ITEM_TYPES.GET_ITEM_START, IItem["_id"]>;
export type GetItemSuccess = ActionWithPayload<ITEM_TYPES.GET_ITEM_SUCCESS, IItem>;
export type GetItemFailure = ActionWithPayload<ITEM_TYPES.GET_ITEM_FAILURE, AxiosError>;

export type GetLatestItemsStart = ActionWithPayload<ITEM_TYPES.GET_LATEST_ITEMS_START, number>;
export type GetLatestItemsSuccess = ActionWithPayload<
   ITEM_TYPES.GET_LATEST_ITEMS_SUCCESS,
   ILatestItem[]
>;
export type GetLatestItemsFailure = ActionWithPayload<
   ITEM_TYPES.GET_LATEST_ITEMS_FAILURE,
   AxiosError
>;
