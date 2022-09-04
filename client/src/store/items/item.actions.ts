import { ICreateItem } from "../../components/create-item/item-types/itemTypes";
import { ITEM_TYPES, IItem } from "./item.types";
import { createAction } from "@reduxjs/toolkit";

export const createItemsStart = createAction<ICreateItem[]>(ITEM_TYPES.CREATE_ITEMS_START)

export const deleteItemsStart = createAction<{_id: string}[]>(ITEM_TYPES.DELETE_ITEMS_START)

export const getItemStart = createAction<IItem["_id"]>(ITEM_TYPES.GET_ITEM_START)

export const getLatestItemsStart = createAction<number>(ITEM_TYPES.GET_LATEST_ITEMS_START)
