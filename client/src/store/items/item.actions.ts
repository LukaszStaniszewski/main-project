import { AxiosError } from "axios";
import { ICreateItem } from "../../components/create-item/item-types/itemTypes";
import { ITEM_TYPES, CreateItemStart, IItem, CreateItemSuccess, CreateItemFailure } from "./item.types";

export const createItemStart = (item: ICreateItem): CreateItemStart => ({
   type: ITEM_TYPES.CREATE_ITEM_START,
   payload: item,
})

export const createItemSuccess = (item: IItem): CreateItemSuccess => ({
   type: ITEM_TYPES.CREATE_ITEM_SUCCESS,
   payload: item
})

export const createItemFailure = (error: AxiosError): CreateItemFailure => ({
   type: ITEM_TYPES.CREATE_ITEM_FAILURE,
   payload: error
})