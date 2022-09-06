import {takeLatest, put, all, call,} from "typed-redux-saga/macro"
import { API_URL, getRequest, postRequest } from "../../api/axios-instance.api"
import { show404Page } from "../local/index"
import { showToast } from "../user"
import * as action from "./item.actions"
import { CreateItemsStart, ITEM_TYPES, IItem, DelteItemsStart, GetItemStart, ILatestItem, GetLatestItemsStart} from "./item.types"

export function* createItems({payload: item}:CreateItemsStart) {
   try {
      const response = yield* call(postRequest<IItem[]>, API_URL.CREATE_ITEM, item)
      yield* put(action.setItems(response.data))
   } catch (error) {
      // yield* put(createItemsFailure(error as AxiosError))
   }
}

export function* deleteItems({payload: itemsId}:DelteItemsStart) {
   try {
      yield* call(postRequest, API_URL.DELETE_ITEM, itemsId)
      yield* put(showToast({type: "success", message: "Items has been deleted"}))
   } catch (error) {
      // yield* put(deleteItemsFailure(error as AxiosError))
   }
}

function* getItem({payload: itemId}: GetItemStart) {
   try {
      const response = yield* call(getRequest<IItem>, `${API_URL.GET_ITEM}/${itemId}`)
      yield* all([
         put(show404Page(false)),
         put(action.setItem(response.data))
      ]) 
   } catch (error) {
      
      yield* all([
         put(show404Page(true)),
         // put(getItemFailure(error as AxiosError)),
      ]) 
   }  
}

export function* getLatestItems({payload: amount}: GetLatestItemsStart) {
   try {
      const response = yield* call(getRequest<ILatestItem[]>, `${API_URL.GET_LATEST_ITEMS}/${amount}`)
      yield* put(action.setLatestItems(response.data))
   } catch (error) {
      // yield* put(getLatestItemsFailure(error as AxiosError))
   }
}

export function* onGetLatestItems() {
   yield* takeLatest(ITEM_TYPES.GET_LATEST_ITEMS_START, getLatestItems)
}

function* onGetItem() {
   yield* takeLatest(ITEM_TYPES.GET_ITEM_START, getItem)
}

export function* onCreateItem () {
   yield* takeLatest(ITEM_TYPES.CREATE_ITEMS_START, createItems)
}

function* onDeleteItems() {
   yield* takeLatest(ITEM_TYPES.DELETE_ITEMS_START, deleteItems)
}

export default function* itemsSaga() {
   yield* all([
      call(onCreateItem),
      call(onDeleteItems),
      call(onGetItem),
      call(onGetLatestItems),
   ])
}