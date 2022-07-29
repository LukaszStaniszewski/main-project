import {takeLatest, put, all, call, throttle} from "typed-redux-saga/macro"
import {COLLECTION_ACTION_TYPES, ICollection, ICollectionWithoutItems, ILargestCollection} from "./collection.types"
import { createCollectionSuccess, createCollectionFailure, deleteCollectionSuccess, deleteColletionFailure, createCollectionWithItemsSuccess, createCollectionWithItemsFailure, getCollectionWithItemsSuccess, getCollectionWithItemsFailure, getCollectionsWihoutItemsSuccess, getCollectionsWihoutItemsFailure, getLargestCollectionsSuccess, getLargestCollectionsFailure, autocompleteSuccess, autocompeleteFailure } from "./collection.actions"
import * as type from "./collection.types"
import { postRequest, API_URL, optionsUploadImage, uploadFile, getRequest, deleteRequest } from "../../api/axios-instance.api"
import { AxiosError } from "axios"
import { ICreateCollection } from "../../pages/create-collection/create-collection"
import { setItems } from "../items/item.actions"

export type ImageResponse = {
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


export function* createCollectionWithItems({payload: {collectionWithItems, image}}: type.CreateCollectionWithItemsStart){
   try {
      let payload = collectionWithItems;
      if(image) {
         const {data} = yield* call(uploadImage, image)
         payload = appendImage(data, payload)
      }
      const response = yield* call(postRequest<ICollection>, API_URL.CREATE_COLLECTION_WITH_ITEMS, payload)
      yield* put(createCollectionWithItemsSuccess())
   } catch (error) {
      yield* put(createCollectionWithItemsFailure(error as AxiosError))
   }
}

export function* uploadImage(image: File) {
   return yield* call(uploadFile<ImageResponse>, API_URL.UPLOAD_IMAGE, {image: image}, optionsUploadImage)
}

export function appendImage (data: ImageResponse, itemsCollection: ICreateCollection) {
   const url = data.image.url
   const imageId = data.image.fileId
   return {...itemsCollection, image: {url: url, imageId: imageId}}
}


export function* deleteCollection({payload: collectionId}: type.DeleteCollectionStart) {
   try {
      const response = yield* call(deleteRequest,`${API_URL.DELETE_COLLECTION}/${collectionId}`)
      yield* put(deleteCollectionSuccess(response.data))
   } catch (error) {
      yield* put(deleteColletionFailure(error as AxiosError))
   }
}

function* getCollectionWithItemsStart({payload: collectionId}: type.GetCollectionWithItemsStart) {
   try {
      const response = yield* call(getRequest<ICollection>, `${API_URL.GET_COLLECTION_WITH_ITEMS}/${collectionId}`)
      const collectionWithItems = response.data
      const {items, ...collection} = collectionWithItems
      yield* put(getCollectionWithItemsSuccess(collection))
      if(items) yield* put(setItems(items))
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

function* getLargestCollections() {
   try {
      const repsonse = yield* call(getRequest<ILargestCollection[]>, API_URL.GET_LARGEST_COLLECTIONS)
      yield* put(getLargestCollectionsSuccess(repsonse.data))
   } catch (error) {
      yield* put(getLargestCollectionsFailure(error as  AxiosError))
   }
}

function* autocomplete ({payload: query}: type.AutocompleteStart) {
   try {
      const response = yield* call(postRequest, API_URL.AUTOCOMPLETE, query)
      yield* put(autocompleteSuccess(response.data))
   } catch (error) {
      yield* put(autocompeleteFailure(error as AxiosError))
   }
}

function* onAutocompleteStart() {
   yield* throttle(1000, COLLECTION_ACTION_TYPES.AUTOCOMPLETE_START, autocomplete)
}

function* onGetLargestCollectionsStart() {
   yield* takeLatest(COLLECTION_ACTION_TYPES.GET_LARGEST_COLLECTIONS_START, getLargestCollections)
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
      call(onGetCollectionsWihoutItemStart),
      call(onGetLargestCollectionsStart),
      call(onAutocompleteStart)
   ])
}