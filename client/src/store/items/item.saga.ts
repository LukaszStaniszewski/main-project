import { AxiosError } from "axios"
import {takeLatest, put, all, call} from "typed-redux-saga/macro"
import { API_URL, postRequest } from "../../api/axios-instance.api"
import { createItemsFailure, createItemsSuccess } from "./item.actions"
import { CreateItemsStart, ITEM_TYPES, IItem} from "./item.types"

function* createItems({payload: item}:CreateItemsStart) {
   try {
      const respsone = yield* call(postRequest<IItem[]>, API_URL.CREATE_ITEM, item)
      yield* put(createItemsSuccess(respsone.data))
   } catch (error) {
      yield* put(createItemsFailure(error as AxiosError))
   }
}

function* onCreateItem () {
   yield* takeLatest(ITEM_TYPES.CREATE_ITEMS_START, createItems)
}

export default function* itemsSaga() {
   yield* all([
      call(onCreateItem)
   ])
}