import { AxiosError } from "axios";
import { ICreateItem } from "../../components/create-item/item-types/itemTypes";
import { ActionWithPayload } from "../../utils/store.utils";
import { ICollection } from "../collections/collection.types";

export enum ITEM_TYPES {
   CREATE_ITEMS_START = "CREATE_ITEMS_START",
   CREATE_ITEMS_SUCCESS = "CREATE_ITEMS_SUCCESS",
   CREATE_ITEMS_FAILURE= "CREATE_ITEMS_FAILURE",
   SET_ITEMS = "SET_ITEMS"
}


export interface IItem extends ICreateItem {
   _id: string,
   createdAt : string,
   updatedAt: string,
   collectionId: ICollection["_id"]
}

export type ItemActionTypes = 
   CreateItemsStart | CreateItemsSuccess | CreateItemsFailure |
   SetItems

export type CreateItemsStart = ActionWithPayload<ITEM_TYPES.CREATE_ITEMS_START, ICreateItem[]>
export type CreateItemsSuccess = ActionWithPayload<ITEM_TYPES.CREATE_ITEMS_SUCCESS, IItem[]>
export type CreateItemsFailure = ActionWithPayload<ITEM_TYPES.CREATE_ITEMS_FAILURE, AxiosError>

export type SetItems = ActionWithPayload<ITEM_TYPES.SET_ITEMS, IItem[]>
