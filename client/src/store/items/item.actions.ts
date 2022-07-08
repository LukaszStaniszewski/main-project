import { AxiosError } from "axios";
import { ICreateItem } from "../../components/create-item/item-types/itemTypes";
import { ITEM_TYPES, CreateItemsStart, IItem, CreateItemsSuccess, CreateItemsFailure, SetItems } from "./item.types";

export const createItemsStart = (items: ICreateItem[]): CreateItemsStart => ({
   type: ITEM_TYPES.CREATE_ITEMS_START,
   payload: items,
})

export const createItemsSuccess = (items: IItem[]): CreateItemsSuccess => ({
   type: ITEM_TYPES.CREATE_ITEMS_SUCCESS,
   payload: items
})

export const createItemsFailure = (error: AxiosError): CreateItemsFailure => ({
   type: ITEM_TYPES.CREATE_ITEMS_FAILURE,
   payload: error
})

export const setItems = (items: IItem[]):SetItems => ({
   type: ITEM_TYPES.SET_ITEMS,
   payload: items
})