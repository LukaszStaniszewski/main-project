import { AxiosError } from "axios"
import {takeLatest, put, all, call} from "typed-redux-saga/macro"
import { API_URL, postRequest } from "../../api/axios-instance.api"
import { createItemsFailure, createItemsSuccess, deleteItemsFailure, deleteItemsSuccess } from "./item.actions"
import { CreateItemsStart, ITEM_TYPES, IItem, DelteItemsStart} from "./item.types"

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

function* onCreateItem () {
   yield* takeLatest(ITEM_TYPES.CREATE_ITEMS_START, createItems)
}

function* onDeleteItems() {
   yield* takeLatest(ITEM_TYPES.DELETE_ITEMS_START, deleteItems)
}

export default function* itemsSaga() {
   yield* all([
      call(onCreateItem),
      call(onDeleteItems)
   ])
}