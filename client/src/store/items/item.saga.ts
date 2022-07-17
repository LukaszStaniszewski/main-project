import { AxiosError } from "axios"
import {takeLatest, put, all, call} from "typed-redux-saga/macro"
import { API_URL, getRequest, postRequest } from "../../api/axios-instance.api"
import { createItemsFailure, createItemsSuccess, deleteItemsFailure, deleteItemsSuccess, getItemFailure, getItemSuccess, getLatestItemsFailure, getLatestItemsSuccess } from "./item.actions"
import { CreateItemsStart, ITEM_TYPES, IItem, DelteItemsStart, GetItemStart, ILatestItem} from "./item.types"

function* createItems({payload: item}:CreateItemsStart) {
   try {
      const respsone = yield* call(postRequest<IItem[]>, API_URL.CREATE_ITEM, item)
      yield* put(createItemsSuccess(respsone.data))
   } catch (error) {
      yield* put(createItemsFailure(error as AxiosError))
   }
}

function* deleteItems({payload: itemsId}:DelteItemsStart) {
   try {
      yield* call(postRequest, API_URL.DELETE_ITEM, itemsId)
      yield* put(deleteItemsSuccess())
   } catch (error) {
      yield* put(deleteItemsFailure(error as AxiosError))
   }
}

function* getItem({payload: itemId}: GetItemStart) {
   try {
      const response = yield* call(getRequest<IItem>, `${API_URL.GET_ITEM}/${itemId}`)
      yield* put(getItemSuccess(response.data))
   } catch (error) {
      yield* put(getItemFailure(error as AxiosError))
   }  
}

function* getLatestItems() {
   try {
      const response = yield* call(getRequest<ILatestItem[]>, API_URL.GET_LATEST_ITEMS)
      yield* put(getLatestItemsSuccess(response.data))
   } catch (error) {
      yield* put(getLatestItemsFailure(error as AxiosError))
   }
}

function* onGetLatestItems() {
   yield* takeLatest(ITEM_TYPES.GET_LATEST_ITEMS_START, getLatestItems)
}

function* onGetItem() {
   yield* takeLatest(ITEM_TYPES.GET_ITEM_START, getItem)
}

function* onCreateItem () {
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