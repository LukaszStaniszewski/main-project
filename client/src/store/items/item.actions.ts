import { AxiosError } from "axios";
import { ICreateItem } from "../../components/create-item/item-types/itemTypes";
import { ITEM_TYPES, CreateItemsStart, IItem} from "./item.types"
import * as get from "./item.types"
 
export const createItemsStart = (items: ICreateItem[]): CreateItemsStart => ({
   type: ITEM_TYPES.CREATE_ITEMS_START,
   payload: items,
})

export const createItemsSuccess = (items: IItem[]): get.CreateItemsSuccess => ({
   type: ITEM_TYPES.CREATE_ITEMS_SUCCESS,
   payload: items
})

export const createItemsFailure = (error: AxiosError): get.CreateItemsFailure => ({
   type: ITEM_TYPES.CREATE_ITEMS_FAILURE,
   payload: error
})

export const setItems = (items: IItem[]):get.SetItems => ({
   type: ITEM_TYPES.SET_ITEMS,
   payload: items
})

export const deleteItemsStart = (itemsId: IItem["_id"][]): get.DelteItemsStart => ({
   type: ITEM_TYPES.DELETE_ITEMS_START,
   payload: itemsId,
})

export const deleteItemsSuccess = (): get.DelteItemsSuccess => ({
   type: ITEM_TYPES.DELETE_ITEMS_SUCCESS
})

export const deleteItemsFailure = (error : AxiosError): get.DelteItemsFailure => ({
   type: ITEM_TYPES.DELETE_ITEMS_FAILURE,
   payload: error
})