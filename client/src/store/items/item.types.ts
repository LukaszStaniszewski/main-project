import { ICreateItem } from "../../components/create-item/item-types/itemTypes";
import { ActionWithPayload } from "../../utils/store.utils";
import { ICollection } from "../collections/collection.types";

export enum ITEM_TYPES {
   CREATE_ITEMS_START = "CREATE_ITEMS_START",
   DELETE_ITEMS_START = "DELETE_ITEMS_START",
   GET_ITEM_START = "GET_ITEM_START",
   GET_LATEST_ITEMS_START = "GET_LATEST_ITEMS_START",
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

export type CreateItemsStart = ActionWithPayload<ITEM_TYPES.CREATE_ITEMS_START, ICreateItem[]>;
export type DelteItemsStart = ActionWithPayload<ITEM_TYPES.DELETE_ITEMS_START, { _id: string }[]>;
export type GetItemStart = ActionWithPayload<ITEM_TYPES.GET_ITEM_START, IItem["_id"]>;
export type GetLatestItemsStart = ActionWithPayload<ITEM_TYPES.GET_LATEST_ITEMS_START, number>;
;
