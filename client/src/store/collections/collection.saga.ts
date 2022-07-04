import {takeLatest, put, all, call} from "typed-redux-saga/macro"
import {COLLECTION_ACTION_TYPES, ICollection} from "./collection.types"
import { createCollectionSuccess, createCollectionFailure, deleteCollectionSuccess, deleteColletionFailure, createCollectionWithItemsSuccess, createCollectionWithItemsFailure } from "./collection.actions"
import * as type from "./collection.types"
import { postRequest, API_URL, optionsUploadImage } from "../../api/axios-instance.api"
import { AxiosError } from "axios"
import {IError} from "../user/user.reducer"


function* createCollection({payload: collectionData}: type.CreateCollectionStart) {
   try {
      const response = yield* call(postRequest<ICollection>,  API_URL.CREATE_COLLECTION, collectionData,)
      yield* put(createCollectionSuccess(response.data))
   } catch (error) {
      yield* put(createCollectionFailure(error as AxiosError))
   }
}


function* createCollectionWithItems({payload: itemsCollection}: type.CreateCollectionWithItemsStart){
   try {
      // if(itemsCollection.image) {
      //    console.log(itemsCollection.image)
      //    const {data} = yield* uploadImage(itemsCollection.image)
      //    const url = data.image.url
      //    const imageId = data.image.fileId
      //    console.log(image)

      // }
      const response = yield* call(postRequest<ICollection>, API_URL.CREATE_COLLECTION_WITH_ITEMS, itemsCollection)
      yield* put(createCollectionWithItemsSuccess(response.data))
   } catch (error) {
      yield* put(createCollectionWithItemsFailure(error as AxiosError))
   }
}

function* uploadImage(image: File) {
   return yield* call(postRequest, API_URL.UPLOAD_IMAGE, {image: image})
}


function* deleteCollection({payload: collectionId}: type.DeleteCollectionFailure) {
   try {
      const response = yield* call(postRequest<IError>, API_URL.DETE_COLLECTION, collectionId)
      yield* put(deleteCollectionSuccess(response.data))
   } catch (error) {
      yield* put(deleteColletionFailure(error as AxiosError))
   }
}

function* onCreateCollectionWithItemsStart() {
   yield* takeLatest(COLLECTION_ACTION_TYPES.CREATE_COLLECTION_WITH_ITEMS_START, createCollectionWithItems)
}

function* onDeleteCollectionStart() {
   yield* takeLatest(COLLECTION_ACTION_TYPES.DELETE_COLLECTION_START, deleteCollection)
}

function* onCreateCollectionStart() {
   yield* takeLatest(COLLECTION_ACTION_TYPES.CREATE_COLLECTION_START, createCollection)
}

export default function* collectionSagas() {
   yield* all([
      call(onCreateCollectionStart),
      call(onDeleteCollectionStart),
      call(onCreateCollectionWithItemsStart),
   ])
}