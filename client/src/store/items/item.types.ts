import { AxiosError } from "axios";
import { ICreateItem } from "../../components/create-item/item-types/itemTypes";
import { ActionWithPayload } from "../../utils/store.utils";
import { ICollection } from "../collections/collection.types";

export enum ITEM_TYPES {
   CREATE_ITEM_START = "CREATE_ITEM_START",
   CREATE_ITEM_SUCCESS = "CREATE_ITEM_SUCCESS",
   CREATE_ITEM_FAILURE= "CREATE_ITEMFAILURE",
}


export interface IItem extends ICreateItem {
   createdAt : string,
   updatedAt: string,
   collectionId: ICollection["_id"]
}

export type ItemActionTypes = CreateItemStart | CreateItemSuccess | CreateItemFailure

export type CreateItemStart = ActionWithPayload<ITEM_TYPES.CREATE_ITEM_START, ICreateItem>
export type CreateItemSuccess = ActionWithPayload<ITEM_TYPES.CREATE_ITEM_SUCCESS, IItem>
export type CreateItemFailure = ActionWithPayload<ITEM_TYPES.CREATE_ITEM_FAILURE, AxiosError>
