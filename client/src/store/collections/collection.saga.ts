import {takeLatest, put, all, call} from "typed-redux-saga/macro"
import {COLLECTION_ACTION_TYPES, ICollection, ICollectionWithoutItems} from "./collection.types"
import { createCollectionSuccess, createCollectionFailure, deleteCollectionSuccess, deleteColletionFailure, createCollectionWithItemsSuccess, createCollectionWithItemsFailure, getCollectionWithItemsSuccess, getCollectionWithItemsFailure, getCollectionsWihoutItemsSuccess, getCollectionsWihoutItemsFailure } from "./collection.actions"
import * as type from "./collection.types"
import { postRequest, API_URL, optionsUploadImage, uploadFile, getRequest } from "../../api/axios-instance.api"
import { AxiosError } from "axios"
import {IError} from "../user/user.reducer"
import { ICreateCollection } from "../../routes/create-collection/create-collection"

type ImageResponse = {
   image: {
      url: string,
      fileId: string
   }
}

function* createCollection({payload: collectionData}: type.CreateCollectionStart) {
   try {
      const response = yield* call(postRequest<ICollection>,  API_URL.CREATE_COLLECTION, collectionData,)
      yield* put(createCollectionSuccess(response.data))
   } catch (error) {
      yield* put(createCollectionFailure(error as AxiosError))
   }
}


function* createCollectionWithItems({payload: {collectionWithItems, image}}: type.CreateCollectionWithItemsStart){
   try {
      let payload = collectionWithItems;
      if(image) {
         const {data} = yield* uploadImage(image)
         payload = yield* appendImage(data, payload)
      }
      const response = yield* call(postRequest<ICollection>, API_URL.CREATE_COLLECTION_WITH_ITEMS, payload)
      yield* put(createCollectionWithItemsSuccess(response.data))
   } catch (error) {
      yield* put(createCollectionWithItemsFailure(error as AxiosError))
   }
}

function* uploadImage(image: File) {
   return yield* call(uploadFile<ImageResponse>, API_URL.UPLOAD_IMAGE, {image: image}, optionsUploadImage)
}

function* appendImage (data: ImageResponse, itemsCollection: ICreateCollection) {
   const url = data.image.url
   const imageId = data.image.fileId
   return {...itemsCollection, image: {url: url, imageId: imageId}}
}


function* deleteCollection({payload: collectionId}: type.DeleteCollectionFailure) {
   try {
      const response = yield* call(postRequest<IError>, API_URL.DETE_COLLECTION, collectionId)
      yield* put(deleteCollectionSuccess(response.data))
   } catch (error) {
      yield* put(deleteColletionFailure(error as AxiosError))
   }
}

function* getCollectionWithItemsStart({payload: collectionId}: type.GetCollectionWithItemsStart) {
   try {
      const response = yield* call(getRequest<ICollection[]>, `${API_URL.GET_COLLECTION_WITH_ITEMS}/${collectionId}`)
      yield* put(getCollectionWithItemsSuccess(response.data[0]))
   } catch (error) {
      yield* put(getCollectionWithItemsFailure(error as AxiosError))
   }
}

function* getCollectionsWithoutItems({payload: userName}: type.GetCollectionsWithoutItemsStart) {
   try {
      const repsonse = yield* call(getRequest<ICollectionWithoutItems>, `${API_URL.GET_COLLECTIONS_BY_USER}/${userName}`)
      yield* put(getCollectionsWihoutItemsSuccess(repsonse.data))
   } catch (error) {
      yield* put(getCollectionsWihoutItemsFailure(error as  AxiosError))
   }
}

function* onGetCollectionsWihoutItemStart() {
   yield* takeLatest(COLLECTION_ACTION_TYPES.GET_COLLECTIONS_WIHOUT_ITEMS_START,getCollectionsWithoutItems)
}

function* onGetCollectionWithItemsStart() {
   yield* takeLatest(COLLECTION_ACTION_TYPES.GET_COLLECTION_WITH_ITEMS_START, getCollectionWithItemsStart)
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
      call(onGetCollectionWithItemsStart),
      call(onGetCollectionsWihoutItemStart)
   ])
}